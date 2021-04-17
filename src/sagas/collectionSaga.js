import { takeLatest, call, put, select} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { workspaceDb } from '../services/localDatabase';
import CollectionModel from "../models/CollectionModel";
import { setLastVisitedStart } from '../actions/appActions';
import { createCollectionSuccess, getCollectionsStart, getCollectionsSuccess, getCollectionSuccess } from "../actions/collectionActions";

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
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const collectionModel = new CollectionModel(db);
    const collections = collectionModel.get(workspaceId);
    yield put(getCollectionsSuccess(collections));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* updateCollectionSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const collectionModel = new CollectionModel(db);
    collectionModel.updateDetails(payload.id, payload.details);
    yield put(getCollectionsStart());// reload collections data
  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* updatePropertySaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const collectionModel = new CollectionModel(db);
    collectionModel.updateProperty(
      payload.collectionId,
      payload.propertyId,
      payload.data
    );
    yield put(getCollectionsStart());// reload collections data
  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_COLLECTION_START', createCollectionSaga);
  yield takeLatest('GET_COLLECTIONS_START', getCollectionsSaga);
  yield takeLatest('UPDATE_COLLECTION_START', updateCollectionSaga);
  yield takeLatest('UPDATE_PROPERTY_START', updatePropertySaga);
}
