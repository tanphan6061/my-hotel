import locationSaga from './location';
import authSaga from './auth';
import hotelSaga from './hotels';
import roomSaga from './room';
import equipmentSaga from './equipment';
import userSaga from './user';
import transactionSaga from './transaction';

function* rootSaga() {
  yield* locationSaga();
  yield* authSaga();
  yield* hotelSaga();
  yield* roomSaga();
  yield* userSaga();
  yield* equipmentSaga();
  yield* transactionSaga();
}

export default rootSaga;
