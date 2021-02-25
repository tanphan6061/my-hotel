import * as constants from 'constants/user';

export const fetchUserList = (data) => {
  return {
    type: constants.FETCH_USER_LIST,
    payload: data,
  };
};

export const fetchUserListSuccess = (data) => {
  return {
    type: constants.FETCH_USER_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchUserListFail = (data) => {
  return {
    type: constants.FETCH_USER_LIST_FAIL,
    payload: data,
  };
};

export const setRoleUser = (data) => {
  return {
    type: constants.SET_ROLE_USER,
    payload: data,
  };
};

export const setRoleUserSuccess = (data) => {
  return {
    type: constants.SET_ROLE_USER_SUCCESS,
    payload: data,
  };
};

export const setRoleUserFail = (data) => {
  return {
    type: constants.SET_ROLE_USER_FAIL,
    payload: data,
  };
};
