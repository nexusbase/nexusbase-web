
export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  newId: null,
  workspaces: [],
  workspace: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_WORKSPACE_START': {
      return {
        ...state,
        isCreating: true,
      };
    }
    case 'CREATE_WORKSPACE_SUCCESS': {
      return {
        ...state,
        isCreating: false,
        newId: action.payload,
      };
    }

    case 'GET_WORKSPACES_START': {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case 'GET_WORKSPACES_SUCCESS': {
      return {
        ...state,
        workspaces: action.payload,
        isFetchingList: false,
      };
    }

    case 'GET_WORKSPACE_START': {
      return {
        ...state,
        isFetchingOne: true,
        workspaceId: action.payload,
        newId: null,
      };
    }
    case 'GET_WORKSPACE_SUCCESS': {
      return {
        ...state,
        workspace: action.payload,
        isFetchingOne: false,
      };
    }

    case 'CLEAR_WORKSPACES': {
      return {
        ...state,
        workspaces: [],
      };
    }

    case 'CLEAR_WORKSPACE': {
      return {
        ...state,
        workspace: null,
      };
    }

    default: {
      return state;
    }
  }
};
