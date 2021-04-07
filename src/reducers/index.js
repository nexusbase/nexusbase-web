import { combineReducers } from 'redux';
import app from './app';
import workspaces from './workspaces';
import collections from './collections';
import views from './views';
import items from './items';

export default combineReducers({
  app,
  workspaces,
  collections,
  views,
  items,
});
