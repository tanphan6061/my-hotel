import { toast } from 'react-toastify';
import * as constants from '../constants/user';

const initialState = {
  userList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_USER_LIST:
      return { ...state };
    case constants.FETCH_USER_LIST_SUCCESS:
      return { ...state, userList: payload };
    case constants.FETCH_USER_LIST_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.SET_ROLE_USER:
      return { ...state };
    case constants.SET_ROLE_USER_SUCCESS: {
      const { userList } = state;
      const index = state.userList.findIndex((i) => i._id === payload._id);
      userList[index] = payload;
      return { ...state, userList: [...userList] };
    }
    case constants.SET_ROLE_USER_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    default:
      return state;
  }
};
