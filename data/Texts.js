import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';
export default class Note extends Model {
  static table = 'notes';
  @field('id') note;
  @field('erfa') desc;
  @readonly @date('created_at') createdAt;
}
