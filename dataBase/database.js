import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from '../data/schema';
import { Database } from '@nozbe/watermelondb';
import { messageSchema } from './waterMelonDb/schema/message';
import ChatList from './waterMelonDb/models/chatList';
import Message from './waterMelonDb/models/messages';
import { myAppSchema } from './waterMelonDb/schema';
// import Note from '../data/Note';
// import Messages from '../data/Messages';
mySchema;
const adapter = new SQLiteAdapter({
  schema: myAppSchema,
});

export const database=new Database({
    adapter,
    modelClasses:[ChatList,Message],
    actionEnabled:true
})
