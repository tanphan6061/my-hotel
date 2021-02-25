import * as constants from '../constants/ui';

const initialState = {
  isLoading: false,
  sweetAlert: {
    isSuccess: false,
    message: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_LOADING:
      return { ...state, isLoading: payload };

    case constants.SET_SWEET_ALERT: {
      const { isSuccess, message } = payload;
      const sweetAlert = { isSuccess, message };
      return { ...state, sweetAlert };
    }
    default:
      return state;
  }
};
