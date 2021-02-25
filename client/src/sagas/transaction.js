import { call, put, takeLatest } from 'redux-saga/effects';
import { replace, push } from 'connected-react-router';
import * as transactionApis from 'apis/transaction';
import * as transactionActions from 'actions/transaction';
import * as transactionConstants from 'constants/transaction';
import { setLoading, setSweetAlert } from 'actions/ui';

function* createTransaction({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(transactionApis.createTransaction, payload);
    const { status, data } = res;
    const { transaction } = data;
    if (status === 200) {
      yield put(transactionActions.createTransactionSuccess(transaction));
      // yield put(
      //   push(
      //     `/admin/hotel/${transaction.hotel._id}/transaction/${transaction._id}/info`,
      //   ),
      // );
    }
    yield put(setLoading(false));
    yield put(setSweetAlert(true, 'Đặt phòng thành công'));
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      transactionActions.createTransactionFail(err.response.data.message),
    );
  }
}

function* getTransactionUser() {
  try {
    // yield put(setLoading(true));
    const res = yield call(transactionApis.getTransactionUser);
    const { status, data } = res;
    const { transactions } = data;
    if (status === 200) {
      yield put(transactionActions.getTransactionUserSuccess(transactions));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      transactionActions.createTransactionFail(err.response.data.message),
    );
  }
}

function* getTransactionHotel({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(transactionApis.getTransactionHotel, payload);
    const { status, data } = res;
    const { transactions } = data;
    if (status === 200) {
      yield put(transactionActions.getTransactionHotelSuccess(transactions));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(
      transactionActions.getTransactionHotelFail(err.response.data.message),
    );
  }
}

function* checkIn({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(transactionApis.checkIn, payload);
    const { status, data } = res;
    const { transaction } = data;
    if (status === 200) {
      yield put(transactionActions.checkInSuccess(transaction));
      yield put(setSweetAlert(true, 'Nhận phòng thành công'));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(transactionActions.checkInFail(err.response.data.message));
  }
}

function* checkOut({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(transactionApis.checkOut, payload);
    const { status, data } = res;
    const { transaction } = data;
    if (status === 200) {
      yield put(transactionActions.checkOutSuccess(transaction));
      yield put(setSweetAlert(true, 'Trả phòng thành công'));
    }
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(transactionActions.checkOutFail(err.response.data.message));
  }
}

function* saga() {
  yield takeLatest(transactionConstants.CREATE_TRANSACTION, createTransaction);
  yield takeLatest(
    transactionConstants.GET_TRANSACTION_USER,
    getTransactionUser,
  );
  yield takeLatest(
    transactionConstants.GET_TRANSACTION_HOTEL,
    getTransactionHotel,
  );
  yield takeLatest(transactionConstants.CHECK_IN, checkIn);
  yield takeLatest(transactionConstants.CHECK_OUT, checkOut);
}

export default saga;
