import IState, { IActionTypes, IAppAction } from '../types/store/app';

export const initialState: IState = {
  dataLoaded: false,
  lastWorkspace: "",
  isLoadingAppData: false
};

export default (state = initialState, action: IAppAction): IState => {
  switch (action.type) {
    case IActionTypes.GET_APP_DATA_START: {
      return {
        ...state,
        isLoadingAppData: true,
      };
    }

    // do nothing
    default: {
      return state;
    }
  }
}
