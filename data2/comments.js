// models/comment.js
import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class Comment extends Model {
  static table = 'comments';

  @field('body') body; // The content of the comment

  // Relationship to the Post model
  @relation('posts', 'post_id') post; // Foreign key to Post
}
