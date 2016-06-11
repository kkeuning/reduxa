// This module exports redux actions for the cellar API hosted at cellar.goa.design.
import * as types from './cellarActionTypes';

export const requestCreateAccount = () => ({
  type: types.REQ_CREATE_ACCOUNT
});
export const receiveCreateAccountSuccess = (json, code) => ({
  type: types.RECV_CREATE_ACCOUNT_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveCreateAccountError = (json, code) => ({
  type: types.RECV_CREATE_ACCOUNT_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestCreateBottle = () => ({
  type: types.REQ_CREATE_BOTTLE
});
export const receiveCreateBottleSuccess = (json, code) => ({
  type: types.RECV_CREATE_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveCreateBottleError = (json, code) => ({
  type: types.RECV_CREATE_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestDeleteAccount = () => ({
  type: types.REQ_DELETE_ACCOUNT
});
export const receiveDeleteAccountSuccess = (json, code) => ({
  type: types.RECV_DELETE_ACCOUNT_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveDeleteAccountError = (json, code) => ({
  type: types.RECV_DELETE_ACCOUNT_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestDeleteBottle = () => ({
  type: types.REQ_DELETE_BOTTLE
});
export const receiveDeleteBottleSuccess = (json, code) => ({
  type: types.RECV_DELETE_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveDeleteBottleError = (json, code) => ({
  type: types.RECV_DELETE_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestListBottle = () => ({
  type: types.REQ_LIST_BOTTLE
});
export const receiveListBottleSuccess = (json, code) => ({
  type: types.RECV_LIST_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveListBottleError = (json, code) => ({
  type: types.RECV_LIST_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestRateBottle = () => ({
  type: types.REQ_RATE_BOTTLE
});
export const receiveRateBottleSuccess = (json, code) => ({
  type: types.RECV_RATE_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveRateBottleError = (json, code) => ({
  type: types.RECV_RATE_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestShowAccount = () => ({
  type: types.REQ_SHOW_ACCOUNT
});
export const receiveShowAccountSuccess = (json, code) => ({
  type: types.RECV_SHOW_ACCOUNT_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveShowAccountError = (json, code) => ({
  type: types.RECV_SHOW_ACCOUNT_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestShowBottle = () => ({
  type: types.REQ_SHOW_BOTTLE
});
export const receiveShowBottleSuccess = (json, code) => ({
  type: types.RECV_SHOW_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveShowBottleError = (json, code) => ({
  type: types.RECV_SHOW_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestUpdateAccount = () => ({
  type: types.REQ_UPDATE_ACCOUNT
});
export const receiveUpdateAccountSuccess = (json, code) => ({
  type: types.RECV_UPDATE_ACCOUNT_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveUpdateAccountError = (json, code) => ({
  type: types.RECV_UPDATE_ACCOUNT_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestUpdateBottle = () => ({
  type: types.REQ_UPDATE_BOTTLE
});
export const receiveUpdateBottleSuccess = (json, code) => ({
  type: types.RECV_UPDATE_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveUpdateBottleError = (json, code) => ({
  type: types.RECV_UPDATE_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
export const requestWatchBottle = () => ({
  type: types.REQ_WATCH_BOTTLE
});
export const receiveWatchBottleSuccess = (json, code) => ({
  type: types.RECV_WATCH_BOTTLE_SUCCESS,
  data: json,
  message: false,
  code: code
});
export const receiveWatchBottleError = (json, code) => ({
  type: types.RECV_WATCH_BOTTLE_ERROR,
  data: false,
  message: json,
  code: code
});
