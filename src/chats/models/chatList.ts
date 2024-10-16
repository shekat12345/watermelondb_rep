import {Model} from '@nozbe/watermelondb';
import {field, children} from '@nozbe/watermelondb/decorators';

export default class ChatList extends Model {
  static table = 'chatList';
  static associations = {
    messages: {type: 'has_many', foreignKey: 'chatID'},
  };

  @field('name') name;
  @field('position') position;  
  @children('messages') messages;
}