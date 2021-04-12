
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  items: null,// []
  related: null,// []
  item: null,
  rehydrateItems: false,
  form: {},
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
        rehydrateItems: false,
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

    case 'GET_FORM_ITEM_START': {
      return {
        ...state,
        isFetchingOne: true,
        newId: null,
      };
    }
    case 'GET_FORM_ITEM_SUCCESS': {
      const form = {
        ...state.form,
        [action.payload.id]: action.payload,
      };

      return {
        ...state,
        form,
        isFetchingOne: false,
      };
    }

    case 'UPDATE_ITEM_SUCCESS': {
      return {
        ...state,
        rehydrateItems: true,
      }
    }
    
    case 'CLEAR_ITEMS': {
      return {
        ...state,
        items: [],
      };
    }
    
    case 'CLEAR_FORM_ITEM': {
      let form = state.form;
      delete form[action.payload];
      return {
        ...state,
        form,
      };
    }

    default: {
      return state;
    }
  }
};
