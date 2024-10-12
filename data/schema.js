import {appSchema, tableSchema} from '@nozbe/watermelondb';
import { database } from '../dataBase/database';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        {name: 'note', type: 'string'},
        {name: 'desc', type: 'string', isOptional: true},
        {name: 'created_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'conversationId', type: 'string'},
        {name: 'senderId', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});

export const getter = ()=>{
  return database.get('notes').query().observe()
}