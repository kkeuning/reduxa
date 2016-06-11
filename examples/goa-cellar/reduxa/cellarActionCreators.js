// This module exports redux action creators for the cellar API hosted at cellar.goa.design.
// Redux Thunk middleware or equivalent is required to use these action creators.
// It uses the axios javascript library for making the actual HTTP requests.
import * as actions from './cellarActions';
import axios from 'axios';

// Create new account
// path is the request path, the format is "/cellar/accounts"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const createAccount = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestCreateAccount());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'post',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveCreateAccountSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveCreateAccountError(response.data, response.status));
      });
  };
};

// Record new bottle
// path is the request path, the format is "/cellar/accounts/:accountID/bottles"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const createBottle = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestCreateBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'post',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveCreateBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveCreateBottleError(response.data, response.status));
      });
  };
};

// deleteAccount calls the delete action of the account resource.
// path is the request path, the format is "/cellar/accounts/:accountID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const deleteAccount = (path) => {
  return (dispatch) => {
    dispatch(actions.requestDeleteAccount());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'delete',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveDeleteAccountSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveDeleteAccountError(response.data, response.status));
      });
  };
};

// deleteBottle calls the delete action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const deleteBottle = (path) => {
  return (dispatch) => {
    dispatch(actions.requestDeleteBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'delete',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveDeleteBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveDeleteBottleError(response.data, response.status));
      });
  };
};

// List all bottles in account optionally filtering by year
// path is the request path, the format is "/cellar/accounts/:accountID/bottles"
// years is used to build the request query string.
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const listBottle = (path, years) => {
  return (dispatch) => {
    dispatch(actions.requestListBottle());
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
        dispatch(actions.receiveListBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveListBottleError(response.data, response.status));
      });
  };
};

// rateBottle calls the rate action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID/actions/rate"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const rateBottle = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestRateBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'put',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveRateBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveRateBottleError(response.data, response.status));
      });
  };
};

// Retrieve account with given id. IDs 1 and 2 pre-exist in the system.
// path is the request path, the format is "/cellar/accounts/:accountID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const showAccount = (path) => {
  return (dispatch) => {
    dispatch(actions.requestShowAccount());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveShowAccountSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveShowAccountError(response.data, response.status));
      });
  };
};

// Retrieve bottle with given id
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const showBottle = (path) => {
  return (dispatch) => {
    dispatch(actions.requestShowBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveShowBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveShowBottleError(response.data, response.status));
      });
  };
};

// Change account name
// path is the request path, the format is "/cellar/accounts/:accountID"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const updateAccount = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAccount());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'put',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveUpdateAccountSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveUpdateAccountError(response.data, response.status));
      });
  };
};

// updateBottle calls the update action of the bottle resource.
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID"
// data contains the action payload (request body)
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const updateBottle = (path, data) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'patch',
      data: data,
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveUpdateBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveUpdateBottleError(response.data, response.status));
      });
  };
};

// Retrieve bottle with given id
// path is the request path, the format is "/cellar/accounts/:accountID/bottles/:bottleID/watch"
// This function returns a promise which dispatches an error if the HTTP response is a 4xx or 5xx.
export const watchBottle = (path) => {
  return (dispatch) => {
    dispatch(actions.requestWatchBottle());
    return axios({
      timeout: 20000,
      url: 'http://cellar.goa.design' + path,
      method: 'get',
      responseType: 'json'
    })
      .then((response) => {
        dispatch(actions.receiveWatchBottleSuccess(response.data, response.status));
      })
      .catch((response) => {
        dispatch(actions.receiveWatchBottleError(response.data, response.status));
      });
  };
};
