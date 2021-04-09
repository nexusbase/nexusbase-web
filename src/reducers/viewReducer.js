
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  views: null,// []
  view: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_VIEW_START': {
      return {
        ...state,
        isCreating: true,
      };
    }
    case 'CREATE_VIEW_SUCCESS': {
      return {
        ...state,
        isCreating: false,
        newId: action.payload,
      };
    }

    case 'GET_VIEWS_START': {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case 'GET_VIEWS_SUCCESS': {
      return {
        ...state,
        views: action.payload,
        isFetchingList: false,
      };
    }

    case 'GET_VIEW_START': {
      return {
        ...state,
        isFetchingOne: true,
        newId: null,
      };
    }
    case 'GET_VIEW_SUCCESS': {
      return {
        ...state,
        view: action.payload,
        isFetchingOne: false,
      };
    }

    case 'CLEAR_VIEWS': {
      return {
        ...state,
        views: [],
      };
    }

    case 'CLEAR_VIEW': {
      return {
        ...state,
        view: null,
      };
    }

    default: {
      return state;
    }
  }
};
