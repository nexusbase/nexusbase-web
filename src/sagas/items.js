import { takeLatest, call, put, select} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { workspaceDb } from '../services/localDatabase';
import ItemModel from "../models/ItemModel";
import { createItemSuccess, getItemsSuccess, getItemSuccess } from "../actions/items";

function* createItemsSaga({ payload }) {
  try {
    const db = yield call(workspaceDb, payload.workspaceId);
    const itemsModel = new ItemModel(db);
    const items= itemsModel.create(payload);
    yield put(createItemSuccess(items.id));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getItemsSaga() {
  try {
    const { workspaceId, collectionId } = yield select(state => (
      {
        workspaceId: state.workspaces.workspace.id,
        collectionId: state.collections.collection.id,
      }
    ));
    
    const db = yield call(workspaceDb, workspaceId);
    const itemModel = new ItemModel(db);
    const itemsData = itemModel.get({ collectionId });
    console.log({saga: itemsData})
    yield put(getItemsSuccess(itemsData));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getItemSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspaces.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const itemModel = new ItemModel(db);
    const item = itemModel.find(payload);
    yield put(getItemSuccess(item));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_ITEMS_START', createItemsSaga);
  yield takeLatest('GET_ITEMS_START', getItemsSaga);
  yield takeLatest('GET_ITEM_START', getItemSaga);
}
