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
	"unicode"

	"github.com/goadesign/goa/design"
	"github.com/goadesign/goa/goagen/codegen"
	"github.com/goadesign/goa/goagen/utils"
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
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper}
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
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper}
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
			a.Parent.BasePath = JavaScriptify(strings.TrimLeft(a.Parent.BasePath, "/"), false)
			data := map[string]interface{}{
				"Action":  a,
				"API":     api,
				"Host":    g.host,
				"Scheme":  g.scheme,
				"Timeout": int64(g.timeout / time.Millisecond),
			}
			funcs := template.FuncMap{"params": params, "toUpper": strings.ToUpper}
			if err = file.ExecuteTemplate("actions", actionsT, funcs, data); err != nil {
				return
			}
		}
	}

	return err
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

const actionCreatorsT = `{{$params := params .Action}}
// {{.Action.Name}}{{title .Action.Parent.BasePath}} calls the {{.Action.Name}} action of the {{.Action.Parent.Name}} resource.
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
export const {{.Action.Name}}{{title .Action.Parent.BasePath}} = (url, options{{if .Action.Payload}}, data{{end}}, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.request{{title .Action.Name}}{{title .Action.Parent.BasePath}}());
    return axios({
      timeout: {{.Timeout}},
      url,
      method: '{{toLower (index .Action.Routes 0).Verb}}',
{{if .Action.Payload}}      data,
{{end}}      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receive{{title .Action.Name}}{{title .Action.Parent.BasePath}}Success(response.data, response.status));
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
        dispatch(actions.receive{{title .Action.Name}}{{title .Action.Parent.BasePath}}Error(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
`
const resourceActionsTypesT = `export const {{toUpper (.Action.Parent.BasePath)}}_RESET = '{{toUpper (.Action.Parent.BasePath)}}_RESET';
`
const resourceActionsT = `export const {{title .Action.Name}}{{title .Action.Parent.BasePath}}Reset = () => ({
  type: types.{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}}_RESET
});`

const actionTypesT = `export const REQ_{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}} = 'REQ_{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}}';
export const RCV_{{toUpper .Action.Name}}_{{toUpper (.Action.Parent.BasePath)}}_SUCCESS = 'RCV_{{toUpper .Action.Name}}_{{toUpper (.Action.Parent.BasePath)}}_SUCCESS';
export const RCV_{{toUpper .Action.Name}}_{{toUpper (.Action.Parent.BasePath)}}_ERROR = 'RCV_{{toUpper .Action.Name}}_{{toUpper (.Action.Parent.BasePath)}}_ERROR';
`

const actionsT = `export const request{{title .Action.Name}}{{title .Action.Parent.BasePath}} = () => ({
  type: types.REQ_{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}}
});
export const receive{{title .Action.Name}}{{title .Action.Parent.BasePath}}Success = (data, status) => ({
  type: types.RCV_{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}}_SUCCESS,
  data,
  status
});
export const receive{{title .Action.Name}}{{title .Action.Parent.BasePath}}Error = (data, status) => ({
  type: types.RCV_{{toUpper .Action.Name}}_{{toUpper .Action.Parent.BasePath}}_ERROR,
  data,
  status
});
`

// JavaScriptify, based on Goify makes a valid JavaScript identifier out of any string.
// It does that by removing any non letter and non digit character and by making sure the first
// character is a letter or "_".
// Goify produces a "CamelCase" version of the string, if firstUpper is true the first character
// of the identifier is uppercase otherwise it's lowercase.
func JavaScriptify(str string, firstUpper bool) string {
	runes := []rune(str)

	// remove trailing invalid identifiers (makes code below simpler)
	runes = removeTrailingInvalid(runes)

	w, i := 0, 0 // index of start of word, scan
	for i+1 <= len(runes) {
		eow := false // whether we hit the end of a word

		// remove leading invalid identifiers
		runes = removeInvalidAtIndex(i, runes)

		if i+1 == len(runes) {
			eow = true
		} else if !validIdentifier(runes[i]) {
			// get rid of it
			runes = append(runes[:i], runes[i+1:]...)
		} else if runes[i+1] == '_' {
			// underscore; shift the remainder forward over any run of underscores
			eow = true
			n := 1
			for i+n+1 < len(runes) && runes[i+n+1] == '_' {
				n++
			}
			copy(runes[i+1:], runes[i+n+1:])
			runes = runes[:len(runes)-n]
		} else if unicode.IsLower(runes[i]) && !unicode.IsLower(runes[i+1]) {
			// lower->non-lower
			eow = true
		}
		i++
		if !eow {
			continue
		}

		// [w,i] is a word.
		word := string(runes[w:i])
		// is it one of our initialisms?
		if u := strings.ToUpper(word); commonInitialisms[u] {
			if firstUpper {
				u = strings.ToUpper(u)
			} else if w == 0 {
				u = strings.ToLower(u)
			}

			// All the common initialisms are ASCII,
			// so we can replace the bytes exactly.
			copy(runes[w:], []rune(u))
		} else if w > 0 && strings.ToLower(word) == word {
			// already all lowercase, and not the first word, so uppercase the first character.
			runes[w] = unicode.ToUpper(runes[w])
		} else if w == 0 && strings.ToLower(word) == word && firstUpper {
			runes[w] = unicode.ToUpper(runes[w])
		}
		if w == 0 && !firstUpper {
			runes[w] = unicode.ToLower(runes[w])
		}
		//advance to next word
		w = i
	}

	return fixReserved(string(runes))
}

// Reserved JavaScript keywords
var JavaScriptReserved = map[string]bool{
	// Java Keywords reserved by JavasScript
	"abstract":     true,
	"boolean":      true,
	"byte":         true,
	"char":         true,
	"double":       true,
	"false":        true,
	"final":        true,
	"float":        true,
	"goto":         true,
	"implements":   true,
	"instanceof":   true,
	"int":          true,
	"interface":    true,
	"long":         true,
	"native":       true,
	"null":         true,
	"package":      true,
	"private":      true,
	"protected":    true,
	"public":       true,
	"short":        true,
	"static":       true,
	"synchronized": true,
	"throws":       true,
	"transient":    true,
	"true":         true,
	// JavaScript Reserved Words
	"break":    true,
	"case":     true,
	"comment":  true,
	"continue": true,
	"default":  true,
	"delete":   true,
	"do":       true,
	"else":     true,
	"export":   true,
	"for":      true,
	"function": true,
	"if":       true,
	"import":   true,
	"in":       true,
	"label":    true,
	"new":      true,
	"return":   true,
	"switch":   true,
	"this":     true,
	"var":      true,
	"void":     true,
	"while":    true,
	"with":     true,
	// ECMAScript Reserved Words
	"catch":    true,
	"class":    true,
	"const":    true,
	"debugger": true,
	"enum":     true,
	"extends":  true,
	"finally":  true,
	"super":    true,
	"throw":    true,
	"try":      true,
	// Others, not yet exhaustive
	"alert":       true,
	"confirm":     true,
	"open":        true,
	"print":       true,
	"NaN":         true,
	"Date":        true,
	"constructor": true,
	"assign":      true,
	"location":    true,
	"Location":    true,
	"window":      true,
	"Window":      true,
}

// fixReserved appends an underscore on to JavaScript reserved keywords.
func fixReserved(w string) string {
	if JavaScriptReserved[w] {
		w += "_"
	}
	return w
}

// removeTrailingInvalid removes trailing invalid identifiers from runes.
func removeTrailingInvalid(runes []rune) []rune {
	valid := len(runes) - 1
	for ; valid >= 0 && !validIdentifier(runes[valid]); valid-- {
	}

	return runes[0 : valid+1]
}

// removeInvalidAtIndex removes consecutive invalid identifiers from runes starting at index i.
func removeInvalidAtIndex(i int, runes []rune) []rune {
	valid := i
	for ; valid < len(runes) && !validIdentifier(runes[valid]); valid++ {
	}

	return append(runes[:i], runes[valid:]...)
}

var commonInitialisms = map[string]bool{
	"API":   true,
	"ASCII": true,
	"CPU":   true,
	"CSS":   true,
	"DNS":   true,
	"EOF":   true,
	"GUID":  true,
	"HTML":  true,
	"HTTP":  true,
	"HTTPS": true,
	"ID":    true,
	"IP":    true,
	"JMES":  true,
	"JSON":  true,
	"JWT":   true,
	"LHS":   true,
	"OK":    true,
	"QPS":   true,
	"RAM":   true,
	"RHS":   true,
	"RPC":   true,
	"SLA":   true,
	"SMTP":  true,
	"SQL":   true,
	"SSH":   true,
	"TCP":   true,
	"TLS":   true,
	"TTL":   true,
	"UDP":   true,
	"UI":    true,
	"UID":   true,
	"UUID":  true,
	"URI":   true,
	"URL":   true,
	"UTF8":  true,
	"VM":    true,
	"XML":   true,
	"XSRF":  true,
	"XSS":   true,
}

// validIdentifier returns true if the rune is a letter or number
func validIdentifier(r rune) bool {
	return unicode.IsLetter(r) || unicode.IsDigit(r)
}
