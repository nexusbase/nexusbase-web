import IAppState from './app';
import IWorkspacesState from './workspaces';

export default interface IRootStore {
  app: IAppState;
  workspaces: IWorkspacesState;
}
