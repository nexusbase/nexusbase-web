import { combineReducers } from 'redux';
import app from './app';
import workspaces from './workspaces';
import collections from './collections';

export default combineReducers({
  app,
  workspaces,
  collections,
});
