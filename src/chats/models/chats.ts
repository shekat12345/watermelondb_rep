import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
  static table = 'messages';
  static associations = {
    chatList: {type: 'belongs_to', key: 'chatID'},
  };


  @field('name') name;
  @field('code') code;
  @field('price') price;
  @field('description') description;
  @field('photo') photo;
  @field('unit') unit;
  @relation('chatList', 'chatId') chatList;
}