import { combineReducers } from 'redux';
import app from './appReducer';
import workspace from './workspaceReducer';
import collection from './collectionReducer';
import view from './viewReducer';
import item from './itemReducer';

export default combineReducers({
  app,
  workspace,
  collection,
  view,
  item,
});
