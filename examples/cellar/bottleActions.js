// This module exports redux actions for the cellar API hosted at localhost:8081.
import * as types from './bottleActionTypes';

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
export const requestDeleteBottle = () => ({
  type: types.REQ_DELETE_BOTTLE
});
export const receiveDeleteBottleSuccess = (data, status) => ({
  type: types.RCV_DELETE_BOTTLE_SUCCESS,
  data,
  status
});
export const receiveDeleteBottleError = (data, status) => ({
  type: types.RCV_DELETE_BOTTLE_ERROR,
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
