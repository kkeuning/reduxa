# reduxa
goa plug-in to generate redux boilerplate

Project status:  Reduxa is still experimental however the generated code has been used in production.  Pull requests are welcome.

Breaking changes:  Release 0.2.x substantially updates the templates.  Use 0.1.0 if you are dependent on the initial release.

Run `goagen` from inside your client project to create the `reduxa/` folder and generated code.

Reduxa assumes you are using ES6 and likely Babel.

I recommend formatting the Reduxa output with [Prettier](https://github.com/prettier/prettier)

Reduxa output will conform closley to Prettier  [Prettier](https://github.com/prettier/prettier)
 and [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript), with the biggest exception being line length.  Future versions of Reduxa might optionally invoke
 [Prettier](https://github.com/prettier/prettier) from the generator.

```
goagen gen -d github.com/goadesign/goa-cellar/design --pkg-path=github.com/kkeuning/reduxa
```

Reduxa currently generates your action types, actions, and action creators for use with Redux, Axios, and Redux Thunk middleware.  Scaffolding for reducers is under consideration for the future roadmap.  


Thanks to Dan Abramov for Redux and to Raphael Simon for Goa.  

Examples, based on goa's goa-cellar design:

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
