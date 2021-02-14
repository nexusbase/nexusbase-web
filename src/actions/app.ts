import { IActionTypes, IGetAppDataFailed, IGetAppDataStart, IGetAppDataSuccess } from "../types/store/app";

export const getAppDataStart = (): IGetAppDataStart => ({
  type: IActionTypes.GET_APP_DATA_START,
});

export const getAppDataFailed = (): IGetAppDataFailed => ({
  type: IActionTypes.GET_APP_DATA_FAILED,
});

export const getAppDataSuccess = (lastWorkspace: string): IGetAppDataSuccess => ({
  type: IActionTypes.GET_APP_DATA_SUCCESS,
  payload: {
    lastWorkspace
  }
});
