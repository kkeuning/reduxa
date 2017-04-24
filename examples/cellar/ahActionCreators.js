// This module exports redux action creators for the cellar API hosted at localhost:8081.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import axios from 'axios';
import * as actions from './ahActions';

// healthAh calls the health action of the health resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/_ah/health
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const healthAh = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestHealthAh());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveHealthAhSuccess(response.data, response.status));
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
        dispatch(actions.receiveHealthAhError(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
