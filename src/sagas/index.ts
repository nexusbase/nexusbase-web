import { all } from 'redux-saga/effects'
import app from './app';

function* saga() {
  yield all([
    app(),
  ])
}

export default saga;
