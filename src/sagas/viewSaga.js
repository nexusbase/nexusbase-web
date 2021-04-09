import { takeLatest, call, put, select} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { workspaceDb } from '../services/localDatabase';
import { setLastVisitedStart } from '../actions/appActions';
import ViewModel from "../models/ViewModel";
import { createViewSuccess, getViewsSuccess, getViewSuccess } from "../actions/viewActions";

function* createViewSaga({ payload }) {
  try {
    const db = yield call(workspaceDb, payload.workspaceId);
    const viewModel = new ViewModel(db);
    const view = viewModel.create(payload);
    yield put(createViewSuccess(view.id));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getViewsSaga() {
  try {
    const { workspaceId, collectionId } = yield select(state => (
      {
        workspaceId: state.workspace.workspace.id,
        collectionId: state.collection.collection.id,
      }
    ));
    const db = yield call(workspaceDb, workspaceId);
    const viewModel = new ViewModel(db);
    const views = viewModel.get(collectionId);
    yield put(getViewsSuccess(views));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getViewSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const viewModel = new ViewModel(db);
    const view = viewModel.find(payload);
    yield put(getViewSuccess(view));
    // ?todo: set last chosen view

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_VIEW_START', createViewSaga);
  yield takeLatest('GET_VIEWS_START', getViewsSaga);
  yield takeLatest('GET_VIEW_START', getViewSaga);
}
