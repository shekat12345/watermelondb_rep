import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schemas';

import Chats from './models/chats';
import ChatList from './models/chatList';

const adapter = new SQLiteAdapter({
  dbName: 'YourDBName',
  schema,
//   migrations,
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: error => {
    console.log(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Chats,
    ChatList,
    // and so on
  ],
});