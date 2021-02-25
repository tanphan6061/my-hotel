import * as constants from 'constants/equipment';

export const fetchEquipmentList = () => {
  return {
    type: constants.FETCH_EQUIPMENT_LIST,
  };
};

export const fetchEquipmentListSuccess = (data) => {
  return {
    type: constants.FETCH_EQUIPMENT_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchEquipmentListFail = (data) => {
  return {
    type: constants.FETCH_EQUIPMENT_LIST_FAIL,
    payload: data,
  };
};

export const createEquipment = (data) => {
  return {
    type: constants.CREATE_EQUIPMENT,
    payload: data,
  };
};

export const createEquipmentSuccess = (data) => {
  return {
    type: constants.CREATE_EQUIPMENT_SUCCESS,
    payload: data,
  };
};

export const createEquipmentFail = (data) => {
  return {
    type: constants.CREATE_EQUIPMENT_FAIL,
    payload: data,
  };
};
