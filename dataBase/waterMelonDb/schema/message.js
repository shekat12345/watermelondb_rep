import { tableSchema } from '@nozbe/watermelondb/Schema';

export const messageSchema = tableSchema({
  name: 'messages',
  columns: [
    { name: 'message', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'chat_list_id', type: 'string', isIndexed: true }, // Foreign key to ChatList
  ],
});
