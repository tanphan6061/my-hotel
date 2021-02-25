import { toast } from 'react-toastify';
import * as constants from '../constants/transaction';

const initialState = {
  transactionList: [],
  transactionEditing: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.CREATE_TRANSACTION:
      return { ...state };
    case constants.CREATE_TRANSACTION_SUCCESS:
      return { ...state, transactionEditing: payload };
    case constants.CREATE_TRANSACTION_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.GET_TRANSACTION_USER:
      return { ...state };
    case constants.GET_TRANSACTION_USER_SUCCESS:
      return { ...state, transactionList: payload };
    case constants.GET_TRANSACTION_USER_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.GET_TRANSACTION_HOTEL:
      return { ...state };
    case constants.GET_TRANSACTION_HOTEL_SUCCESS:
      return { ...state, transactionList: payload };
    case constants.GET_TRANSACTION_HOTEL_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.CHECK_IN:
      return { ...state };
    case constants.CHECK_IN_SUCCESS: {
      const { transactionList } = state;
      const index = state.transactionList.findIndex(
        (i) => i._id === payload._id,
      );
      transactionList[index] = payload;
      return {
        ...state,
        transactionList: [
          ...transactionList.slice(0, index),
          payload,
          ...transactionList.slice(index + 1),
        ],
      };
    }
    case constants.CHECK_IN_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.CHECK_OUT:
      return { ...state };
    case constants.CHECK_OUT_SUCCESS: {
      const { transactionList } = state;
      const index = transactionList.findIndex((i) => i._id === payload._id);
      transactionList[index] = payload;
      return { ...state, transactionList: payload };
    }
    case constants.CHECK_OUT_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    default:
      return state;
  }
};
