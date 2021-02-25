import * as constants from '../constants/ui';

export const setLoading = (data) => {
  return {
    type: constants.SET_LOADING,
    payload: data,
  };
};

export const setSweetAlert = (isSuccess, message) => {
  return {
    type: constants.SET_SWEET_ALERT,
    payload: {
      isSuccess,
      message,
    },
  };
};
