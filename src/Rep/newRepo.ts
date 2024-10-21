import {Database, Model} from '@nozbe/watermelondb';
import Product from '../categories/product';
import ProductCategory from '../categories/categories';
import {database} from '../categories/database';

type ModelConstructor<TModel> = new (...args: any[]) => TModel;

class RepositoryFactory {
  collection: {key: string; instance: any}[] = [];
  dataBase: Database;
  
  constructor(public db: Database) {
    this.dataBase = db;
  }

  GetGeneric<T>(modelCtor: ModelConstructor<T>): GenericRepository<T> {
    return new GenericRepository(this.dataBase, modelCtor);
  }
}

export class GenericRepository<T extends Model> {
  constructor(public db: Database, public modelCtor: ModelConstructor<T>) {}

  async create(data: Partial<T>[]) {
    await this.db.write(async () => {
      const collection = this.db.collections.get(this.modelCtor.table); // Correctly referencing the model's table
      await Promise.all(
        data.map(async (v) => {
          await collection.create((m: T) => {
            Object.keys(v).forEach((key) => {
              // Dynamically assign properties
              (m as any)[key] = v[key];
            });
          });
        }),
      );
    });
  }

  async read(data: {}): Promise<T[]> {
    // Implement read functionality
    return [];
  }

  async update(data: Partial<T>[]) {
    // Implement update functionality
  }

  async delete(data: any) {
    // Implement delete functionality
  }
}

// Use the repository factory to get repositories for different models
const ProductsCollection = new RepositoryFactory(database).GetGeneric(Product);
export const CategoryCollection = new RepositoryFactory(database).GetGeneric(ProductCategory);

// UOW (Unit of Work) structure for easy access
export const repository = {
  product: ProductsCollection,
  category: CategoryCollection,
};

// Usage example
CategoryCollection.create([
  {name: 'hello1', tableName: 'categories', position: '120'},
  {name: 'hello2', tableName: 'categories', position: '120'},
  {name: 'hello3', tableName: 'categories', position: '120'},
  {name: 'hello4', tableName: 'categories', position: '120'},
]);
