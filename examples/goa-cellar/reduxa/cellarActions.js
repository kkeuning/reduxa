// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './cellarActionTypes';

export const requestCreateAccount = () => ({
  type: types.REQ_CREATE_ACCOUNT
});
export const receiveCreateAccountSuccess = (data, status) => ({
  type: types.RCV_CREATE_ACCOUNT_SUCCESS,
  data,
  status
});
export const receiveCreateAccountError = (data, status) => ({
  type: types.RCV_CREATE_ACCOUNT_ERROR,
  data,
  status
});
export const requestCreateBottle = () => ({
  type: types.REQ_CREATE_BOTTLE
});
export const receiveCreateBottleSuccess = (data, status) => ({
  type: types.RCV_CREATE_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveCreateBottleError = (data, status) => ({
  type: types.RCV_CREATE_BOTTLE_ERROR,
  data,
  status
});
export const requestDelete_Account = () => ({
  type: types.REQ_DELETE__ACCOUNT
});
export const receiveDelete_AccountSuccess = (data, status) => ({
  type: types.RCV_DELETE__ACCOUNT_SUCCESS,
  data,
  status
});
export const receiveDelete_AccountError = (data, status) => ({
  type: types.RCV_DELETE__ACCOUNT_ERROR,
  data,
  status
});
export const requestDelete_Bottle = () => ({
  type: types.REQ_DELETE__BOTTLE
});
export const receiveDelete_BottleSuccess = (data, status) => ({
  type: types.RCV_DELETE__BOTTLE_SUCCESS,
  data,
  status
});
export const receiveDelete_BottleError = (data, status) => ({
  type: types.RCV_DELETE__BOTTLE_ERROR,
  data,
  status
});
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
export const requestListAccounts = () => ({
  type: types.REQ_LIST_ACCOUNTS
});
export const receiveListAccountsSuccess = (data, status) => ({
  type: types.RCV_LIST_ACCOUNTS_SUCCESS,
  data,
  status
});
export const receiveListAccountsError = (data, status) => ({
  type: types.RCV_LIST_ACCOUNTS_ERROR,
  data,
  status
});
export const requestListBottles = () => ({
  type: types.REQ_LIST_BOTTLES
});
export const receiveListBottlesSuccess = (data, status) => ({
  type: types.RCV_LIST_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveListBottlesError = (data, status) => ({
  type: types.RCV_LIST_BOTTLES_ERROR,
  data,
  status
});
export const requestRateBottle = () => ({
  type: types.REQ_RATE_BOTTLE
});
export const receiveRateBottleSuccess = (data, status) => ({
  type: types.RCV_RATE_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveRateBottleError = (data, status) => ({
  type: types.RCV_RATE_BOTTLE_ERROR,
  data,
  status
});
export const requestShowAccount = () => ({
  type: types.REQ_SHOW_ACCOUNT
});
export const receiveShowAccountSuccess = (data, status) => ({
  type: types.RCV_SHOW_ACCOUNT_SUCCESS,
  data,
  status
});
export const receiveShowAccountError = (data, status) => ({
  type: types.RCV_SHOW_ACCOUNT_ERROR,
  data,
  status
});
export const requestShowBottle = () => ({
  type: types.REQ_SHOW_BOTTLE
});
export const receiveShowBottleSuccess = (data, status) => ({
  type: types.RCV_SHOW_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveShowBottleError = (data, status) => ({
  type: types.RCV_SHOW_BOTTLE_ERROR,
  data,
  status
});
export const requestUpdateAccount = () => ({
  type: types.REQ_UPDATE_ACCOUNT
});
export const receiveUpdateAccountSuccess = (data, status) => ({
  type: types.RCV_UPDATE_ACCOUNT_SUCCESS,
  data,
  status
});
export const receiveUpdateAccountError = (data, status) => ({
  type: types.RCV_UPDATE_ACCOUNT_ERROR,
  data,
  status
});
export const requestUpdateBottle = () => ({
  type: types.REQ_UPDATE_BOTTLE
});
export const receiveUpdateBottleSuccess = (data, status) => ({
  type: types.RCV_UPDATE_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveUpdateBottleError = (data, status) => ({
  type: types.RCV_UPDATE_BOTTLE_ERROR,
  data,
  status
});
export const requestWatchBottle = () => ({
  type: types.REQ_WATCH_BOTTLE
});
export const receiveWatchBottleSuccess = (data, status) => ({
  type: types.RCV_WATCH_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveWatchBottleError = (data, status) => ({
  type: types.RCV_WATCH_BOTTLE_ERROR,
  data,
  status
});
