import { all } from 'redux-saga/effects'
import app from './app';
import workspaces from './workspaces';

function* saga() {
  yield all([
    app(),
    workspaces(),
  ])
}

export default saga;
