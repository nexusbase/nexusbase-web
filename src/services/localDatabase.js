import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import Base from 'lowdb/adapters/Base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class AsyncStorageDriver extends Base {

  read() {
    return AsyncStorage.getItem(this.source)
      .then(data => {
        if (data) {
          return this.deserialize(data)
        } else {
          AsyncStorage.setItem(this.source, this.serialize(this.defaultValue))
          return this.defaultValue
        }
      })
      .catch(e => console.log({readError: e}))
    ;
  }

  write(data) {
    AsyncStorage.setItem(this.source, this.serialize(data))
  }
}

const adapter = (dbName, options) => {
  if (Platform.OS === 'web') {
    // todo: check if there is a need to clear storage first or use driver that 
    return new LocalStorage(dbName, options);
  }

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return new AsyncStorageDriver(dbName, options);
  }
};

const db = (name, defaultValue) => {
  return low(adapter(name, { defaultValue }));
};

export const appDb = () => {
  return db(
    'nexusbase',
    { workspaces: [], lastWorkspace: null }
  );
}

export const workspaceDb = (WorkspaceId) => {
  return db(
    WorkspaceId,
    { workspace: {}, collections: [], views: [], records: [] }
  );
}
