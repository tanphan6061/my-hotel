import * as constants from 'constants/room';

export const fetchRoomList = (data) => {
  return {
    type: constants.FETCH_ROOM_LIST,
    payload: data,
  };
};

export const fetchRoomListSuccess = (data) => {
  return {
    type: constants.FETCH_ROOM_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchRoomListFail = (data) => {
  return {
    type: constants.FETCH_ROOM_LIST_FAIL,
    payload: data,
  };
};

export const setRoomEditing = (data) => {
  return {
    type: constants.SET_ROOM_EDITING,
    payload: data,
  };
};

export const addRoom = (data) => {
  return {
    type: constants.ADD_ROOM,
    payload: data,
  };
};

export const addRoomSuccess = (data) => {
  return {
    type: constants.ADD_ROOM_SUCCESS,
    payload: data,
  };
};

export const addRoomFail = (data) => {
  return {
    type: constants.ADD_ROOM_FAIL,
    payload: data,
  };
};
export const editRoom = (data) => {
  return {
    type: constants.EDIT_ROOM,
    payload: data,
  };
};

export const editRoomSuccess = (data) => {
  return {
    type: constants.EDIT_ROOM_SUCCESS,
    payload: data,
  };
};

export const editRoomFail = (data) => {
  return {
    type: constants.EDIT_ROOM_FAIL,
    payload: data,
  };
};

export const deleteRoom = (data) => {
  return {
    type: constants.DELETE_ROOM,
    payload: data,
  };
};

export const deleteRoomSuccess = (data) => {
  return {
    type: constants.DELETE_ROOM_SUCCESS,
    payload: data,
  };
};

export const deleteRoomFail = (data) => {
  return {
    type: constants.DELETE_ROOM_FAIL,
    payload: data,
  };
};

export const getRoomById = (data) => {
  return {
    type: constants.GET_ROOM_BY_ID,
    payload: data,
  };
};

export const getRoomByIdSuccess = (data) => {
  return {
    type: constants.GET_ROOM_BY_ID_SUCCESS,
    payload: data,
  };
};

export const getRoomByIdFail = (data) => {
  return {
    type: constants.GET_ROOM_BY_ID_FAIL,
    payload: data,
  };
};
