import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';
  static associations = {
    categories: {type: 'belongs_to', key: 'category_id'},
  };

  @field('name') name;
  @field('code') code;
  @field('price') price;
  @field('description') description;
  @field('photo') photo;
  @field('unit') unit;
  @relation('categories', 'category_id') category;
}