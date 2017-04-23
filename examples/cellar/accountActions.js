// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './accountActionTypes';

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
export const requestDeleteAccount = () => ({
  type: types.REQ_DELETE_ACCOUNT
});
export const receiveDeleteAccountSuccess = (data, status) => ({
  type: types.RCV_DELETE_ACCOUNT_SUCCESS,
  data,
  status
});
export const receiveDeleteAccountError = (data, status) => ({
  type: types.RCV_DELETE_ACCOUNT_ERROR,
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
