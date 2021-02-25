import * as constants from '../constants/location';

const initialState = {
  cityList: [],
  districtList: [],
  wardlist: [],
  city: {},
  district: {},
  ward: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case constants.GET_CITY_LIST:
    //   return { ...state };
    case constants.GET_CITY_LIST_SUCCESS: {
      return { ...state, cityList: payload };
    }
    case constants.GET_CITY_LIST_FAIL:
      return { ...state };

    case constants.GET_DISTRICT_LIST_SUCCESS: {
      return { ...state, districtList: payload };
    }
    case constants.GET_DISTRICT_LIST_FAIL:
      return { ...state };

    case constants.GET_WARD_LIST_SUCCESS: {
      return { ...state, wardList: payload };
    }
    case constants.GET_WARD_LIST_FAIL:
      return { ...state };

    case constants.SET_CITY:
      return { ...state, city: payload };
    case constants.SET_DISTRICT:
      return { ...state, district: payload };
    case constants.SET_WARD:
      return { ...state, ward: payload };
    default:
      return state;
  }
};
