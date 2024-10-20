import {Database, Model} from '@nozbe/watermelondb';
import Product from '../categories/product';
import {database} from './../../src/categories/database';
import {Constructor} from 'react-native/types/private/Utilities';
import ProductCategory from '../categories/categories';
import {pipe, switchMap} from 'rxjs';

type ModelConstructor<TModel> = (...args: any[]) => Product;

export class RepositoryFactory {
  collection: {key: string; instance: any}[] = [];
  dataa;
  constructor(public db: Database) {
    this.dataa = db;
  }
  GetGeneric<T>(modelCtor: ModelConstructor<T>): GenericRepository<T> {
    try {
      // console.log(this.dataa+"sdxsxsxsxs")
      return new GenericRepository(this.dataa, modelCtor);
    } catch (error) {
      alert(error);
    }
  }

  // getRepo(model: Product): ProductRepositoryCustomed;
  // getRepo(model: ProductCategory): CategoryRepositroy;
  // getRepo(model: any){

  // }

  // getRepo<T extends BaseRepository>(repo: T): T{ }
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
  dataa;
  constructor(public db: Database, modelCtor: Constructor<T>) {
    this.dataa = db;
    console.log(this.dataa);
  }

  async create(table, data: T[], productsData: any[]) {
    // alert (JSON.stringify(database))
    await this.dataa.write(async p => {
      const collection = await this.dataa.collections.get(`${table}`);
      const productCollection = await this.dataa.collections.get('products');

      Promise.all(
        data.map(async (v, i) => {
          const newData = await collection.create(m => {
            Object.keys(v).forEach(k => {
              m[k] = v[k];
              console.log(
                k +
                  'helllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllll',
              );
              // product.category.set(category);
            });
          });
          console.log(newData);
          return newData;
        }),
      );
    });
  }
  async Read(table, data: {}) {
    try {
      const categoriesCollection = this.dataa.collections.get(`${table}`);

      // Query the categories and fetch all categories
      const allCategories = await categoriesCollection.query().fetch();

      // For each category, fetch its related products
      const categoriesWithProducts = await Promise.all(
        allCategories.map(async category => {
          const relatedProducts = await category.products.fetch(); // Fetch related products
          //   console.log('Fetched categories with products:', relatedProducts);
          return {
            ...category._raw, // Include category data
            products: relatedProducts.map(product => product._raw), // Include related products
          };
        }),
      );

      return categoriesWithProducts;
    } catch (error) {
      alert(error);
    }
  }
  async Update(data: T[]) {}
  async delete(data: any) {}
}

const rf = new RepositoryFactory(database);

// UOW | RepUOW
export const repository = {
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
// class ProductService {
//   constructor(
//     public productRepository: GenericRepository<Product>,
//     public category: GenericRepository<ProductCategory>,
//   ) {}

//   test() {}
// }

// UOW
// const productService = new ProductService(
//   repository.product,
//   repository.category,
// );
//------------------------------------------3

// Services
// class ProductService {
//   productRepository = this.rp.GetGeneric(Product);

//   constructor(public rp: RepositoryFactory, p: ProductRepositoryCustomed) {
//     let product = rp.GetGeneric(Product);
//     let cat = rp.GetGeneric(ProductCategory);
//   }

//   test() {}
// }

// UOW
// const productService = new ProductService(repository.product);
export async function createCategoryWithProducts(
  categoriesData: {
    name: string;
    position: string;
    products?: {
      name: string;
      code: string;
      description: string;
      price: number;
      photo: string;
      unit: string;
      categoryId: string;
    }[];
  }[],
) {
  try {
    await database.write(async () => {
      const categoryCollection = database.collections.get('categories');
      const productCollection = database.collections.get('products');

      // Loop through each category
      await Promise.all(
        categoriesData.map(async categoryData => {
          // Create the category
          const newCategory = await categoryCollection.create(category => {
            category.name = categoryData.name;
            category.position = categoryData.position;
          });

          // If the category has products, create those products
          if (categoryData.products && categoryData.products.length > 0) {
            await Promise.all(
              categoryData.products.map(async productData => {
                await productCollection.create(product => {
                  product.name = productData.name;
                  product.code = productData.code;
                  product.description = productData.description;
                  product.price = productData.price;
                  product.photo = productData.photo;
                  product.unit = productData.unit;
                  product.category.set(newCategory); // Link the product to the new category
                });
              }),
            );
          }
        }),
      );
    });
  } catch (error) {
    console.error('Error creating categories and products:', error);
  }
}
export async function createCategoryWithProducts1212(
  categoriesData: {
    name: string;
    position: string;
    tableName: string;
    innerValue?: {
      tableName:string;
      addTo:string;
      values: {
        name: string;
        code: string;
        description: string;
        price: number;
        photo: string;
        unit: string;
        categoryId: string;
      }[];
    };
  }[],
) {
  try {
    // Get the collections dynamically
    const collections = getCollections(['categories', 'products']);

    await database.write(async () => {
      // Destructure the collections for use
      const {categories: categoryCollection, products: productCollection} =
        collections;
      await Promise.all(
        categoriesData.map(async categoryData => {
          // Create the category
          const newCategory = await collections[categoryData.tableName].create(
            category => {
              Object.keys(categoryData).forEach(k => {
                category[k] = categoryData[k];
                // console.log(
                //   k +
                //     'helllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllllhelllll',
                // );
                // product.category.set(category);
              });

              // category.name = categoryData.name;
              // category.position = categoryData.position;
            },
          );

          // If the category has products, create those products
          if (
            categoryData.innerValue &&
            categoryData.innerValue.values.length > 0
          ) {
            await Promise.all(
              categoryData.innerValue.values.map(async productData => {
                await collections[categoryData?.innerValue?.tableName].create(product => {
                  // Dynamically assign product fields
                  Object.keys(productData).forEach(k => {
                    product[k] = productData[k]; // Assign each key from productData
                  });

                  // Link the product to the newly created category
                  // alert (categoryData?.innerValue?.addTo)
                  product[categoryData?.innerValue?.addTo].set(newCategory);
                });
              }),
            );
          }
        }),
      );
    });
  } catch (error) {
    console.error('Error creating categories and products:', error);
  }
}

// Helper function to get collections dynamically
export const getCollections = (collectionNames: string[]) => {
  const collections: {[key: string]: any} = {};

  collectionNames.forEach(collectionName => {
    collections[collectionName] = database.collections.get(collectionName);
  });

  return collections;
};

export const testOfCollections = (data: any[]) => {
  const categoryCollection = database.collections.get('categories');
  const productCollection = database.collections.get('products');
  const BooksData = database.collections.get('booksData');

  const collections: {[key: string]: any} = {};

  // Iterate through the provided array
  data.forEach(collectionName => {
    collections[collectionName] = database.collections.get(collectionName);
  });

  // Now 'collections' object holds all dynamically created collections
  console.log(collections['categories']); // Examp
};
Product.table;
