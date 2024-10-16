// schemas/postSchema.js
import { tableSchema } from '@nozbe/watermelondb/Schema';

export const postSchema = tableSchema({
  name: 'posts',
  columns: [
    { name: 'title', type: 'string' },
  ],
});

export const ownerSchema = tableSchema({
  name: 'petowners',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'string' },
  ],
});