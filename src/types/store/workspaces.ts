import { IWorkspaceModel } from '../database';

export default interface IState {
  isFetchingOne: boolean,
  isFetchingList: boolean,
  isCreating: boolean,
  isNew: boolean,
  workspaces: IWorkspaceModel[],
  workspace: null | IWorkspaceModel,
}

export enum IActionTypes {
  CREATE_WORKSPACE_START = 'CREATE_WORKSPACE_START',
  CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS',
  GET_WORKSPACES_START = 'GET_WORKSPACES_START',
  GET_WORKSPACES_SUCCESS = 'GET_WORKSPACES_SUCCESS',
  GET_WORKSPACE_START = 'GET_WORKSPACE_START',
  GET_WORKSPACE_SUCCESS = 'GET_WORKSPACE_SUCCESS',
  CLEAR_WORKSPACES = 'CLEAR_WORKSPACES',
  CLEAR_WORKSPACE = 'CLEAR_WORKSPACE',
}

export interface ICreateWorkspaceStart {
  type: IActionTypes.CREATE_WORKSPACE_START;
  payload: {
    name: string
  };
}

export interface ICreateWorkspaceSuccess {
  type: IActionTypes.CREATE_WORKSPACE_SUCCESS;
  payload: IWorkspaceModel;
}

export interface IGetWorkspacesStart {
  type: IActionTypes.GET_WORKSPACES_START;
}

export interface IGetWorkspacesSuccess {
  type: IActionTypes.GET_WORKSPACES_SUCCESS;
  payload:  IWorkspaceModel[];
}

export interface IGetWorkspaceStart {
  type: IActionTypes.GET_WORKSPACE_START;
  payload: string;
}

export interface IGetWorkspaceSuccess {
  type: IActionTypes.GET_WORKSPACE_SUCCESS;
  payload: IWorkspaceModel;
}

export interface IClearWorkspaces {
  type: IActionTypes.CLEAR_WORKSPACES;
}

export interface IClearWorkspace {
  type: IActionTypes.CLEAR_WORKSPACE;
}

export type IWorkspacesAction =
  | ICreateWorkspaceStart
  | ICreateWorkspaceSuccess
  | IGetWorkspacesStart
  | IGetWorkspacesSuccess
  | IGetWorkspaceStart
  | IGetWorkspaceSuccess
  | IClearWorkspaces
  | IClearWorkspace;
