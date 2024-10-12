// schemas/postSchema.js
import { tableSchema } from '@nozbe/watermelondb/Schema';

export const postSchema = tableSchema({
  name: 'posts',
  columns: [
    { name: 'title', type: 'string' },
  ],
});
