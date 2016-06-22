# reduxa
goa plug-in to generate redux boilerplate

Run `goagen` from inside your client project to create the `reduxa/` folder and generated code.

Assumes you are using ES6 and likely Babel.

```
goagen gen -d github.com/goadesign/goa-cellar/design --pkg-path=github.com/kkeuning/reduxa
```

Currently generates your action types, actions, and action creators for use with Redux, Axios, and Redux Thunk middleware.

Thanks to Dan Abramov for Redux and to Raphael Simon for Goa.  

Examples:

Generated redux action types:
```
export const REQ_LIST_BOTTLES = 'REQ_LIST_BOTTLES';
export const RECV_LIST_BOTTLES_SUCCESS = 'RECV_LIST_BOTTLES_SUCCESS';
export const RECV_LIST_BOTTLES_ERROR = 'RECV_LIST_BOTTLES_ERROR';
```

Generated Redux actions:
```
export const requestListBottles = () => ({
  type: types.REQ_LIST_BOTTLES
});
export const receiveListBottlesSuccess = (json, status) => ({
  type: types.RECV_LIST_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveListBottlesError = (json, status) => ({
  type: types.RECV_LIST_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
```

Generated Redux action creator for use with Thunk middleware:
```
// List all bottles in account optionally filtering by year
// path is the request path, the format is "/cellar/accounts/:accountID/bottles"
// years is used to build the request query string.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const listBottles = (path, years) => {
  return (dispatch) => {
    dispatch(actions.requestListBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      params: {
        years: years
      },
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveListBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveListBottlesError(response.data, response.status));
      });
  };
};
```
