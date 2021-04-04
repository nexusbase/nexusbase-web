
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  collections: [],
  collection: null,
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
      };
    }

    case 'GET_COLLECTION_START': {
      return {
        ...state,
        isFetchingOne: true,
        newId: null,
      };
    }
    case 'GET_COLLECTION_SUCCESS': {
      return {
        ...state,
        collection: action.payload,
        isFetchingOne: false,
      };
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
