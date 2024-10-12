// schemas/commentSchema.js
import { tableSchema } from '@nozbe/watermelondb/Schema';

export const commentSchema = tableSchema({
  name: 'comments',
  columns: [
    { name: 'body', type: 'string' }, // Comment text
    { name: 'post_id', type: 'string', isIndexed: true }, // Foreign key to Post
  ],
});
