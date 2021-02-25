import * as constants from 'constants/transaction';

export const createTransaction = (data) => {
  return {
    type: constants.CREATE_TRANSACTION,
    payload: data,
  };
};

export const createTransactionSuccess = (data) => {
  return {
    type: constants.CREATE_TRANSACTION_SUCCESS,
    payload: data,
  };
};

export const createTransactionFail = (data) => {
  return {
    type: constants.CREATE_TRANSACTION_FAIL,
    payload: data,
  };
};

export const getTransactionUser = () => {
  return {
    type: constants.GET_TRANSACTION_USER,
  };
};

export const getTransactionUserSuccess = (data) => {
  return {
    type: constants.GET_TRANSACTION_USER_SUCCESS,
    payload: data,
  };
};

export const getTransactionUserFail = (data) => {
  return {
    type: constants.GET_TRANSACTION_USER_FAIL,
    payload: data,
  };
};

export const getTransactionHotel = (data) => {
  return {
    type: constants.GET_TRANSACTION_HOTEL,
    payload: data,
  };
};

export const getTransactionHotelSuccess = (data) => {
  return {
    type: constants.GET_TRANSACTION_HOTEL_SUCCESS,
    payload: data,
  };
};

export const getTransactionHotelFail = (data) => {
  return {
    type: constants.GET_TRANSACTION_HOTEL_FAIL,
    payload: data,
  };
};

export const checkIn = (data) => {
  return {
    type: constants.CHECK_IN,
    payload: data,
  };
};

export const checkInSuccess = (data) => {
  return {
    type: constants.CHECK_IN_SUCCESS,
    payload: data,
  };
};

export const checkInFail = (data) => {
  return {
    type: constants.CHECK_IN_FAIL,
    payload: data,
  };
};

export const checkOut = (data) => {
  return {
    type: constants.CHECK_OUT,
    payload: data,
  };
};

export const checkOutSuccess = (data) => {
  return {
    type: constants.CHECK_OUT_SUCCESS,
    payload: data,
  };
};

export const checkOutFail = (data) => {
  return {
    type: constants.CHECK_OUT_FAIL,
    payload: data,
  };
};
