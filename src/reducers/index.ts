import { combineReducers } from 'redux';
import app from '../reducers/app';
import workspaces from '../reducers/workspaces';

export default combineReducers({
  app,
  workspaces,
});
