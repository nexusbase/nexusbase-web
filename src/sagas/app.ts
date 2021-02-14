import { takeLatest, call, put} from 'redux-saga/effects';
import { appDb } from '../services/localDatabase'
import { getWorkspacesSuccess } from '../actions/workspaces';
import { getAppDataFailed, getAppDataSuccess } from '../actions/app';
import { IActionTypes } from '../types/store/app';

export function* fetchAppData() {
  try {
    const db = yield call(appDb);
    console.log({db})
    const appData = db.getState();
    yield put(getWorkspacesSuccess(appData.workspaces));
    yield put(getAppDataSuccess(appData.lastWorkspace));
    //const payload
  } catch (e) {
    console.log(e)
    yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest(IActionTypes.GET_APP_DATA_START, fetchAppData);
}
