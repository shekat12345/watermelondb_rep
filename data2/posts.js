// models/post.js
import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('title') title; // Title of the post

  // One-to-many relationship with comments
  @children('comments') comments; 
  
}

