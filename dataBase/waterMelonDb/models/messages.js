import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
  static table = 'messages';

  @field('message') message;
  @field('created_at') createdAt;

  // A relationship to the chat_lists table
  @relation('chat_lists', 'chat_list_id') chatList;
  
}
