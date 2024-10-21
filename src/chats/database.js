import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schemas';

import Chats from './models/chats';
import ChatList from './models/chatList';

const adapter = new SQLiteAdapter({
  dbName: 'ChatDb',
  schema,
  onSetUpError: error => {
    console.log(error);
  },
});

export const databaseChat = new Database({
  adapter,
  modelClasses: [
    Chats,
    ChatList,
    // and so on
  ],
});
