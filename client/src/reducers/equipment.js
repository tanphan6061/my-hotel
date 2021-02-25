import { toast } from 'react-toastify';
import * as constants from '../constants/equipment';

const initialState = {
  equipmentList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_EQUIPMENT_LIST:
      return { ...state };
    case constants.FETCH_EQUIPMENT_LIST_SUCCESS: {
      return { ...state, equipmentList: payload };
    }
    case constants.FETCH_EQUIPMENT_LIST_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.CREATE_EQUIPMENT:
      return { ...state };
    case constants.CREATE_EQUIPMENT_SUCCESS: {
      const { equipmentList } = state;
      equipmentList.push(payload);
      return { ...state, equipmentList };
    }
    case constants.CREATE_EQUIPMENT_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    default:
      return state;
  }
};
