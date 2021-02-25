import { setLoading, setSweetAlert } from 'actions/ui';
import * as userActions from 'actions/user';
import * as userApis from 'apis/user';
import * as userConstants from 'constants/user';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUserList({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(userApis.fetchUserList, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(userActions.fetchUserListSuccess(data.users));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(userActions.fetchUserListFail(err.response.data.message));
  }
}

function* setRoleUser({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(userApis.setRoleUser, payload);
    const { status, data } = res;
    const { user } = data;
    if (status === 200) {
      yield put(userActions.setRoleUserSuccess(user));
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Sửa quyền của tài khoản thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(userActions.setRoleUserFail(err.response.data.message));
  }
}

function* saga() {
  yield takeLatest(userConstants.FETCH_USER_LIST, fetchUserList);
  yield takeLatest(userConstants.SET_ROLE_USER, setRoleUser);
}

export default saga;
