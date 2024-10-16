import {appSchema, tableSchema} from '@nozbe/watermelondb';
import {immutableRelation} from '@nozbe/watermelondb/decorators';

// Define Post and Comment schema with associations
const posts = tableSchema({
  name: 'posts',
  
  columns: [{name: 'title', type: 'string'}],
});

const comments = tableSchema({
  name: 'comments',
  columns: [
    {name: 'post_id', type: 'string', isIndexed: true}, // Foreign key for the relationship
    {name: 'body', type: 'string'},
  ],
  // Define associations
  associations: {
    posts: {type: 'belongs_to', key: 'post_id'}, // Each comment belongs to a post
  },
});

export const mySchema = appSchema({
  version: 1,
  tables: [posts, comments],
});
