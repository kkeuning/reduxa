// This module exports redux action creators for the cellar API hosted at localhost:8081.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import axios from 'axios';
import * as actions from './bottleActions';

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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveCreateBottleError(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };

// deleteBottle calls the delete action of the bottle resource.
// url is the request url, the format is:
// http://localhost:8081/cellar/accounts/:accountID/bottles/:bottleID
// Optional handleError and handleSuccess functions can be provided for the promise
// if needed in addition to the redux actions.
// Standard or custom headers can be passed in like this in the options:
// { headers: {'X-My-Custom-Header': 'Header-Value'} }
// The options object will take precedence over default values for timeout, etc.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
// Params should be passed in the options object.
export const deleteBottle = (url, options, handleSuccess, handleError) =>
  dispatch => {
    dispatch(actions.requestDeleteBottle());
    return axios({
      timeout: 20000,
      url,
      method: 'delete',
      responseType: 'json',
      ...options
    })
      .then(response => {
        dispatch(actions.receiveDeleteBottleSuccess(response.data, response.status));
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
        dispatch(actions.receiveDeleteBottleError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveListBottlesError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveRateBottleError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveShowBottleError(rdata, rstatus));
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
        let rstatus;
        if (error.response) {
          rdata = error.response.data;
          rstatus = error.response.status;
        }
        dispatch(actions.receiveUpdateBottleError(rdata, rstatus));
        throw error;
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  };
