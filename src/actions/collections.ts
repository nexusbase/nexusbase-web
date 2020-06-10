import { Dispatch } from 'redux';
import {
  ICollectionActionTypes as types,
  CreateCollectionStart,
  CreateCollectionSuccess,
  GetCollectionsStart,
  GetCollectionsSuccess,
  GetCollectionStart,
  GetCollectionSuccess,
  ClearCollections,
  ClearCollection,
} from '../types/store/collections';
import IRootStore from '../types/store/root';

const { ipcRenderer } = window.require("electron");

export const createCollection = (collection: {
  name: string,
  workspaceId: string
}) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const createCollectionStart: CreateCollectionStart = {
      type: types.CREATE_COLLECTION_START
    };

    dispatch(createCollectionStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      collection: {
        action: 'createCollection',
        args: collection
      }
    });
    
    if (response?.errors?.collection) {
      console.log({ collectionError: response.errors.collection });
      return;
    }

    const createCollectionSuccess: CreateCollectionSuccess = {
      type: types.CREATE_COLLECTION_SUCCESS,
      payload: {
        collection: response.data.collection
      }
    };
    
    dispatch(createCollectionSuccess);
  }
}

export const getCollections = (workspaceId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getCollectionsStart: GetCollectionsStart = {
      type: types.GET_COLLECTIONS_START
    };
    
    dispatch(getCollectionsStart);

    const response = ipcRenderer.sendSync('nbql', {
      collections: {
        action: 'getCollections',
        args: {
          workspaceId
        }
      }
    });
    const getCollectionsSuccess: GetCollectionsSuccess = {
      type: types.GET_COLLECTIONS_SUCCESS,
      payload: {
        collections: response.data.collections,
      }
    };
    
    dispatch(getCollectionsSuccess);
  }
}

export const getCollection = (collectionId: string) => {
  return (dispatch: Dispatch, getState: () => IRootStore) => {
    const getCollectionStart: GetCollectionStart = {
      type: types.GET_COLLECTION_START
    };
    
    dispatch(getCollectionStart);
    
    const response = ipcRenderer.sendSync('nbql', {
      collection: {
        action: 'getCollection',
        args: { id: collectionId }
      }
    });
    
    if (response?.errors?.collection) {
      console.log({ collectionError: response.errors.collection });
      return;
    }

    const { item: collection, related: relatedCollections } = response.data.collection;

    const getCollectionSuccess: GetCollectionSuccess = {
      type: types.GET_COLLECTION_SUCCESS,
      payload: { collection, relatedCollections }
    };
    
    dispatch(getCollectionSuccess);
  }
}

export const clearCollections = () => {
  return (dispatch: Dispatch) => {
    const actionClearCollections: ClearCollections = {
      type: types.CLEAR_COLLECTIONS,
    };
    
    dispatch(actionClearCollections);
  }
}

export const clearCollection = () => {
  return (dispatch: Dispatch) => {
    const actionClearCollection: ClearCollection = {
      type: types.CLEAR_COLLECTION,
    };
    
    dispatch(actionClearCollection);
  }
}
