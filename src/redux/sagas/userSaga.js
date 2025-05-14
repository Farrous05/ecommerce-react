import { GET_USERS } from '@/constants/constants';
import { call, put } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { getUsersSuccess } from '@/redux/actions/userActions';
import firebase from '@/services/firebase';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus({
    success: false,
    message: e.message
  }));
}

function* userSaga({ type }) {
  switch (type) {
    case GET_USERS:
      try {
        yield initRequest();
        const result = yield call(firebase.getUsers);
        yield put(getUsersSuccess({
          users: result.users,
          lastKey: result.lastKey,
          total: result.total
        }));
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    default:
      throw new Error('Unexpected action type.');
  }
}

export default userSaga; 