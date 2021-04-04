import { takeLatest, call, put, select, takeEvery} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { appDb, workspaceDb } from '../services/localDatabase';
import CollectionModel from "../models/CollectionModel";
import { createCollectionSuccess, getCollectionsSuccess, getCollectionSuccess } from "../actions/collections";

function* createCollectionSaga({ payload }) {
  try {
    const db = yield call(workspaceDb, payload.workspaceId);
    const collectionModel = new CollectionModel(db);
    const collection = collectionModel.create(payload);
    yield put(createCollectionSuccess(collection.id));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getCollectionsSaga() {
  try {
    const workspaceId = yield select(state => state.workspaces.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const collectionModel = new CollectionModel(db);
    const collections = collectionModel.get(workspaceId);
    yield put(getCollectionsSuccess(collections));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getCollectionSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspaces.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const collectionModel = new CollectionModel(db);
    const collection = collectionModel.find(payload);
    yield put(getCollectionSuccess(collection));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeEvery('CREATE_COLLECTION_START', createCollectionSaga);
  yield takeEvery('GET_COLLECTIONS_START', getCollectionsSaga);
  yield takeEvery('GET_COLLECTION_START', getCollectionSaga);
}
