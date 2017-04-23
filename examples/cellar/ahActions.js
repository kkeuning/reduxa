// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './ahActionTypes';

export const requestHealthAh = () => ({
  type: types.REQ_HEALTH_AH
});
export const receiveHealthAhSuccess = (data, status) => ({
  type: types.RCV_HEALTH_AH_SUCCESS,
  data,
  status
});
export const receiveHealthAhError = (data, status) => ({
  type: types.RCV_HEALTH_AH_ERROR,
  data,
  status
});
