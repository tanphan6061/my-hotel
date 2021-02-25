import * as constants from 'constants/location';

export const getCityList = () => {
  return {
    type: constants.GET_CITY_LIST,
  };
};

export const getCityListSuccess = (data) => {
  return {
    type: constants.GET_CITY_LIST_SUCCESS,
    payload: data,
  };
};

export const getCityListFail = (data) => {
  return {
    type: constants.GET_CITY_LIST_FAIL,
    payload: data,
  };
};

export const getDistrictList = (id) => {
  return {
    type: constants.GET_DISTRICT_LIST,
    payload: id,
  };
};

export const getDistrictListSuccess = (data) => {
  return {
    type: constants.GET_DISTRICT_LIST_SUCCESS,
    payload: data,
  };
};

export const getDistrictListFail = (data) => {
  return {
    type: constants.GET_DISTRICT_LIST_FAIL,
    payload: data,
  };
};

export const getWardList = (id) => {
  return {
    type: constants.GET_WARD_LIST,
    payload: id,
  };
};

export const getWardListSuccess = (data) => {
  return {
    type: constants.GET_WARD_LIST_SUCCESS,
    payload: data,
  };
};

export const getWardListFail = (data) => {
  return {
    type: constants.GET_WARD_LIST_FAIL,
    payload: data,
  };
};

export const setCity = (data) => {
  return {
    type: constants.SET_CITY,
    payload: data,
  };
};
export const setDistrict = (data) => {
  return {
    type: constants.SET_DISTRICT,
    payload: data,
  };
};

export const setWard = (data) => {
  return {
    type: constants.SET_WARD,
    payload: data,
  };
};
