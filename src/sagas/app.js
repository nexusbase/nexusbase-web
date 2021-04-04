import { takeLatest, call, put} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { appDb } from '../services/localDatabase'
import { getWorkspacesSuccess } from '../actions/workspaces';
import { getAppDataFailed, getAppDataSuccess } from '../actions/app';

export function* fetchAppData() {
  try {
    const db = yield call(appDb);
    const appData = db.getState();
    yield put(getWorkspacesSuccess(appData.workspaces));
    yield put(getAppDataSuccess(appData.lastWorkspace));
    //const payload
  } catch (e) {
    throwIfDev(e);
    yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('GET_APP_DATA_START', fetchAppData);
}
