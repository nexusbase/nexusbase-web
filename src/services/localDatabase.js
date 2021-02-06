import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import { Platform } from 'react-native';

const adapter = () => {
  if (Platform.OS === 'web') {
    // todo: check if there is a need to clear storage first or use driver that 
    return new LocalStorage('nexusbase');
  }
};

const db = low(adapter());

db.defaults({ workspace: {}, collections: [], views: [], records: [] }).write();

export default db;
