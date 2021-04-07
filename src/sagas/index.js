import { all } from 'redux-saga/effects'
import app from './app';
import workspaces from './workspaces';
import collections from './collections';
import views from './views';
import items from './items';

function* saga() {
  yield all([
    app(),
    workspaces(),
    collections(),
    views(),
    items(),
  ])
}

export default saga;
