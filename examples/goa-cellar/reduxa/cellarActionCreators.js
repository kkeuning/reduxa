// This module exports redux action creators for the cellar API hosted at cellar.goa.design.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import * as actions from './cellarActions';
import axios from 'axios';

// Create new account
// path is the request path, the format is "/cellar/accounts"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const createAccounts = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestCreateAccounts());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'post',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveCreateAccountsSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveCreateAccountsError(response.data, response.status));
      });
  };
};

// Record new bottle
// path is the request path, the format is "/cellar/accounts/:accountID/bottles"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const createBottles = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestCreateBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'post',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveCreateBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveCreateBottlesError(response.data, response.status));
      });
  };
};

// deleteAccounts calls the delete action of the account resource.
// path is the request path, the format is "/cellar/accounts/:accountID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const deleteAccounts = (path) => {
  return (dispatch) => {
    dispatch(actions.requestDeleteAccounts());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'delete',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveDeleteAccountsSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveDeleteAccountsError(response.data, response.status));
      });
  };
};

// deleteBottles calls the delete action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const deleteBottles = (path) => {
  return (dispatch) => {
    dispatch(actions.requestDeleteBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'delete',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveDeleteBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveDeleteBottlesError(response.data, response.status));
      });
  };
};

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

// rateBottles calls the rate action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID/actions/rate"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const rateBottles = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestRateBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'put',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveRateBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveRateBottlesError(response.data, response.status));
      });
  };
};

// Retrieve account with given id. IDs 1 and 2 pre-exist in the system.
// path is the request path, the format is "/cellar/accounts/:accountID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const showAccounts = (path) => {
  return (dispatch) => {
    dispatch(actions.requestShowAccounts());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveShowAccountsSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveShowAccountsError(response.data, response.status));
      });
  };
};

// Retrieve bottle with given id
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const showBottles = (path) => {
  return (dispatch) => {
    dispatch(actions.requestShowBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveShowBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveShowBottlesError(response.data, response.status));
      });
  };
};

// Change account name
// path is the request path, the format is "/cellar/accounts/:accountID"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const updateAccounts = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAccounts());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'put',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveUpdateAccountsSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveUpdateAccountsError(response.data, response.status));
      });
  };
};

// updateBottles calls the update action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const updateBottles = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'patch',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveUpdateBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveUpdateBottlesError(response.data, response.status));
      });
  };
};

// Retrieve bottle with given id
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID/watch"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const watchBottles = (path) => {
  return (dispatch) => {
    dispatch(actions.requestWatchBottles());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveWatchBottlesSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveWatchBottlesError(response.data, response.status));
      });
  };
};
