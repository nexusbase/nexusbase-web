
export const initialState = {
  dataLoaded: false,
  isLoadingAppData: false,
  lastWorkspace: null,
  lastCollection: null,
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
      const { lastWorkspace, lastCollection } = action.payload;
      return {
        ...state,
        dataLoaded: true,
        isLoadingAppData: false,
        lastWorkspace,
        lastCollection,
      }
    }

    case 'SET_LAST_VISITED_START': {
      return state;
    }
    
    case 'SET_LAST_VISITED_SUCCESS': {
      return {
        ...state,
        lastWorkspace: action.payload.workspace || state.lastWorkspace,
        lastCollection: action.payload.collection || state.lastCollection,
      }
    }

    default: {
      return state;
    }
  }
}
