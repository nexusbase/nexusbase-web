
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  collections: null,// []
  collection: null,
  rehydrateCollections: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COLLECTION_START': {
      return {
        ...state,
        isCreating: true,
      };
    }
    case 'CREATE_COLLECTION_SUCCESS': {
      return {
        ...state,
        isCreating: false,
        newId: action.payload,
      };
    }

    case 'GET_COLLECTIONS_START': {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case 'GET_COLLECTIONS_SUCCESS': {
      return {
        ...state,
        collections: action.payload,
        isFetchingList: false,
        rehydrateCollections: false,
      };
    }

    case 'UPDATE_PROPERTY_SUCCESS': {
      return {
        ...state,
        rehydrateCollections: true,
      }
    }

    case 'CLEAR_COLLECTIONS': {
      return {
        ...state,
        collections: [],
      };
    }

    case 'CLEAR_COLLECTION': {
      return {
        ...state,
        collection: null,
      };
    }

    default: {
      return state;
    }
  }
};
