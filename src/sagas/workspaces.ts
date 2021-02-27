import { takeLatest, call, put} from 'redux-saga/effects';
import { appDb, workspaceDb } from '../services/localDatabase'
import {
  createWorkspaceSuccess,
  getWorkspaceSuccess
} from '../actions/workspaces';
import { IActionTypes, ICreateWorkspaceStart, IGetWorkspaceStart } from '../types/store/workspaces';
import { generateId } from '../utils';

export function* createWorkspaceSaga(action: ICreateWorkspaceStart) {
  try {
    const db = yield call(appDb);
    const workspace = { id: generateId('w'), ...action.payload };
    db.get('workspaces').push(workspace).write();
    db.set('lastWorkspace', workspace.id).write();
    yield put(createWorkspaceSuccess(workspace));

  } catch (e) {
    console.log(e)
    //yield put(getAppDataFailed());
  }
}

export function* getWorkspaceSaga(action: IGetWorkspaceStart) {
  try {
    const db = yield call(workspaceDb, action.payload);
    console.log({db});
    //yield put(getWorkspaceSuccess(workspace));

  } catch (e) {
    console.log(e)
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest(IActionTypes.CREATE_WORKSPACE_START, createWorkspaceSaga);
  yield takeLatest(IActionTypes.GET_WORKSPACE_START, getWorkspaceSaga);
}
