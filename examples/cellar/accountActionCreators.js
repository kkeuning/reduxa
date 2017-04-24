// This module exports redux action creators for the cellar API hosted at localhost:8081.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import axios from 'axios';
import * as actions from './accountActions';

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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveCreateAccountError(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// deleteAccount calls the delete action of the account resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const deleteAccount = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDeleteAccount());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDeleteAccountSuccess(response.data, response.status));
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
        dispatch(actions.receiveDeleteAccountError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveListAccountsError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveShowAccountError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveUpdateAccountError(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
