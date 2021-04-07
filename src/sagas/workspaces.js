import { takeLatest, call, put} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { appDb, workspaceDb } from '../services/localDatabase';
import { generateId } from '../utils';
import {
  createWorkspaceSuccess,
  getWorkspaceSuccess
} from '../actions/workspaces';
import { setLastVisitedStart } from '../actions/app';

function* createWorkspaceSaga({ payload }) {
  try {
    const mainDB = yield call(appDb);
    const workspace = { id: generateId('w'), ...payload };
    mainDB.get('workspaces').push(workspace).write();
    const db = yield call(workspaceDb, workspace.id);
    db.set('workspace', workspace).write();
    yield put(createWorkspaceSuccess(workspace.id));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getWorkspaceSaga({ payload }) {
  try {
    const db = yield call(workspaceDb, payload);
    const workspace = db.get('workspace').value();
    yield put(getWorkspaceSuccess(workspace));
    yield put(setLastVisitedStart({ workspace: workspace.id }));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_WORKSPACE_START', createWorkspaceSaga);
  yield takeLatest('GET_WORKSPACE_START', getWorkspaceSaga);
}
