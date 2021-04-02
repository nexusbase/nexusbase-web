
export const createCollectionStart = (name) => ({
  type: 'CREATE_COLLECTION_START',
  payload: { name }
});

export const createCollectionSuccess = (payload) => ({
  type: 'CREATE_COLLECTION_SUCCESS',
  payload
});

export const getCollectionsSuccess = (payload) => ({
  type: 'GET_COLLECTIONS_SUCCESS',
  payload
});

export const getCollectionStart = (payload) => ({
  type: 'GET_COLLECTION_START',
  payload
});

export const getCollectionSuccess = (payload) => ({
  type: 'GET_COLLECTION_SUCCESS',
  payload
});
