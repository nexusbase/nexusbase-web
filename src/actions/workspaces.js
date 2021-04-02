
export const createWorkspaceStart = (name) => ({
  type: 'CREATE_WORKSPACE_START',
  payload: { name }
});

export const createWorkspaceSuccess = (payload) => ({
  type: 'CREATE_WORKSPACE_SUCCESS',
  payload
});

export const getWorkspacesSuccess = (payload) => ({
  type: 'GET_WORKSPACES_SUCCESS',
  payload
});

export const getWorkspaceStart = (payload) => ({
  type: 'GET_WORKSPACE_START',
  payload
});

export const getWorkspaceSuccess = (payload) => ({
  type: 'GET_WORKSPACE_SUCCESS',
  payload
});
