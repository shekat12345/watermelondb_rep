import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
  static table = 'messages';
  static associations = {
    chatList: {type: 'belongs_to', key: 'chatId'},
  };

  @field('title') name;
  @field('chattid') chattid;
  @field('hasMedia') hasMedia;
  @field('sender') sender;  
  @relation('chatList', 'chatId') chatList;
}