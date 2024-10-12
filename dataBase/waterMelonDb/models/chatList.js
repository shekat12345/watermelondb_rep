import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation, children } from '@nozbe/watermelondb/decorators';

export default class ChatList extends Model {
  static table = 'chat_lists';

  @field('conversation_id') conversationId;
  @field('title') title;
  @field('last_message') lastMessage;
  @field('last_change') lastChange;
  @field('profile_image_path') profileImagePath;

  // A relationship to the messages table
  @children('messages') messages;
}


// export class ChatList extends Realm.Object<ChatList> {
//     conversationId!: number;
//     title!: string;
//     lastMessage!: string;
//     lastChange!: string;
//     profileImagePath!: string;
//     messages!: Realm.List<MessageSchema> | [];
  
//     static schema = {
//       name: 'ChatList',
//       primaryKey: 'conversationId',
//       properties: {
//         conversationId: 'int',
//         title: 'string',
//         lastMessage: 'string',
//         lastChange: 'string',
//         profileImagePath: 'string',
//         messages: {type: 'list', objectType: 'Message', default: []}, // Array of Message objects
//       },
//     };
//   }