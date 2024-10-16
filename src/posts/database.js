import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// import { mySchema } from './schema';
// import { Post } from './models/Post';
// import { Comment } from './models/Comment';
import { mySchema } from './shcema/shcema';
import { Comment, Post } from './models/models';

// First, create the adapter for the database
const adapter = new SQLiteAdapter({
  schema: mySchema,
});

// Then, initialize the database
const database = new Database({
  adapter,
  modelClasses: [Post, Comment],
});
export default database;
