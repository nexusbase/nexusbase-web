import IState, { IActionTypes, IAppAction } from '../types/store/app';

export const initialState: IState = {
  dataLoaded: false,
  isLoadingAppData: false,
  lastWorkspace: "",
};

export default (state = initialState, action: IAppAction): IState => {
  switch (action.type) {
    case IActionTypes.GET_APP_DATA_START: {
      return {
        ...state,
        isLoadingAppData: true,
      };
    }

    case IActionTypes.GET_APP_DATA_FAILED: {
      return {
        ...state,
        dataLoaded: false,
        isLoadingAppData: false,
      }
    }

    case IActionTypes.GET_APP_DATA_SUCCESS: {
      const { lastWorkspace } = action.payload;
      return {
        ...state,
        dataLoaded: true,
        isLoadingAppData: false,
        lastWorkspace,
      }
    }

    default: {
      return state;
    }
  }
}
