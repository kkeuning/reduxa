// This module exports redux action creators for the cellar API hosted at localhost:8081.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import * as actions from './cellarActions';
import axios from 'axios';

// createAccounts calls the create action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// data contains the action payload (request body)
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const createAccounts = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestCreateAccounts());
    return axios({
      timeout: 20000,
      url,
      method: 'post',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveCreateAccountsSuccess(response.data, response.status));
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
        dispatch(actions.receiveCreateAccountsError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// createBottles calls the create action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// data contains the action payload (request body)
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const createBottles = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestCreateBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'post',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveCreateBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveCreateBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// deleteAccounts calls the delete action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const deleteAccounts = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDeleteAccounts());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDeleteAccountsSuccess(response.data, response.status));
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
        dispatch(actions.receiveDeleteAccountsError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// deleteBottles calls the delete action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const deleteBottles = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDeleteBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDeleteBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveDeleteBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// healthAh calls the health action of the health resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/ah/health
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
        if (error.response) {
          rdata = error.response.data;
        }
        dispatch(actions.receiveHealthAhError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// listAccounts calls the list action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const listAccounts = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestListAccounts());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveListAccountsSuccess(response.data, response.status));
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
        dispatch(actions.receiveListAccountsError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

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

// rateBottles calls the rate action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID/actions/rate
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// data contains the action payload (request body)
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const rateBottles = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestRateBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'put',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveRateBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveRateBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// showAccounts calls the show action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const showAccounts = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestShowAccounts());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveShowAccountsSuccess(response.data, response.status));
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
        dispatch(actions.receiveShowAccountsError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// showBottles calls the show action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const showBottles = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestShowBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveShowBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveShowBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// updateAccounts calls the update action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// data contains the action payload (request body)
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const updateAccounts = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestUpdateAccounts());
    return axios({
      timeout: 20000,
      url,
      method: 'put',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveUpdateAccountsSuccess(response.data, response.status));
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
        dispatch(actions.receiveUpdateAccountsError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
>>>>>>> updated goa cellar example
      });
  };

// updateBottles calls the update action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// data contains the action payload (request body)
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const updateBottles = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestUpdateBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'patch',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveUpdateBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveUpdateBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// watchBottles calls the watch action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID/watch
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const watchBottles = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestWatchBottles());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveWatchBottlesSuccess(response.data, response.status));
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
        dispatch(actions.receiveWatchBottlesError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
