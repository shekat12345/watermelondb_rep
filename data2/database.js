// database.js
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';
import { appSchema } from '@nozbe/watermelondb';
import { postSchema } from './postSchemas';
import { commentSchema } from './commentSchema';
import Comment from './comments';
import Post from './posts';





// Define the schema with both tables
const myAppSchema = appSchema({
  version: 1,
  tables: [postSchema, commentSchema],
});

// Create the database adapter
const adapter = new SQLiteAdapter({
  schema: myAppSchema,
});

// Initialize the database
export const database12 = new Database({
  adapter,
  modelClasses: [Post, Comment],
  actionsEnabled: true,
});
