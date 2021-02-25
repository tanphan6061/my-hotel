import { call, put, takeLatest } from 'redux-saga/effects';
import { replace, push } from 'connected-react-router';
import * as roomApis from 'apis/room';
import * as roomActions from 'actions/room';
import * as roomConstants from 'constants/room';
import { setLoading, setSweetAlert } from 'actions/ui';

function* fetchRoomList({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(roomApis.fetchRoomList, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(roomActions.fetchRoomListSuccess(data.rooms));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(roomActions.fetchRoomListFail(err.response.data.message));
  }
}

function* addRoom({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(roomApis.addRoom, payload);
    const { status, data } = res;
    const { room } = data;
    if (status === 200) {
      yield put(roomActions.addRoomSuccess(room));
      yield put(push(`/admin/hotel/${room.hotel._id}/room/${room._id}/info`));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Thêm phòng thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(roomActions.addRoomFail(err.response.data.message));
  }
}

function* editRoom({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(roomApis.editRoom, payload);
    const { status, data } = res;
    const { room } = data;
    if (status === 200) {
      yield put(roomActions.editRoomSuccess(room));
      yield put(push(`/admin/hotel/${room.hotel._id}/room/${room._id}/info`));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Sửa phòng thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(roomActions.editRoomFail(err.response.data.message));
  }
}

function* deleteRoom({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(roomApis.deleteRoom, { roomId: payload });
    const { status, data } = res;
    if (status === 200) {
      yield put(roomActions.deleteRoomSuccess(data.id));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Xoá phòng thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(roomActions.deleteRoomFail(err.response.data.message));
  }
}

function* getRoomById({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(roomApis.getRoomById, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(roomActions.getRoomByIdSuccess(data));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(replace('/error'));
    yield put(roomActions.getRoomByIdFail('Phòng không tồn tại'));
  }
}

function* saga() {
  yield takeLatest(roomConstants.FETCH_ROOM_LIST, fetchRoomList);
  yield takeLatest(roomConstants.ADD_ROOM, addRoom);
  yield takeLatest(roomConstants.DELETE_ROOM, deleteRoom);
  yield takeLatest(roomConstants.EDIT_ROOM, editRoom);
  yield takeLatest(roomConstants.GET_ROOM_BY_ID, getRoomById);
}

export default saga;
