import { toast } from 'react-toastify';
import * as constants from '../constants/hotels';

const initialState = {
  hotelList: [],
  hotelEditing: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_HOTEL_EDITING: {
      let hotel = state.hotelList.find((i) => i._id === payload);
      if (!hotel) hotel = {};
      return { ...state, hotelEditing: hotel };
    }
    case constants.FETCH_HOTEL_LIST:
      return { ...state };
    case constants.FETCH_HOTEL_LIST_SUCCESS:
      return { ...state, hotelList: payload };
    case constants.FETCH_HOTEL_LIST_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.ADD_HOTEL:
      return { ...state };
    case constants.ADD_HOTEL_SUCCESS: {
      const { hotelList } = state;
      hotelList.push(payload);
      return { ...state, hotelList };
    }
    case constants.ADD_HOTEL_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.EDIT_HOTEL:
      return { ...state };
    case constants.EDIT_HOTEL_SUCCESS: {
      const { hotelList } = state;
      const index = state.hotelList.findIndex((i) => i._id === payload.id);
      hotelList[index] = payload;
      return { ...state, hotelList, hotelEditing: payload };
    }
    case constants.EDIT_HOTEL_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.DELETE_HOTEL:
      return { ...state };
    case constants.DELETE_HOTEL_SUCCESS: {
      const { hotelList } = state;
      const index = state.hotelList.findIndex((i) => i._id === payload);
      hotelList.splice(index, 1);
      return { ...state, hotelList, hotelEditing: payload };
    }
    case constants.DELETE_HOTEL_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.FILTER_HOTEL:
      return { ...state };
    case constants.FILTER_HOTEL_SUCCESS: {
      return { ...state, hotelList: payload };
    }
    case constants.FILTER_HOTEL_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.GET_HOTEL_BY_ID:
      return { ...state };
    case constants.GET_HOTEL_BY_ID_SUCCESS:
      return { ...state, hotelEditing: payload };
    case constants.GET_HOTEL_BY_ID_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    default:
      return state;
  }
};
