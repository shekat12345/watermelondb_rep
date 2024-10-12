import { tableSchema } from '@nozbe/watermelondb/Schema';

export const chatListSchema = tableSchema({
  name: 'chat_lists',
  columns: [
    { name: 'conversation_id', type: 'number' },
    { name: 'title', type: 'string' },
    { name: 'last_message', type: 'string' },
    { name: 'last_change', type: 'string' },
    { name: 'profile_image_path', type: 'string' },
  ],
});
