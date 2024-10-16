import { Model } from '@nozbe/watermelondb';
import { field, children, relation, immutableRelation } from '@nozbe/watermelondb/decorators';


export class Post extends Model {
  static table = 'posts';

  @field('title') title;
  static associations = {
    comments: { type: 'has_many', foreignKey: 'post_id' },
  }
  // A post has many comments, `@children` automatically links the comments to the post
  @children('comments') comments;
}


export class Comment extends Model {
  static table = 'comments'

  @field('body') body;

  // A comment belongs to a post
  static associations = {
    posts: { type: 'belongs_to', key: 'post_id' },
  }
  @relation('posts', 'post_id') post;
  // @immutableRelation('posts', 'post_id') post;
  // @immutableRelation('posts', 'post_id') post
}
