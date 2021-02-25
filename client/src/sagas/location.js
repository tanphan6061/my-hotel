import { call, put, takeLatest } from 'redux-saga/effects';
import * as locationApis from 'apis/location';
import * as locationActions from 'actions/location';
import * as locationConstants from 'constants/location';

function* getCityList() {
  const res = yield call(locationApis.getCityList);
  const { status, data } = res;
  if (status === 200) {
    yield put(
      locationActions.getCityListSuccess(data.slice(0, data.length - 1)),
    );
  } else {
    yield put(locationActions.getCityListFail(data));
  }
}

function* getDistrictList({ payload }) {
  const res = yield call(locationApis.getDistrictList, payload); // tham so
  const { status, data } = res;
  if (status === 200) {
    yield put(locationActions.getDistrictListSuccess(data));
  } else {
    yield put(locationActions.getDistrictListFail(data));
  }
}

function* getWardList({ payload }) {
  const res = yield call(locationApis.getWardList, payload); // tham so
  const { status, data } = res;
  if (status === 200) {
    yield put(locationActions.getWardListSuccess(data));
  } else {
    yield put(locationActions.getWardListFail(data));
  }
}

function* saga() {
  yield takeLatest(locationConstants.GET_CITY_LIST, getCityList);
  yield takeLatest(locationConstants.GET_DISTRICT_LIST, getDistrictList);
  yield takeLatest(locationConstants.GET_WARD_LIST, getWardList);
}

export default saga;
