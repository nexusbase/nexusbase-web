import { takeLatest, call, put, select} from 'redux-saga/effects';
import { throwIfDev } from '../utils';
import { workspaceDb } from '../services/localDatabase';
import ItemModel from "../models/ItemModel";
import { createItemSuccess, getItemsSuccess, getFormItemSuccess, updateItemSuccess } from "../actions/itemActions";

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
        workspaceId: state.workspace.workspace.id,
        collectionId: state.collection.collection.id,
      }
    ));
    const db = yield call(workspaceDb, workspaceId);
    const itemModel = new ItemModel(db);
    const itemsData = itemModel.get({ collectionId });
    yield put(getItemsSuccess(itemsData));

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* getFormItemSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const itemModel = new ItemModel(db);
    const item = itemModel.find(payload);
    
    if (item) {
      yield put(getFormItemSuccess(item));
    } else {
      // yeild put(/* not found error */)
    }

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

function* updateItemSaga({ payload }) {
  try {
    const workspaceId = yield select(state => state.workspace.workspace.id);
    const db = yield call(workspaceDb, workspaceId);
    const itemModel = new ItemModel(db);
    const item = itemModel.update(payload.id, payload.properties);
    
    if (item) {
      yield put(updateItemSuccess(item));
    } else {
      // yeild put(/* not found error */)
    }

  } catch (e) {
    throwIfDev(e);
    //yield put(getAppDataFailed());
  }
}

export default function* () {
  yield takeLatest('CREATE_ITEMS_START', createItemsSaga);
  yield takeLatest('GET_ITEMS_START', getItemsSaga);
  yield takeLatest('GET_FORM_ITEM_START', getFormItemSaga);
  yield takeLatest('UPDATE_ITEM_START', updateItemSaga);
}
