import { all } from 'redux-saga/effects'
import app from './app';
import workspaces from './workspaces';
import collections from './collections';

function* saga() {
  yield all([
    app(),
    workspaces(),
    collections(),
  ])
}

export default saga;
