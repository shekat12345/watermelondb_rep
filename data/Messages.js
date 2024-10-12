import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';
export default class Messages extends Model {
  static table = 'messages';
  @field('conversationId') conversationId;
  @field('senderId') senderId;
  @field('path') path;
  @readonly @date('created_at') createdAt;
}
