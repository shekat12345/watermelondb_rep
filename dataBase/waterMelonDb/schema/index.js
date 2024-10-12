import { appSchema, tableSchema } from '@nozbe/watermelondb';

// Define the ChatList schema
const chatListSchema = tableSchema({
  name: 'chat_lists',
  columns: [
    { name: 'conversation_id', type: 'number' },
    { name: 'title', type: 'string' },
    { name: 'last_message', type: 'string' },
    { name: 'last_change', type: 'string' },
    { name: 'profile_image_path', type: 'string' },
  ],
});

// Define the Message schema
const messageSchema = tableSchema({
  name: 'messages',  
  columns: [
    { name: 'message', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'chat_list_id', type: 'string', isIndexed: true }, // Foreign key to ChatList
  ],
});

// Combine the schemas into one app schema
export const myAppSchema = appSchema({
  version: 1, // Increment this when you make changes to the schema
  tables: [
    chatListSchema,
    messageSchema,
  ],
});
