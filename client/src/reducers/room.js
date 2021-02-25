import { toast } from 'react-toastify';
import * as constants from '../constants/room';

const initialState = {
  roomList: [],
  roomEditing: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_ROOM_EDITING: {
      let hotel = state.roomList.find((i) => i._id === payload);
      if (!hotel) hotel = {};
      return { ...state, roomEditing: hotel };
    }

    case constants.FETCH_ROOM_LIST:
      return { ...state };
    case constants.FETCH_ROOM_LIST_SUCCESS:
      return { ...state, roomList: payload };
    case constants.FETCH_ROOM_LIST_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.ADD_ROOM:
      return { ...state };
    case constants.ADD_ROOM_SUCCESS: {
      const { roomList } = state;
      roomList.push(payload);
      return { ...state, roomList };
    }
    case constants.ADD_ROOM_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.EDIT_ROOM:
      return { ...state };
    case constants.EDIT_ROOM_SUCCESS: {
      const { roomList } = state;
      const index = state.roomList.findIndex((i) => i._id === payload.id);
      roomList[index] = payload;
      return { ...state, roomList, roomEditing: payload };
    }
    case constants.EDIT_ROOM_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.DELETE_ROOM:
      return { ...state };
    case constants.DELETE_ROOM_SUCCESS: {
      const { roomList } = state;
      const index = state.roomList.findIndex((i) => i._id === payload);

      roomList.splice(index, 1);
      return { ...state, roomList, roomEditing: payload };
    }
    case constants.DELETE_ROOM_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    case constants.GET_ROOM_BY_ID:
      return { ...state };
    case constants.GET_ROOM_BY_ID_SUCCESS: {
      return { ...state, roomEditing: payload };
    }
    case constants.GET_ROOM_BY_ID_FAIL: {
      toast.error(payload);
      return { ...state };
    }

    default:
      return state;
  }
};
