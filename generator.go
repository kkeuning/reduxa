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

	g.outDir = filepath.Join(g.outDir, "reduxa")
	if err := os.RemoveAll(g.outDir); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(g.outDir, 0755); err != nil {
		return nil, err
	}
	g.genfiles = append(g.genfiles, g.outDir)

	// Generate Redux action creators for this goa API
	err = g.generateReduxActionCreators(filepath.Join(g.outDir, fmt.Sprint(api.Name+"ActionCreators.js")), api)
	if err != nil {
		return
	}

	// Generate Redux action types for this goa API
	err = g.generateReduxActionTypes(filepath.Join(g.outDir, fmt.Sprint(api.Name, "ActionTypes.js")), api)
	if err != nil {
		return
	}

	// Generate Redux actions for this goa API
	err = g.generateReduxActions(filepath.Join(g.outDir, fmt.Sprint(api.Name, "Actions.js")), api)
	if err != nil {
		return
	}

	return g.genfiles, nil
}

func (g *Generator) generateReduxActionCreators(jsFile string, api *design.APIDefinition) (err error) {
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	data := map[string]interface{}{
		"API":     api,
		"Host":    g.host,
		"Scheme":  g.scheme,
		"Timeout": int64(g.timeout / time.Millisecond),
	}
	if err = file.ExecuteTemplate("beginActionCreators", beginActionCreatorsT, nil, data); err != nil {
		return
	}

	actions := make(map[string][]*design.ActionDefinition)
	api.IterateResources(func(res *design.ResourceDefinition) error {
		return res.IterateActions(func(action *design.ActionDefinition) error {
			if as, ok := actions[action.Name]; ok {
				actions[action.Name] = append(as, action)
			} else {
				actions[action.Name] = []*design.ActionDefinition{action}
			}
			return nil
		})
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
		for _, a := range actions[n] {
			a.Parent.BasePath = JavaScriptify(strings.TrimLeft(a.Parent.BasePath, "/"), false)
			data := map[string]interface{}{
				"Action":  a,
				"API":     api,
				"Host":    g.host,
				"Scheme":  g.scheme,
				"Timeout": int64(g.timeout / time.Millisecond),
			}
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "javaScriptify": JavaScriptify}
			if err = file.ExecuteTemplate("actionCreators", actionCreatorsT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func (g *Generator) generateReduxActionTypes(jsFile string, api *design.APIDefinition) (err error) {
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	actions := make(map[string][]*design.ActionDefinition)
	api.IterateResources(func(res *design.ResourceDefinition) error {
		return res.IterateActions(func(action *design.ActionDefinition) error {
			if as, ok := actions[action.Name]; ok {
				actions[action.Name] = append(as, action)
			} else {
				actions[action.Name] = []*design.ActionDefinition{action}
			}
			return nil
		})
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
		for _, a := range actions[n] {
			a.Parent.BasePath = JavaScriptify(strings.TrimLeft(a.Parent.BasePath, "/"), false)
			data := map[string]interface{}{"Action": a}
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "javaScriptify": JavaScriptify}
			if err = file.ExecuteTemplate("actionTypes", actionTypesT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func (g *Generator) generateReduxActions(jsFile string, api *design.APIDefinition) (err error) {
	file, err := codegen.SourceFileFor(jsFile)
	if err != nil {
		return
	}
	g.genfiles = append(g.genfiles, jsFile)

	data := map[string]interface{}{
		"API":     api,
		"Host":    g.host,
		"Scheme":  g.scheme,
		"Timeout": int64(g.timeout / time.Millisecond),
	}
	if err = file.ExecuteTemplate("beginActions", beginActionsT, nil, data); err != nil {
		return
	}

	actions := make(map[string][]*design.ActionDefinition)
	api.IterateResources(func(res *design.ResourceDefinition) error {
		return res.IterateActions(func(action *design.ActionDefinition) error {
			if as, ok := actions[action.Name]; ok {
				actions[action.Name] = append(as, action)
			} else {
				actions[action.Name] = []*design.ActionDefinition{action}
			}
			return nil
		})
	})

	keys := []string{}
	for n := range actions {
		keys = append(keys, n)
	}
	sort.Strings(keys)
	for _, n := range keys {
		for _, a := range actions[n] {
			data := map[string]interface{}{
				"Action":  a,
				"API":     api,
				"Host":    g.host,
				"Scheme":  g.scheme,
				"Timeout": int64(g.timeout / time.Millisecond),
			}
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper, "resourceName": resourceName, "javaScriptify": JavaScriptify}
			if err = file.ExecuteTemplate("actions", actionsT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
}

func resourceName(a design.ActionDefinition) string {
	name := a.Parent.BasePath
	singular := true
	for _, response := range a.Responses {
		if response != nil && strings.Contains(response.MediaType, "type=collection") {
			singular = false
		}
	}
	if singular {
		name = JavaScriptify(inflect.Singularize(JavaScriptify(name, false)), false)
	} else {
		name = JavaScriptify(inflect.Pluralize(JavaScriptify(name, false)), false)
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
import * as types from './{{.API.Name}}ActionTypes';

`

const beginActionCreatorsT = `// This module exports redux action creators for the {{.API.Name}} API hosted at {{.API.Host}}.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import * as actions from './{{.API.Name}}Actions';
import axios from 'axios';
`

const actionCreatorsT = `{{$params := params .Action}}{{$resourceName := resourceName .Action}}{{$actionName := javaScriptify .Action.Name false}}
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
        if (error.response) {
          rdata = error.response.data;
        }
        dispatch(actions.receive{{title $actionName}}{{title $resourceName}}Error(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
`
const resourceActionsTypesT = `{{$resourceName := resourceName .Action}}export const {{toUpper ($resourceName)}}_RESET = '{{toUpper ($resourceName)}}_RESET';
`
const resourceActionsT = `{{$resourceName := resourceName .Action}}{{$actionName := javaScriptify .Action.Name false}}export const {{title $actionName}}title $resourceName}}Reset = () => ({
  type: types.{{toUpper $actionName_{{toUpper $resourceName}}_RESET
});`

const actionTypesT = `{{$resourceName := resourceName .Action}}{{$actionName := javaScriptify .Action.Name false}}export const REQ_{{toUpper $actionName}}_{{toUpper $resourceName}} = 'REQ_{{toUpper $actionName}}_{{toUpper $resourceName}}';
export const RCV_{{toUpper $actionName}}_{{toUpper ($resourceName)}}_SUCCESS = 'RCV_{{toUpper $actionName}}_{{toUpper ($resourceName)}}_SUCCESS';
export const RCV_{{toUpper $actionName}}_{{toUpper ($resourceName)}}_ERROR = 'RCV_{{toUpper $actionName}}_{{toUpper ($resourceName)}}_ERROR';
`

const actionsT = `{{$resourceName := resourceName .Action}}{{$actionName := javaScriptify .Action.Name false}}export const request{{title $actionName}}{{title $resourceName}} = () => ({
  type: types.REQ_{{toUpper $actionName}}_{{toUpper $resourceName}}
});
export const receive{{title $actionName}}{{title $resourceName}}Success = (data, status) => ({
  type: types.RCV_{{toUpper $actionName}}_{{toUpper $resourceName}}_SUCCESS,
  data,
  status
});
export const receive{{title $actionName}}{{title $resourceName}}Error = (data, status) => ({
  type: types.RCV_{{toUpper $actionName}}_{{toUpper $resourceName}}_ERROR,
  data,
  status
});
`
