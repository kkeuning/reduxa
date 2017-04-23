# reduxa
[goa](https://goa.design) plug-in to generate [redux](https://github.com/reactjs/redux) boilerplate

## Project Status  
Although reduxa is "opinionated" it is still evolving.  Support for generation of action types, actions and action creators has been tested up to goa v1.1.0 with multiple api designs but may not yet cover every possible design or use case.  Ideas and pull requests are welcome!

**Breaking changes:**  Release v0.2.0 included several breaking changes:
- Output is now split into multiple files per resource.
- Action creators are more flexible to support overriding [Axios](https://github.com/mzabriskie/axios) options including headers for Authorization, etc.
- Smarter pluralization
- JavaScriptify to ensure the generated code is valid.

Reduxa assumes you are using ES6 and likely Babel.

Reduxa output will conform closely to [Prettier](https://github.com/prettier/prettier)
 and [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), with the biggest exception being line length.  Future versions of Reduxa might optionally invoke
 [Prettier](https://github.com/prettier/prettier) from the generator.  For now I recommend using the [Prettier](https://github.com/prettier/prettier) CLI in a script, [grift](https://github.com/markbates/grift) or Makefile to format the generated output.

Reduxa currently generates your action types, actions, and action creators for use with [Redux](https://github.com/reactjs/redux), [Axios](https://github.com/mzabriskie/axios), and [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware.  Scaffolding for reducers is under consideration for the future roadmap.  


Thanks to Dan Abramov for Redux and to Raphael Simon for Goa.  

## Example

This example is generated from goa's [goa-cellar](https://github.com/goadesign/goa-cellar) design.

Full example output is in the [examples](examples/README.md) folder.

```
goagen gen -d github.com/goadesign/goa-cellar/design --pkg-path=github.com/kkeuning/reduxa
```

Generated Redux action types:
```
export const REQ_LIST_BOTTLES = 'REQ_LIST_BOTTLES';
export const RCV_LIST_BOTTLES_SUCCESS = 'RCV_LIST_BOTTLES_SUCCESS';
export const RCV_LIST_BOTTLES_ERROR = 'RCV_LIST_BOTTLES_ERROR';
```

Generated Redux actions:
```
export const requestListBottles = () => ({
  type: types.REQ_LIST_BOTTLES
});
export const receiveListBottlesSuccess = (data, status) => ({
  type: types.RCV_LIST_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveListBottlesError = (data, status) => ({
  type: types.RCV_LIST_BOTTLES_ERROR,
  data,
  status
});
```

Generated Redux action creator for use with Thunk middleware:
```
// listBottles calls the list action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
//
// Query Parameters: years is expected in params.
// Params should be passed in the options object.
export const listBottles = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestListBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveListBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveListBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
```
