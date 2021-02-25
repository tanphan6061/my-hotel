import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  checkAuth,
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess,
  resendCodeFail,
  resendCodeSuccess,
  updateProfileFail,
  updateProfileSuccess,
  verifyFail,
  verifySuccess,
} from '../actions/auth';
import { setLoading, setSweetAlert } from '../actions/ui';
import {
  changePassword,
  login,
  register,
  resendCode,
  updateProfile,
  verify,
} from '../apis/auth';
import * as authConstants from '../constants/auth';

function* loginSaga({ payload }) {
  try {
    const { email, password, role, preURL } = payload;
    yield put(setLoading(true));
    const res = yield call(login, {
      email,
      password,
    });

    const { status, data } = res;

    if (status === 200) {
      if (res.data.role > role) {
        yield put(loginFail('Tài khoản của bạn chưa được nâng cấp'));
      } else {
        yield put(loginSuccess(data));
        yield put(push(preURL));
      }
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(loginFail(err.response.data.message));
  }
}

// function* logout() {
//   try {
//     const res = yield call(logout);
//     const { status, data } = res;
//     if (status === 200) {
//       yield put(resendCodeSuccess(data));
//     }
//     yield delay(1000);
//   } catch (err) {
//     yield put(resendCodeFail(err.response.data.message));
//   }
// }

function* checkAuthSaga() {
  yield checkAuth();
}

function* registerSaga({ payload }) {
  try {
    const {
      email,
      fullname,
      password,
      city,
      district,
      ward,
      street,
      phone,
    } = payload;

    const res = yield call(register, {
      email,
      fullname,
      password,
      city,
      district,
      ward,
      street,
      phone,
    });
    yield put(setLoading(true));
    const { status, data } = res;
    if (status === 200) {
      localStorage.setItem('register', email);
      yield put(registerSuccess(data));
      yield put(push('/verify'));
    }
    yield put(setLoading(false));
    yield delay(1000);
  } catch (err) {
    yield put(setLoading(false));
    yield put(registerFail(err.response.data.message));
  }
}

function* verifySaga({ payload }) {
  try {
    yield put(setLoading(true));
    const { code } = payload;
    const email = localStorage.getItem('register');
    const res = yield call(verify, {
      code,
      email,
    });
    const { status, data } = res;
    if (status === 200) {
      yield put(verifySuccess(data));
      yield put(setLoading(false));
      yield put(
        setSweetAlert(
          true,
          'Tài khoản của bạn đã được kích hoạt, vui lòng đăng nhập',
        ),
      );
      yield put(push('/login'));
    }
  } catch (err) {
    yield put(setLoading(false));
    yield put(verifyFail(err.response.data.message));
  }
}

function* resendCodeSaga() {
  try {
    const email = localStorage.getItem('register');
    const res = yield call(resendCode, {
      email,
    });
    const { status, data } = res;
    if (status === 200) {
      yield put(resendCodeSuccess(data));
    }
    // yield delay(1200);
  } catch (err) {
    yield put(resendCodeFail(err.response.data.message));
  }
}

function* updateProfileSaga({ payload }) {
  const { profile } = payload;
  try {
    const res = yield call(updateProfile, profile);
    const { status, data } = res;
    if (status === 200) {
      yield put(updateProfileSuccess({ data }));
      yield put(setSweetAlert(true, 'Cập nhật thành công'));
    }
  } catch (err) {
    yield put(updateProfileFail(err));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const password_ = payload.password;
    const { password, newPassword } = password_;
    const res = yield call(changePassword, { password, newPassword });
    const { status } = res;
    if (status === 200)
      yield put(setSweetAlert(true, 'Cập nhật mật khẩu thành công'));
  } catch (err) {
    yield put(
      toast.error('Cập nhật mật khẩu không thành công', {
        position: 'top-right',
      }),
    );
  }
}

function* sagas() {
  yield takeLatest(authConstants.LOGIN, loginSaga);
  yield takeEvery(authConstants.CHECK_AUTH, checkAuthSaga);
  yield takeEvery(authConstants.REGISTER, registerSaga);
  yield takeEvery(authConstants.VERIFY, verifySaga);
  yield takeEvery(authConstants.RESEND_CODE, resendCodeSaga);
  yield takeEvery(authConstants.UPDATE_PROFILE, updateProfileSaga);
  yield takeEvery(authConstants.CHANGE_PASSWORD, changePasswordSaga);
}

export default sagas;
