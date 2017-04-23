// This module exports redux action creators for the cellar API hosted at localhost:8081.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import * as actions from './cellarActions';
import axios from 'axios';

// createAccount calls the create action of the account resource.
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
export const createAccount = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestCreateAccount());
    return axios({
      timeout: 20000,
      url,
      method: 'post',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveCreateAccountSuccess(response.data, response.status));
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
        dispatch(actions.receiveCreateAccountError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// createBottle calls the create action of the bottle resource.
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
export const createBottle = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestCreateBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'post',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveCreateBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveCreateBottleError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// delete_Account calls the delete action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const delete_Account = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDelete_Account());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDelete_AccountSuccess(response.data, response.status));
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
        dispatch(actions.receiveDelete_AccountError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// delete_Bottle calls the delete action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const delete_Bottle = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDelete_Bottle());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDelete_BottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveDelete_BottleError(rdata, error.status));
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

// rateBottle calls the rate action of the bottle resource.
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
export const rateBottle = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestRateBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'put',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveRateBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveRateBottleError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// showAccount calls the show action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const showAccount = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestShowAccount());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveShowAccountSuccess(response.data, response.status));
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
        dispatch(actions.receiveShowAccountError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// showBottle calls the show action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const showBottle = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestShowBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveShowBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveShowBottleError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// updateAccount calls the update action of the account resource.
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
export const updateAccount = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestUpdateAccount());
    return axios({
      timeout: 20000,
      url,
      method: 'put',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveUpdateAccountSuccess(response.data, response.status));
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
        dispatch(actions.receiveUpdateAccountError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// updateBottle calls the update action of the bottle resource.
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
export const updateBottle = (url, options, data, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestUpdateBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'patch',
      data,
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveUpdateBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveUpdateBottleError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// watchBottle calls the watch action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID/watch
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const watchBottle = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestWatchBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'get',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveWatchBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveWatchBottleError(rdata, error.status));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
