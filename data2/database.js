// database.js
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Database} from '@nozbe/watermelondb';
import {appSchema} from '@nozbe/watermelondb';
import {ownerSchema, postSchema} from './postSchemas';
import {PetsSchema1, commentSchema} from './commentSchema';
import Comment from './comments';
import Post from './posts';
import Pets from './pets';
import PetOwners from './petOwners';

// Define the schema with both tables
const myAppSchema = appSchema({
  version: 1,
  tables: [postSchema, commentSchema],
});

// Create the database adapter
const adapter = new SQLiteAdapter({
  schema: myAppSchema,
});


/********* */
const petsSchema = appSchema({
  version: 1,
  tables: [PetsSchema1, ownerSchema],
});

// Create the database adapter
const petsAdapter = new SQLiteAdapter({
  schema: petsSchema,
});

// Initialize the database
// export const database12 = new Database({
//   adapter,
//   modelClasses: [Post, Comment],
//   actionsEnabled: true,
// });

export const database13 = new Database({
  adapter:petsAdapter,
  modelClasses: [Pets,PetOwners ],
  actionsEnabled: true,
});
