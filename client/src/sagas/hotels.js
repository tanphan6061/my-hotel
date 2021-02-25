import { call, put, takeLatest } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import * as hotelApis from 'apis/hotels';
import * as hotelActions from 'actions/hotels';
import * as hotelConstants from 'constants/hotels';
import { setLoading, setSweetAlert } from 'actions/ui';

function* fetchHotelList() {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.fetchHotelList);
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.fetchHotelListSuccess(data.hotels));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(hotelActions.fetchHotelListFail(err.response.data.message));
  }
}

function* addHotel({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.addHotel, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.addHotelSuccess(data.hotel));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Thêm khách sạn thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(hotelActions.addHotelFail(err.response.data.message));
  }
}

function* editHotel({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.editHotel, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.editHotelSuccess(data.hotel));
      yield put(push(`/admin/hotel/${payload.id}/info`));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Sửa khách sạn thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(hotelActions.editHotelFail(err.response.data.message));
  }
}

function* deleteHotel({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.deleteHotel, { hotelId: payload });
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.deleteHotelSuccess(data.id));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Xoá khách sạn thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(hotelActions.deleteHotelFail(err.response.data.message));
  }
}

function* getHotelById({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.getHotelById, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.getHotelByIdSuccess(data));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(replace('/error'));
    yield put(hotelActions.getHotelByIdFail('Khách sạn không tồn tại'));
  }
}

function* filterHotel({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(hotelApis.filterHotel, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(hotelActions.filterHotelSuccess(data.hotels));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(hotelActions.filterHotelFail(err.response.data.message));
  }
}

function* saga() {
  yield takeLatest(hotelConstants.FETCH_HOTEL_LIST, fetchHotelList);
  yield takeLatest(hotelConstants.ADD_HOTEL, addHotel);
  yield takeLatest(hotelConstants.DELETE_HOTEL, deleteHotel);
  yield takeLatest(hotelConstants.EDIT_HOTEL, editHotel);
  yield takeLatest(hotelConstants.GET_HOTEL_BY_ID, getHotelById);
  yield takeLatest(hotelConstants.FILTER_HOTEL, filterHotel);
}

export default saga;
