import * as equipmentActions from 'actions/equipment';
import { setLoading, setSweetAlert } from 'actions/ui';
import * as equipmentApis from 'apis/equipment';
import * as equipmentConstants from 'constants/equipment';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchEquipmentList() {
  try {
    yield put(setLoading(true));
    const res = yield call(equipmentApis.fetchEquipmentList);
    const { status, data } = res;
    if (status === 200) {
      yield put(equipmentActions.fetchEquipmentListSuccess(data.equipments));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      equipmentActions.fetchEquipmentListFail(err.response.data.message),
    );
  }
}

function* createEquipment({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(equipmentApis.createEquipment, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(equipmentActions.createEquipmentSuccess(data.equipment));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Thêm tiện nghi thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(equipmentActions.createEquipmentFail(err.response.data.message));
  }
}

function* saga() {
  yield takeLatest(equipmentConstants.FETCH_EQUIPMENT_LIST, fetchEquipmentList);
  yield takeLatest(equipmentConstants.CREATE_EQUIPMENT, createEquipment);
}

export default saga;
