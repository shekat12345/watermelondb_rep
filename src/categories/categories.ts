import {Model} from '@nozbe/watermelondb';
import {field, children} from '@nozbe/watermelondb/decorators';

export default class ProductCategory extends Model {
  static table = 'categories';
  static associations = {
    products: {type: 'has_many', foreignKey: 'category_id'},
  };

  @field('name') name;
  @field('position') position;
  @field('alias') alias;
  @children('products') products;
}
