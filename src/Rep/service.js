import {database} from '../categories/database';
// READ+++++
export async function getCategoriesWithProductsTest() {
  const categoryCollection = database.collections.get('categories');

  // Fetch all categories
  const categories = await categoryCollection.query().fetch();

  // Fetch products for each category
  const categoriesWithProducts = await Promise.all(
    categories.map(async category => {
      const products = await category.products.fetch(); // Fetch products related to this category
      return {
        ...category._raw, 
        products, 
      };
    }),
  );

  console.log(categoriesWithProducts);
  return categoriesWithProducts;
}

//CREATE *****
//   export const
export const categoryData = [
  {
    name: 'Electronics',
    position: '1',
    products: {
      tableName: 'products',
      values: [
        [
          {name: 'Smartphone', code: 'P001', price: 500},
          {name: 'Laptop', code: 'P002', price: 1200},
          {name: 'Tablet', code: 'P003', price: 300},
        ],
      ],
    },
  },
  {
    name: 'mathematics',
    position: '3',
    products: {
      tableName: 'products',
      values: [
        [
          {name: 'Smartphone', code: 'P001', price: 500},
          {name: 'Laptop', code: 'P002', price: 1200},
          {name: 'Tablet', code: 'P003', price: 300},
        ],
      ],
    },
  },
  {
    name: 'chemistry',
    position: '2',
    
  },
];
export async function createCategoriesWithProducts(categoryData) {
    try {
      await database.write(async () => {
        const categoryCollection = database.collections.get('categories');
        const productCollection = database.collections.get('products');
  
       
        await Promise.all(
          categoryData.map(async (category) => {
           
            const newCategory = await categoryCollection.create((categoryModel) => {
              Object.keys(category).forEach((key) => {
                if (key !== 'products') {
                  categoryModel[key] = category[key]; 
                }
              });
            });
  
            if (category.products && category.products.values) {
              await Promise.all(
                category.products.values.flat().map(async (productData) => {
                  
                  await productCollection.create((productModel) => {
                    Object.keys(productData).forEach((key) => {
                      productModel[key] = productData[key];  
                    });
                    productModel.category.set(newCategory);  
                  });
                })
              );
            }
          })
        );
  
        console.log('Categories and related products created successfully!');
      });
    } catch (error) {
      console.error('Error creating categories and products:', error);
    }
}
// READ **** 
// export async function Read(){
//     try {
//         // Get the categories collection
//         const categoriesCollection = database.collections.get('categories');
    
//         // Query the categories and fetch all categories
//         const allCategories = await categoriesCollection.query().fetch();
    
//         // For each category, fetch its related products
//         const categoriesWithProducts = await Promise.all(
//           allCategories.map(async (category) => {
//             const relatedProducts = await category.products.fetch();
//           //   console.log('Fetched categories with products:', relatedProducts);
//             return {
//               ...category._raw,    // Include category data
//               products: relatedProducts.map(product => product._raw), 
//             };
//           })
//         );
    
        
//         return categoriesWithProducts; 
//       } catch (error) {
//         console.error('Error fetching categories with products:', error);
//       }
// }
async function createEntitiesRecursively(tableName, parentEntry, entityData) {
    const collection = database.collections.get(tableName);
  
    await Promise.all(
      entityData.map(async (data) => {
        // Create the entry in the table (either a category or product)
        const newEntry = await collection.create((model) => {
          Object.keys(data).forEach((key) => {
            if (key !== 'values') {  // Skip nested related data
              if(typeof data[key] !== 'object'){
                model[key] = data[key];  // Dynamically set fields
              }
              else{
                console.log(newEntry)                
                
                  
                const collection = database.collections.get('products');
                collection.category.set(data.values);  // Properly link the foreign key
                
                
              }
              
              

            }
          });
        });
  
        // Link the current entry to its parent (e.g., link product to category)
        if (parentEntry) {
          alert(JSON.stringify(parentEntry))
          newEntry.category.set(parentEntry);  // Properly link the foreign key
        }
  
        // Check if there are nested products to process
        if (data.values && tableName === 'categories') {
          // Process products related to the category
          await createEntitiesRecursively('products', newEntry, data.values.flat());
        }
      })
    );
  }
  
export async function createCategoriesWithProductsRecursively(categoryData) {
    try {
      await database.write(async () => {
        await createEntitiesRecursively('categories', null, categoryData);
        console.log('Categories and products created successfully!');
      });
    } catch (error) {
      console.error('Error creating categories and products recursively:', error);
    }
  }
  
 