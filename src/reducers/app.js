
export const initialState = {
  dataLoaded: false,
  isLoadingAppData: false,
  lastWorkspace: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_APP_DATA_START': {
      return {
        ...state,
        isLoadingAppData: true,
      };
    }

    case 'GET_APP_DATA_FAILED': {
      return {
        ...state,
        dataLoaded: false,
        isLoadingAppData: false,
      }
    }

    case 'GET_APP_DATA_SUCCESS': {
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
