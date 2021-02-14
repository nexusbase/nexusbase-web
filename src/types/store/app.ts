import { IWorkspaceModel } from '../database';

export default interface IState {
  dataLoaded: boolean,
  lastWorkspace: string,
  isLoadingAppData: boolean,
}

export enum IActionTypes {
  GET_APP_DATA_START = 'GET_APP_DATA_START',
  GET_APP_DATA_FAILED = 'GET_APP_DATA_FAILED',
  GET_APP_DATA_SUCCESS = 'GET_APP_DATA_SUCCESS',
}

export interface IGetAppDataStart {
  type: IActionTypes.GET_APP_DATA_START;
}

export interface IGetAppDataFailed {
  type: IActionTypes.GET_APP_DATA_FAILED
}

export interface IGetAppDataSuccess {
  type: IActionTypes.GET_APP_DATA_SUCCESS;
  payload: {
    lastWorkspace: string;
  }
}

export type IAppAction =
  | IGetAppDataStart
  | IGetAppDataFailed
  | IGetAppDataSuccess;
