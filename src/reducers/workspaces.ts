import IState, { IActionTypes, IWorkspacesAction } from '../types/store/workspaces';

export const initialState = {
  isFetchingOne: false,
  isFetchingList: false,
  isCreating: false,
  workspaces: [],
  workspace: null,
};

export default (state: IState = initialState, action: IWorkspacesAction) => {
  switch (action.type) {
    case IActionTypes.CREATE_WORKSPACE_START: {
      return {
        ...state,
        isCreating: true,
      };
    }
    case IActionTypes.CREATE_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
      };
    }

    case IActionTypes.GET_WORKSPACES_START: {
      return {
        ...state,
        isFetchingList: true,
      };
    }
    case IActionTypes.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        workspaces: action.payload,
        isFetchingList: false,
      };
    }

    case IActionTypes.GET_WORKSPACE_START: {
      return {
        ...state,
        isFetchingOne: true,
      };
    }
    case IActionTypes.GET_WORKSPACE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingOne: false,
      };
    }

    case IActionTypes.CLEAR_WORKSPACES: {
      return {
        ...state,
        workspaces: [],
      };
    }

    case IActionTypes.CLEAR_WORKSPACE: {
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
