
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  items: null,// []
  related: null,// []
  item: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ITEM_START': {
      return {
        ...state,
        isCreating: true,
      };
    }
    case 'CREATE_ITEM_SUCCESS': {
      return {
        ...state,
        isCreating: false,
        newId: action.payload,
      };
    }

    case 'GET_ITEMS_START': {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case 'GET_ITEMS_SUCCESS': {
      return {
        ...state,
        items: action.payload.items,
        related: action.payload.related,
        isFetchingList: false,
      };
    }

    case 'GET_ITEM_START': {
      return {
        ...state,
        isFetchingOne: true,
        newId: null,
      };
    }
    case 'GET_ITEM_SUCCESS': {
      return {
        ...state,
        item: action.payload,
        isFetchingOne: false,
      };
    }

    case 'CLEAR_ITEMS': {
      return {
        ...state,
        items: [],
      };
    }

    case 'CLEAR_ITEM': {
      return {
        ...state,
        item: null,
      };
    }

    default: {
      return state;
    }
  }
};
