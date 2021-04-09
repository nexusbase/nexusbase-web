import { all } from 'redux-saga/effects'
import appSaga from './appSaga';
import workspaceSaga from './workspaceSaga';
import collectionSaga from './collectionSaga';
import viewSaga from './viewSaga';
import itemSaga from './itemSaga';

function* saga() {
  yield all([
    appSaga(),
    workspaceSaga(),
    collectionSaga(),
    viewSaga(),
    itemSaga(),
  ])
}

export default saga;
