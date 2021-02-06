import { initialState, actionTypes } from '../constants/redux/workspaces';
  
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_WORKSPACE_START: {
      return {
        ...state,
        isCreating: true,
      };
    }
    case actionTypes.CREATE_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
      };
    }

    case actionTypes.GET_WORKSPACES_START: {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case actionTypes.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingList: false,
      };
    }

    case actionTypes.GET_WORKSPACE_START: {
      return {
        ...state,
        isFetchingOne: true,
      };
    }
    case actionTypes.GET_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false,
      };
    }

    case actionTypes.CLEAR_WORKSPACES: {
      return {
        ...state,
        workspaces: [],
      };
    }

    case actionTypes.CLEAR_WORKSPACE: {
      return {
        ...state,
        workspace: null,
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
};
