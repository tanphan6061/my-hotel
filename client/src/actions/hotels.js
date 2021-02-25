import * as constants from 'constants/hotels';

export const fetchHotelList = () => {
  return {
    type: constants.FETCH_HOTEL_LIST,
  };
};

export const fetchHotelListSuccess = (data) => {
  return {
    type: constants.FETCH_HOTEL_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchHotelListFail = (data) => {
  return {
    type: constants.FETCH_HOTEL_LIST_FAIL,
    payload: data,
  };
};

export const setHotelEditing = (data) => {
  return {
    type: constants.SET_HOTEL_EDITING,
    payload: data,
  };
};

export const addHotel = (data) => {
  return {
    type: constants.ADD_HOTEL,
    payload: data,
  };
};

export const addHotelSuccess = (data) => {
  return {
    type: constants.ADD_HOTEL_SUCCESS,
    payload: data,
  };
};

export const addHotelFail = (data) => {
  return {
    type: constants.ADD_HOTEL_FAIL,
    payload: data,
  };
};
export const editHotel = (data) => {
  return {
    type: constants.EDIT_HOTEL,
    payload: data,
  };
};

export const editHotelSuccess = (data) => {
  return {
    type: constants.EDIT_HOTEL_SUCCESS,
    payload: data,
  };
};

export const editHotelFail = (data) => {
  return {
    type: constants.EDIT_HOTEL_FAIL,
    payload: data,
  };
};

export const deleteHotel = (data) => {
  return {
    type: constants.DELETE_HOTEL,
    payload: data,
  };
};

export const deleteHotelSuccess = (data) => {
  return {
    type: constants.DELETE_HOTEL_SUCCESS,
    payload: data,
  };
};

export const deleteHotelFail = (data) => {
  return {
    type: constants.DELETE_HOTEL_FAIL,
    payload: data,
  };
};

export const filterHotel = (data) => {
  return {
    type: constants.FILTER_HOTEL,
    payload: data,
  };
};

export const filterHotelSuccess = (data) => {
  return {
    type: constants.FILTER_HOTEL_SUCCESS,
    payload: data,
  };
};

export const filterHotelFail = (data) => {
  return {
    type: constants.FILTER_HOTEL_FAIL,
    payload: data,
  };
};

export const getHotelById = (data) => {
  return {
    type: constants.GET_HOTEL_BY_ID,
    payload: data,
  };
};

export const getHotelByIdSuccess = (data) => {
  return {
    type: constants.GET_HOTEL_BY_ID_SUCCESS,
    payload: data,
  };
};

export const getHotelByIdFail = (data) => {
  return {
    type: constants.GET_HOTEL_BY_ID_FAIL,
    payload: data,
  };
};
