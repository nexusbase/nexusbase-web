
export const getAppDataStart = () => ({ type: 'GET_APP_DATA_START' });
export const getAppDataFailed = () => ({ type: 'GET_APP_DATA_FAILED' });
export const getAppDataSuccess = (lastWorkspace) => ({
  type: 'GET_APP_DATA_SUCCESS',
  payload: { lastWorkspace }
});
