// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './cellarActionTypes';

export const requestCreateAccounts = () => ({
  type: types.REQ_CREATE_ACCOUNTS
});
export const receiveCreateAccountsSuccess = (data, status) => ({
  type: types.RCV_CREATE_ACCOUNTS_SUCCESS,
  data,
  status
});
export const receiveCreateAccountsError = (data, status) => ({
  type: types.RCV_CREATE_ACCOUNTS_ERROR,
  data: data,
  status
});
export const requestCreateBottles = () => ({
  type: types.REQ_CREATE_BOTTLES
});
export const receiveCreateBottlesSuccess = (data, status) => ({
  type: types.RCV_CREATE_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveCreateBottlesError = (data, status) => ({
  type: types.RCV_CREATE_BOTTLES_ERROR,
  data: data,
  status
});
export const requestDeleteAccounts = () => ({
  type: types.REQ_DELETE_ACCOUNTS
});
export const receiveDeleteAccountsSuccess = (data, status) => ({
  type: types.RCV_DELETE_ACCOUNTS_SUCCESS,
  data,
  status
});
export const receiveDeleteAccountsError = (data, status) => ({
  type: types.RCV_DELETE_ACCOUNTS_ERROR,
  data: data,
  status
});
export const requestDeleteBottles = () => ({
  type: types.REQ_DELETE_BOTTLES
});
export const receiveDeleteBottlesSuccess = (data, status) => ({
  type: types.RCV_DELETE_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveDeleteBottlesError = (data, status) => ({
  type: types.RCV_DELETE_BOTTLES_ERROR,
  data: data,
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
  data: data,
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
  data: data,
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
  data: data,
  status
});
export const requestRateBottles = () => ({
  type: types.REQ_RATE_BOTTLES
});
export const receiveRateBottlesSuccess = (data, status) => ({
  type: types.RCV_RATE_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveRateBottlesError = (data, status) => ({
  type: types.RCV_RATE_BOTTLES_ERROR,
  data: data,
  status
});
export const requestShowAccounts = () => ({
  type: types.REQ_SHOW_ACCOUNTS
});
export const receiveShowAccountsSuccess = (data, status) => ({
  type: types.RCV_SHOW_ACCOUNTS_SUCCESS,
  data,
  status
});
export const receiveShowAccountsError = (data, status) => ({
  type: types.RCV_SHOW_ACCOUNTS_ERROR,
  data: data,
  status
});
export const requestShowBottles = () => ({
  type: types.REQ_SHOW_BOTTLES
});
export const receiveShowBottlesSuccess = (data, status) => ({
  type: types.RCV_SHOW_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveShowBottlesError = (data, status) => ({
  type: types.RCV_SHOW_BOTTLES_ERROR,
  data: data,
  status
});
export const requestUpdateAccounts = () => ({
  type: types.REQ_UPDATE_ACCOUNTS
});
export const receiveUpdateAccountsSuccess = (data, status) => ({
  type: types.RCV_UPDATE_ACCOUNTS_SUCCESS,
  data,
  status
});
export const receiveUpdateAccountsError = (data, status) => ({
  type: types.RCV_UPDATE_ACCOUNTS_ERROR,
  data: data,
  status
});
export const requestUpdateBottles = () => ({
  type: types.REQ_UPDATE_BOTTLES
});
export const receiveUpdateBottlesSuccess = (data, status) => ({
  type: types.RCV_UPDATE_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveUpdateBottlesError = (data, status) => ({
  type: types.RCV_UPDATE_BOTTLES_ERROR,
  data: data,
  status
});
export const requestWatchBottles = () => ({
  type: types.REQ_WATCH_BOTTLES
});
export const receiveWatchBottlesSuccess = (data, status) => ({
  type: types.RCV_WATCH_BOTTLES_SUCCESS,
  data,
  status
});
export const receiveWatchBottlesError = (data, status) => ({
  type: types.RCV_WATCH_BOTTLES_ERROR,
  data: data,
  status
});
