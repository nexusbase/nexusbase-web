import { IWorkspaceModel } from '../types/database';
import {
  IActionTypes,
  ICreateWorkspaceStart,
  ICreateWorkspaceSuccess,
  IGetWorkspacesSuccess,
  IGetWorkspaceStart,
  IGetWorkspaceSuccess
} from '../types/store/workspaces';

export const createWorkspacesStart = (name: string): ICreateWorkspaceStart => ({
  type: IActionTypes.CREATE_WORKSPACE_START,
  payload: { name }
});

export const createWorkspaceSuccess = (payload: IWorkspaceModel): ICreateWorkspaceSuccess => ({
  type: IActionTypes.CREATE_WORKSPACE_SUCCESS,
  payload
});

export const getWorkspacesSuccess = (payload: IWorkspaceModel[]): IGetWorkspacesSuccess => ({
  type: IActionTypes.GET_WORKSPACES_SUCCESS,
  payload
});

export const getWorkspaceStart = (payload: string): IGetWorkspaceStart => ({
  type: IActionTypes.GET_WORKSPACE_START,
  payload
});

export const getWorkspaceSuccess = (payload: IWorkspaceModel): IGetWorkspaceSuccess => ({
  type: IActionTypes.GET_WORKSPACE_SUCCESS,
  payload
});
