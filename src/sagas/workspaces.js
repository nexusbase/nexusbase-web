import { takeLatest, call, put} from 'redux-saga/effects';
import { appDb, workspaceDb } from '../services/localDatabase'
import {
  createWorkspaceSuccess,
  getWorkspaceSuccess
} from '../actions/workspaces';
import { generateId } from '../utils';

export function* createWorkspaceSaga(action) {
  try {
    const mainDB = yield call(appDb);
    const workspace = { id: generateId('w'), ...action.payload };
    mainDB.get('workspaces').push(workspace).write();
    mainDB.set('lastWorkspace', workspace.id).write();
    const db = yield call(workspaceDb, workspace.id);
    db.set('workspace', workspace).write();
    yield put(createWorkspaceSuccess(workspace.id));

  } catch (e) {
    console.log(e)
    //yield put(getAppDataFailed());
  }
}

export function* getWorkspaceSaga(action) {
  try {
    const db = yield call(workspaceDb, action.payload);
    const workspace = db.get('workspace').value();
    yield put(getWorkspaceSuccess(workspace));

  } catch (e) {
    console.log(e)
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_WORKSPACE_START', createWorkspaceSaga);
  yield takeLatest('GET_WORKSPACE_START', getWorkspaceSaga);
}
