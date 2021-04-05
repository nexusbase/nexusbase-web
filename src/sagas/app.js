import { takeLatest, call, put} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { appDb } from '../services/localDatabase'
import { getWorkspacesSuccess } from '../actions/workspaces';
import { getAppDataFailed, getAppDataSuccess, setLastVisitedSuccess } from '../actions/app';

export function* fetchAppData() {
  try {
    const db = yield call(appDb);
    const appData = db.getState();
    yield put(getWorkspacesSuccess(appData.workspaces));
    yield put(getAppDataSuccess(
      {
        lastWorkspace: appData.lastWorkspace,
        lastCollection: appData.lastCollection,
      }
    ));
    //const payload
  } catch (e) {
    throwIfDev(e);
    yield put(getAppDataFailed());
  }
}

export function* setLastVisitedSaga({ payload: { workspace, collection } }) {
  try {
    const mainDB = yield call(appDb);
    if (workspace) mainDB.set('lastWorkspace', workspace).write();
    if (collection) mainDB.set('lastCollection', collection).write();
    yield put(setLastVisitedSuccess(payload));
    //const payload
  } catch (e) {
    throwIfDev(e);
    yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('GET_APP_DATA_START', fetchAppData);
  yield takeLatest('SET_LAST_VISITED_START', setLastVisitedSaga);
}
