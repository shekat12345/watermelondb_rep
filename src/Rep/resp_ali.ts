import { Database, Model } from "@nozbe/watermelondb";
import Product from "../categories/product";
import ProductCategory from "../categories/categories";
import { database } from "../categories/database";

type DbModel = typeof Model;
type ModelConstructor<TModel> = new (...args: any[]) => TModel;

class RepositoryFactory {
  collection: {key: string; instance: any}[] = [];
  dataBase: Database;
  
  constructor(public db: Database) {
    this.dataBase = db;
  }

  GetGeneric(modelCtor: ModelConstructor<any>): GenericRepository<any> {
    return new GenericRepository(this.dataBase, modelCtor as any);
  }
}
export class GenericRepository<T extends Model> {
  constructor(public db: Database, public modelCtor: DbModel) {}

  async create(data: Partial<T>[]) {
    await this.db.write(async () => {
      await this.subCreate(data, this.modelCtor.table);
    });
  }

  private async subCreate(data: Partial<T>[], table: string) {
    const collection = this.db.get(table); // Correctly referencing the model's table

    return await Promise.all(
      data.map(async (v) => {
        let nesteds: { key: string; instance: any }[] = [],
          instanceKeys: string[] = [];

        Object.keys(v).forEach((k) => {
          if (typeof v[k] === "function" /*|| Array.isArray(v[k])*/) return;
          else if (typeof v[k] === "object" || Array.isArray(v[k]))
            nesteds.push({ key: k, instance: null });
          else instanceKeys.push(k);
        });

        await nesteds.forEach(async (n) => {
          try {
            let tableName = (v as any)[n.key].tableName;
            console.log(v)
            if (!tableName) return;

            let res = await this.subCreate(v[n.key]!, tableName);
            n.instance = res;
          } catch (error) {
            alert(error);
          }
        });

        await collection.create((m) => {
          instanceKeys.forEach((key) => {
            m[key] = v[key];
          });

          nesteds
            .filter((n) => n.instance !== null)
            .forEach((n) => {
              m[n.key].set(n.instance);
            });
        });
      })
    );
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
export const CategoryCollection = new RepositoryFactory(database).GetGeneric(
  ProductCategory
);

// UOW (Unit of Work) structure for easy access
export const repository = {
  product: ProductsCollection,
  category: CategoryCollection,
};

// Usage example
CategoryCollection.create([
  { name: "hello1", tableName: "categories", position: "120" },
  { name: "hello2", tableName: "categories", position: "120" },
  { name: "hello3", tableName: "categories", position: "120" },
  { name: "hello4", tableName: "categories", position: "120" },
]);
