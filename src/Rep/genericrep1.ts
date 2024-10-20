import {Database, Model} from '@nozbe/watermelondb';
import Product from '../categories/product';
import database from '../posts/database';
import {Constructor} from 'react-native/types/private/Utilities';
import ProductCategory from '../categories/categories';

type ModelConstructor<TModel> = (...args: any[]) => Product;

class RepositoryFactory {
  collection: {key: string; instance: any}[] = [];

  constructor(public db: Database) {}
  GetGeneric<T>(modelCtor: ModelConstructor<T>): GenericRepository<T> {
    this.collection.find;
    return new GenericRepository(db, modelCtor);
  }

  getRepo(model: Product): ProductRepositoryCustomed;
  getRepo(model: ProductCategory): CategoryRepositroy;
  getRepo(model: any) {}

  getRepo<T extends BaseRepository>(repo: T): T {}
}

class BaseRepository {}

class CategoryRepositroy {}
class ProductRepositoryCustomed {
  constructor(db: Database, rp: RepositoryFactory) {}

  GetProductWithCategory() {
    // todo
  }
}

export class GenericRepository<T extends Model & {table: string}> {
  constructor(public db: Database, modelCtor: Constructor<T>) {}
  async create(data: T[]) {
    await database.write(async p => {
      const collection = await database.collections.get(`table`);

      Promise.all(
        data.map(async (v, i) => {
          collection.create(m => {
            Object.keys(v).forEach(k => {
              m[k] = v[k];
            });
          });
        }),
      );
    });
  }
  // Read method
  async read(data?: Partial<T>[]): Promise<T[]> {
    const collection = await this.db.collections.get(data?.[0]?.table);
  
    if (data && data.length > 0) {
      // Assuming the fields to query are dynamic
      const queries = data.map(item => {
        let queryConditions = [];
  
        // Add conditions for each field you want to query on (e.g., name, id)
        if (item.id) {
          queryConditions.push(Q.where('id', item.id));
        }
        if (item.name) {
          queryConditions.push(Q.where('name', item.name));
        }
        // Add more conditions as needed based on the fields in `data[]`
        return queryConditions;
      });
  
      return await collection.query(...queries.flat()).fetch();
    }
  
    // If no data is passed, fetch all records
    return await collection.query().fetch();
  }
  async Update(data: T[]) {}
  async delete(data: any) {}
}

const rf = new RepositoryFactory(database);

// UOW | RepUOW
const repository = {
  product: rf.GetGeneric(Product),
  category: rf.GetGeneric(ProductCategory),
};

// // Services | UOW
// class ProductService{
//     constructor(){}

//     test(){
//         repository.category
//     }
// }

// // UOW
// const productService = new ProductService()
//------------------------------------------2
// Services
class ProductService {
  constructor(
    public productRepository: GenericRepository<Product>,
    public category: GenericRepository<ProductCategory>,
  ) {}

  test() {}
}

// UOW
const productService = new ProductService(
  repository.product,
  repository.category,
);
//------------------------------------------3

// Services
class ProductService {
  productRepository = this.rp.GetGeneric(Product);

  constructor(public rp: RepositoryFactory, p: ProductRepositoryCustomed) {
    let product = rp.GetGeneric(Product);
    let cat = rp.GetGeneric(ProductCategory);
  }

  test() {}
}

// UOW
const productService = new ProductService(repository.product);

Product.table;




export async function read(table,hasManytomany={has:false,table:""}) {
    try {
      // Get the categories collection
      const collection = database.collections.get(`${table}`);
  
      // Query the categories and fetch all categories
      const allCategories = await categoriesCollection.query().fetch();
  
      // For each category, fetch its related products
      const categoriesWithProducts = await Promise.all(
        allCategories.map(async (category) => {
          const relatedProducts = await category[products].fetch(); // Fetch related products
        //   console.log('Fetched categories with products:', relatedProducts);
          return {
            ...category._raw,    // Include category data
            products: relatedProducts.map(product => product._raw), // Include related products
          };
        })
      );
  
      
      return categoriesWithProducts; // Return the categories with their products
    } catch (error) {
      console.error('Error fetching categories with products:', error);
    }
  }