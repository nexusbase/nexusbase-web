
export const getAppDataStart = () => ({ type: 'GET_APP_DATA_START' });
export const getAppDataFailed = () => ({ type: 'GET_APP_DATA_FAILED' });

export const getAppDataSuccess = (payload) => ({
  type: 'GET_APP_DATA_SUCCESS',
  payload
});

export const setLastVisitedStart = (payload) => ({
  type: 'SET_LAST_VISITED_START',
  payload
});

export const setLastVisitedSuccess = (payload) => ({
  type: 'SET_LAST_VISITED_SUCCESS',
  payload
});
