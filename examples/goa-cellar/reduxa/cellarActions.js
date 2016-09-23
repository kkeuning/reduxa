// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './cellarActionTypes';

export const requestCreateAccounts = () => ({
  type: types.REQ_CREATE_ACCOUNTS
});
export const receiveCreateAccountsSuccess = (json, status) => ({
  type: types.RECV_CREATE_ACCOUNTS_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveCreateAccountsError = (json, status) => ({
  type: types.RECV_CREATE_ACCOUNTS_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestCreateBottles = () => ({
  type: types.REQ_CREATE_BOTTLES
});
export const receiveCreateBottlesSuccess = (json, status) => ({
  type: types.RECV_CREATE_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveCreateBottlesError = (json, status) => ({
  type: types.RECV_CREATE_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestDeleteAccounts = () => ({
  type: types.REQ_DELETE_ACCOUNTS
});
export const receiveDeleteAccountsSuccess = (json, status) => ({
  type: types.RECV_DELETE_ACCOUNTS_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveDeleteAccountsError = (json, status) => ({
  type: types.RECV_DELETE_ACCOUNTS_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestDeleteBottles = () => ({
  type: types.REQ_DELETE_BOTTLES
});
export const receiveDeleteBottlesSuccess = (json, status) => ({
  type: types.RECV_DELETE_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveDeleteBottlesError = (json, status) => ({
  type: types.RECV_DELETE_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestHealth_ah = () => ({
  type: types.REQ_HEALTH__AH
});
export const receiveHealth_ahSuccess = (json, status) => ({
  type: types.RECV_HEALTH__AH_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveHealth_ahError = (json, status) => ({
  type: types.RECV_HEALTH__AH_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestListAccounts = () => ({
  type: types.REQ_LIST_ACCOUNTS
});
export const receiveListAccountsSuccess = (json, status) => ({
  type: types.RECV_LIST_ACCOUNTS_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveListAccountsError = (json, status) => ({
  type: types.RECV_LIST_ACCOUNTS_ERROR,
  data: false,
  message: json,
  status: status
});
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
export const requestRateBottles = () => ({
  type: types.REQ_RATE_BOTTLES
});
export const receiveRateBottlesSuccess = (json, status) => ({
  type: types.RECV_RATE_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveRateBottlesError = (json, status) => ({
  type: types.RECV_RATE_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestShowAccounts = () => ({
  type: types.REQ_SHOW_ACCOUNTS
});
export const receiveShowAccountsSuccess = (json, status) => ({
  type: types.RECV_SHOW_ACCOUNTS_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveShowAccountsError = (json, status) => ({
  type: types.RECV_SHOW_ACCOUNTS_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestShowBottles = () => ({
  type: types.REQ_SHOW_BOTTLES
});
export const receiveShowBottlesSuccess = (json, status) => ({
  type: types.RECV_SHOW_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveShowBottlesError = (json, status) => ({
  type: types.RECV_SHOW_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestUpdateAccounts = () => ({
  type: types.REQ_UPDATE_ACCOUNTS
});
export const receiveUpdateAccountsSuccess = (json, status) => ({
  type: types.RECV_UPDATE_ACCOUNTS_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveUpdateAccountsError = (json, status) => ({
  type: types.RECV_UPDATE_ACCOUNTS_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestUpdateBottles = () => ({
  type: types.REQ_UPDATE_BOTTLES
});
export const receiveUpdateBottlesSuccess = (json, status) => ({
  type: types.RECV_UPDATE_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveUpdateBottlesError = (json, status) => ({
  type: types.RECV_UPDATE_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
export const requestWatchBottles = () => ({
  type: types.REQ_WATCH_BOTTLES
});
export const receiveWatchBottlesSuccess = (json, status) => ({
  type: types.RECV_WATCH_BOTTLES_SUCCESS,
  data: json,
  message: false,
  status: status
});
export const receiveWatchBottlesError = (json, status) => ({
  type: types.RECV_WATCH_BOTTLES_ERROR,
  data: false,
  message: json,
  status: status
});
