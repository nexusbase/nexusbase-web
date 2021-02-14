import { IWorkspaceModel } from '../types/database';
import { IActionTypes, IGetWorkspacesSuccess } from '../types/store/workspaces';

export const getWorkspacesSuccess = (payload: IWorkspaceModel[]): IGetWorkspacesSuccess => ({
  type: IActionTypes.GET_WORKSPACES_SUCCESS,
  payload
});
