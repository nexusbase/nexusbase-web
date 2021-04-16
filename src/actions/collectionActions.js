
export const createCollectionStart = (payload) => ({
  type: 'CREATE_COLLECTION_START',
  payload
});

export const createCollectionSuccess = (payload) => ({
  type: 'CREATE_COLLECTION_SUCCESS',
  payload
});

export const getCollectionsStart = (payload) => ({
  type: 'GET_COLLECTIONS_START'
});

export const getCollectionsSuccess = (payload) => ({
  type: 'GET_COLLECTIONS_SUCCESS',
  payload
});

export const updatePropertyStart = (payload) => ({
  type: 'UPDATE_PROPERTY_START',
  payload
});

export const updatePropertySuccess = () => ({
  type: 'UPDATE_PROPERTY_SUCCESS'
});
