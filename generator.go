package reduxa

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"text/template"
	"time"

	"github.com/goadesign/goa/design"
	"github.com/goadesign/goa/goagen/codegen"
	"github.com/goadesign/goa/goagen/utils"
	"github.com/markbates/inflect"
)

// Generator is the application code generator.
type Generator struct {
	genfiles []string      // Generated files
	outDir   string        // Destination directory
	timeout  time.Duration // Timeout used by JavaScript client when making requests
	scheme   string        // Scheme used by JavaScript client
	host     string        // Host addressed by JavaScript client
}

// Generate is the generator entry point called by the meta generator.
func Generate() (files []string, err error) {
	var (
		outDir            string
		timeout           time.Duration
		scheme, host, ver string
	)

	set := flag.NewFlagSet("reduxa", flag.PanicOnError)
	set.StringVar(&outDir, "out", "", "")
	set.String("design", "", "")
	set.DurationVar(&timeout, "timeout", time.Duration(20)*time.Second, "")
	set.StringVar(&scheme, "scheme", "", "")
	set.StringVar(&host, "host", "", "")
	set.StringVar(&ver, "version", "", "")
	set.Parse(os.Args[2:])

	// First check compatibility
	if err := codegen.CheckVersion(ver); err != nil {
		return nil, err
	}

	g := &Generator{outDir: outDir, timeout: timeout, scheme: scheme, host: host}

	return g.Generate(design.Design)
}

// Generate produces the skeleton main.
func (g *Generator) Generate(api *design.APIDefinition) (_ []string, err error) {
	go utils.Catch(nil, func() { g.Cleanup() })

	defer func() {
		if err != nil {
			g.Cleanup()
		}
	}()

	if g.scheme == "" && len(api.Schemes) > 0 {
		g.scheme = api.Schemes[0]
	}
	if g.scheme == "" {
		g.scheme = "http"
	}
	if g.host == "" {
		g.host = api.Host
	}
	if g.host == "" {
		return nil, fmt.Errorf("missing host value, set it with --host")
	}

	g.outDir = filepath.Join(g.outDir, api.Name)
	if err := os.RemoveAll(g.outDir); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(g.outDir, 0755); err != nil {
		return nil, err
	}
	g.genfiles = append(g.genfiles, g.outDir)

	api.IterateResources(func(res *design.ResourceDefinition) error {
		resourceName := baseName(res)
		if resourceName == "" {
			return nil
		}
		// Generate Redux action creators for this goa API
		err = g.generateReduxActionCreators(filepath.Join(g.outDir, fmt.Sprint(resourceName, "ActionCreators.js")), api, res)
		if err != nil {
			return err
		}

		// Generate Redux action types for this goa API
		err = g.generateReduxActionTypes(filepath.Join(g.outDir, fmt.Sprint(resourceName, "ActionTypes.js")), api, res)
		if err != nil {
			return err
		}

		// Generate Redux actions for this goa API
		err = g.generateReduxActions(filepath.Join(g.outDir, fmt.Sprint(resourceName, "Actions.js")), api, res)
		if err != nil {
			return err
		}
		return nil
	})

	return g.genfiles, nil
}

func (g *Generator) generateReduxActionCreators(jsFile string, api *design.APIDefinition, res *design.ResourceDefinition) (err error) {
	funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "actionUnderResource": actionUnderResource}
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	if res == nil {
		return
	}
	data := map[string]interface{}{
		"API":      api,
		"BaseName": baseName(res),
	}

	if err = file.ExecuteTemplate("beginActionCreators", beginActionCreatorsT, funcs, data); err != nil {
		return
	}

	actions := make(map[string][]*design.ActionDefinition)
	res.IterateActions(func(action *design.ActionDefinition) error {
		if as, ok := actions[action.Name]; ok {
			actions[action.Name] = append(as, action)
		} else {
			actions[action.Name] = []*design.ActionDefinition{action}
		}
		return nil
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
	Actions:
		for _, a := range actions[n] {
			for _, scheme := range a.Schemes {
				if scheme == "ws" {
					continue Actions
				}
			}
			data := map[string]interface{}{
				"Action":       a,
				"API":          api,
				"Host":         g.host,
				"Scheme":       g.scheme,
				"Timeout":      int64(g.timeout / time.Millisecond),
				"ResourceName": actionResourceName(res, a),
			}
			if err = file.ExecuteTemplate("actionCreators", actionCreatorsT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func (g *Generator) generateReduxActionTypes(jsFile string, api *design.APIDefinition, res *design.ResourceDefinition) (err error) {
	funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "actionUnderResource": actionUnderResource}
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	actions := make(map[string][]*design.ActionDefinition)
	res.IterateActions(func(action *design.ActionDefinition) error {
		if as, ok := actions[action.Name]; ok {
			actions[action.Name] = append(as, action)
		} else {
			actions[action.Name] = []*design.ActionDefinition{action}
		}
		return nil
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
	Actions:
		for _, a := range actions[n] {
			for _, scheme := range a.Schemes {
				if scheme == "ws" {
					continue Actions
				}
			}
			data := map[string]interface{}{"Action": a, "ResourceName": actionResourceName(res, a)}
			if err = file.ExecuteTemplate("actionTypes", actionTypesT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func (g *Generator) generateReduxActions(jsFile string, api *design.APIDefinition, res *design.ResourceDefinition) (err error) {
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	if res == nil {
		return
	}
	data := map[string]interface{}{
		"API":      api,
		"BaseName": baseName(res),
	}

	funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "actionUnderResource": actionUnderResource}
	if err = file.ExecuteTemplate("beginActions", beginActionsT, funcs, data); err != nil {
		return
	}

	actions := make(map[string][]*design.ActionDefinition)
	res.IterateActions(func(action *design.ActionDefinition) error {
		if as, ok := actions[action.Name]; ok {
			actions[action.Name] = append(as, action)
		} else {
			actions[action.Name] = []*design.ActionDefinition{action}
		}
		return nil
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
	Actions:
		for _, a := range actions[n] {
			for _, scheme := range a.Schemes {
				if scheme == "ws" {
					continue Actions
				}
			}
			data := map[string]interface{}{
				"Action":       a,
				"API":          api,
				"ResourceName": actionResourceName(res, a),
			}
			if err = file.ExecuteTemplate("actions", actionsT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func resourceName(res *design.ResourceDefinition) string {
	name := strings.TrimLeft(res.BasePath, "/")
	singular := true
	for _, response := range res.Responses {
		if response != nil && strings.Contains(response.MediaType, "type=collection") {
			singular = false
		}
	}
	if singular {
		name = JavaScriptify(inflect.Singularize(name), false, false)
	} else {
		name = JavaScriptify(inflect.Pluralize(name), false, false)
	}
	return name
}

func baseName(res *design.ResourceDefinition) string {
	return JavaScriptify(inflect.Singularize(strings.TrimLeft(res.BasePath, "/")), false, false)
}

func actionResourceName(res *design.ResourceDefinition, action *design.ActionDefinition) string {
	name := strings.TrimLeft(res.BasePath, "/")
	singular := true
	for _, response := range action.Responses {
		if response != nil && strings.Contains(response.MediaType, "type=collection") {
			singular = false
		}
	}
	if singular {
		name = JavaScriptify(inflect.Singularize(name), false, false)
	}
	return name
}

// Cleanup removes all the files generated by this generator during the last invokation of Generate.
func (g *Generator) Cleanup() {
	for _, f := range g.genfiles {
		os.Remove(f)
	}
	g.genfiles = nil
}

// Helper for templates to combine action name and resource name
// into a JavaScript safe string for naming redux action types
func actionUnderResource(action string, resource string) string {
	return fmt.Sprint(
		// Its ok for the action be a reserved word here
		strings.ToUpper(JavaScriptify(action, false, true)),
		"_",
		strings.ToUpper(JavaScriptify(resource, false, false)),
	)
}

func params(action *design.ActionDefinition) []string {
	if action.QueryParams == nil {
		return nil
	}
	params := make([]string, len(action.QueryParams.Type.ToObject()))
	i := 0
	for n := range action.QueryParams.Type.ToObject() {
		params[i] = n
		i++
	}
	sort.Strings(params)
	return params
}

const beginActionsT = `// This module exports redux actions for the {{.API.Name}} API hosted at {{.API.Host}}.
import * as types from './{{.BaseName}}ActionTypes';

`

const beginActionCreatorsT = `// This module exports redux action creators for the {{.API.Name}} API hosted at {{.API.Host}}.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import axios from 'axios';
import * as actions from './{{.BaseName}}Actions';
`

const actionCreatorsT = `{{$params := params .Action}}{{$resourceName := .ResourceName}}{{$actionName := .Action.Name}}
// {{$actionName}}{{title $resourceName}} calls the {{.Action.Name}} action of the {{.Action.Parent.Name}} resource.
// url is the request url, the format is:
// {{.Scheme}}://{{.Host}}{{(index .Action.Routes 0).FullPath}}
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
{{if .Action.Payload}}// data contains the action payload (request body)
{{end}}// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
{{if $params}}//
// Query Parameters: {{join $params ", "}} {{if gt (len $params) 1}}are{{else}}is{{end}} expected in params.
{{end}}// Params should be passed in the options object.
export const {{$actionName}}{{title $resourceName}} = (url, options{{if .Action.Payload}}, data{{end}}, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.request{{title $actionName}}{{title $resourceName}}());
    return axios({
      timeout: {{.Timeout}},
      url,
      method: '{{toLower (index .Action.Routes 0).Verb}}',
{{if .Action.Payload}}      data,
{{end}}      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receive{{title $actionName}}{{title $resourceName}}Success(response.data, response.status));
      })
      .then(response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
      })
      .catch(error => {
        let rdata;
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receive{{title $actionName}}{{title $resourceName}}Error(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
`

const actionTypesT = `{{$resourceName := .ResourceName}}{{$actionName := .Action.Name}}export const REQ_{{ actionUnderResource $actionName $resourceName}} = 'REQ_{{actionUnderResource $actionName $resourceName}}';
export const RCV_{{actionUnderResource $actionName $resourceName}}_SUCCESS = 'RCV_{{actionUnderResource $actionName $resourceName}}_SUCCESS';
export const RCV_{{actionUnderResource $actionName $resourceName}}_ERROR = 'RCV_{{actionUnderResource $actionName $resourceName}}_ERROR';
`

const actionsT = `{{$resourceName := .ResourceName}}{{$actionName := .Action.Name}}export const request{{title $actionName}}{{title $resourceName}} = () => ({
  type: types.REQ_{{actionUnderResource $actionName $resourceName}}
});
export const receive{{title $actionName}}{{title $resourceName}}Success = (data, status) => ({
  type: types.RCV_{{actionUnderResource $actionName $resourceName}}_SUCCESS,
  data,
  status
});
export const receive{{title $actionName}}{{title $resourceName}}Error = (data, status) => ({
  type: types.RCV_{{actionUnderResource $actionName $resourceName}}_ERROR,
  data,
  status
});
`
