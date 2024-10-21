// Import your WatermelonDB database instance

import {Q} from '@nozbe/watermelondb';
import {database} from './database';
import { combineLatest, map, switchMap } from 'rxjs';

// Function to add a new product
export async function insertNewProduct({
  name,
  code,
  description,
  price,
  photo,
  unit,
  categoryId,
}) {
  try {
    // All database writes must be wrapped in a write block
    await database.write(async () => {
      const productsCollection = database.collections.get('products');

      
      // Create a new product
      await productsCollection.create(product => {
        product.name = name; // Product name
        product.code = code; // Product code
        product.description = description || null; // Optional description
        product.price = price; // Product price
        product.photo = photo || null; // Optional photo
        product.unit = unit || null; // Optional unit
        product.category_id = categoryId; // Foreign key to categories table
        console.log(product.category_id)
      });
    });

    console.log('Product successfully added!');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
}
export async function insertProductToCategory(categoryId, value) {
    try {
      await database.write(async () => {
        const productsCollection = database.collections.get('products');
  
        // Create a new product and associate it with the specified category
        await productsCollection.create(product => {
          product.name = value;                // Set the product name
          product.code = 'PROD123';            // Set a proper product code
          product.description = 'Sample description'; // Set a description
          product.price = 100;                 // Set the product price (must be a number)
          product.photo = 'http://example.com/photo.jpg'; // Set the product photo (optional)
          product.unit = 'kg';                 // Set the product unit (optional)
          product._raw.category_id = categoryId;    // Set the category_id to associate the product with a category
          console.log(product._raw)
        });
      });
  
      console.log('Product successfully added to category!');
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  }
  
export async function getCategoriesWithProducts() {
    try {
      // Get the categories collection
      const categoriesCollection = database.collections.get('categories');
  
      // Query the categories and fetch all categories
      const allCategories = await categoriesCollection.query().fetch();
  
      // For each category, fetch its related products
      const categoriesWithProducts = await Promise.all(
        allCategories.map(async (category) => {
          const relatedProducts = await category.products.fetch(); // Fetch related products
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
export async function insertNewCategory() {
  try {
    // All write operations in WatermelonDB must be wrapped in a write block
    await database.write(async () => {
      const categoriesCollection = database.collections.get('categories');

      // Create a new category
      await categoriesCollection.create(category => {
        category.name = 'name'; // Set the category name
        category.position = '120'; // Set the category position (number)
      });
    });

    console.log('Category successfully added!');
  } catch (error) {
    console.error('Error inserting category:', error);
  }
}
export async function getProductsForCategory(categoryId) {
    // main_id ********************************** 
  try {
    // Get the products collection
    const productsCollection = database.collections.get('products');

    // Query the products table, filtering by category_id
    const relatedProducts = await productsCollection
      .query() // Filter by category_id
      .fetch();
    //   relatedProducts.filter((item)=>item.category_id===categoryId)
    // alert(categoryId)
    return relatedProducts.map((item)=>item._raw.category_id);
  } catch (error) {
    console.error('Error fetching products for category:', error);
  }
}
export async function getCategoriesWithPagination(page = 1, pageSize = 10) {
  try {
    const categoriesCollection = database.collections.get('categories');

    // Calculate how many items to skip based on the current page
    const skipAmount = (page - 1) * pageSize;

    // Fetch the categories with pagination (skip and limit the results)
    const paginatedCategories = await categoriesCollection
      .query(Q.skip(page), Q.take(pageSize))
      // .skip(1) // Skip the categories of previous pages
      // .take(3)   // Limit the number of categories to fetch
      .fetch();

    console.log('Fetched categories:', paginatedCategories);
    return paginatedCategories;
  } catch (error) {
    console.error('Error fetching paginated categories:', error);
  }
}


// Function to update the name of a category
export async function updateCategoryName(categoryId, newName) {
  try {
    // All writes in WatermelonDB must be done inside a write block
    await database.write(async () => {
      const categoriesCollection = database.collections.get('categories');

      // Find the category by ID
      const category = await categoriesCollection.find(categoryId);

      // Update the category name
      await category.update(() => {
        category.name = newName;
      });
    });

    console.log('Category name successfully updated!');
  } catch (error) {
    console.error('Error updating category name:', error);
  }
}

export async function getProductsForCategory1212(categoryId) {
    try {
      const productsCollection = database.collections.get('products');
  
      // Query the products table and filter by category_id
      const relatedProducts = await productsCollection
        .query() // Filter by category_id
        .fetch();
  
      console.log('Related products:', relatedProducts.filter((item1)=>item1.category_id === categoryId));
      return relatedProducts; // Return the products associated with the category
    } catch (error) {
      console.error('Error fetching products for category:', error);
    }
  }
  export  function getCategoriesWithProductsObservable() {
    const categoriesCollection = database.collections.get('categories');
    const productsCollection = database.collections.get('products');
  
    // Observe changes in the categories and products
    return categoriesCollection
      .query()
      .observe()
      .pipe(
        switchMap((allCategories) => {
          // Create an observable that listens to both categories and their related products
          const categoriesWithProductsObservable = allCategories.map((category) =>
            combineLatest([
              category.observe(),  // Observe changes in this category
              category.products.observe(),  // Observe changes in related products
            ]).pipe(
              map(([categoryData, products]) => ({
                ...categoryData._raw,  // Category data
                products: products.map((product) => product._raw),  // Products data
              }))
            )
          );
  
          // Combine all category-product observables
          return combineLatest(categoriesWithProductsObservable);
        })
      );
  }
  export async function updateProduct(id, updatedValues) {
    try {
      await database.write(async () => {
        const productsCollection = database.collections.get('products');
  
        // Find the product by ID
        const product = await productsCollection.find(productId);
  
        // Update the product's fields
        await product.update(() => {
            product.name = updatedValues
          if (updatedValues.name) product.name = updatedValues.name;
          if (updatedValues.code) product.code = updatedValues.code;
          if (updatedValues.description) product.description = updatedValues.description || null;
          if (updatedValues.price) product.price = updatedValues.price;
          if (updatedValues.photo) product.photo = updatedValues.photo || null;
          if (updatedValues.unit) product.unit = updatedValues.unit || null;
        });
      });
  
      console.log('Product successfully updated!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  export async function UpdateHandler(tableName,productId,updatedValues){
    
    try {
      await database.write(async () => {
        const productsCollection = database.collections.get(`${tableName}`);
  
        // Find the product by ID
        const product = await productsCollection.find(productId);
  
        // Update the product's fields
        await product.update( () => {
            // product.name = updatedValues
            Object.keys(updatedValues).forEach((e)=>{
              product[e] = updatedValues[e] || null;
            })
          // if (updatedValues.name) product.name = updatedValues.name;
          // if (updatedValues.code) product.code = updatedValues.code;
          // if (updatedValues.description) product.description = updatedValues.description || null;
          // if (updatedValues.price) product.price = updatedValues.price;
          // if (updatedValues.photo) product.photo = updatedValues.photo || null;
          // if (updatedValues.unit) product.unit = updatedValues.unit || null;
        });
      });
  
      console.log('Product successfully updated!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  export async function ReplaceCategoryProducts(categoryId, newProductsData) {
    try {
      await database.write(async () => {
        const categoryCollection = database.collections.get('categories');
        const productCollection = database.collections.get('products');
        
        // Step 1: Find the category
        const category = await categoryCollection.find(categoryId);
  
        // Step 2: Find and delete all products related to the category
        const oldProducts = await productCollection.query(Q.where('category_id', categoryId)).fetch();
        await Promise.all(
          oldProducts.map(async (product) => {
            await product.markAsDeleted(); // Mark the old products as deleted
          })
        );
  
        // Step 3: Insert new products
        await Promise.all(
          newProductsData.map(async (productData) => {
            await productCollection.create((newProduct) => {
              Object.keys(productData).forEach((key) => {
                newProduct[key] = productData[key] || null;
              });
              newProduct.category.set(category); // Link the new product to the category
            });
          })
        );
  
        console.log('Products replaced successfully!');
      });
    } catch (error) {
      console.error('Error replacing products:', error);
    }
  }
  
  export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  export async function addCategoriesWithProductsDynamically(tableName, categoriesData) {
    try {
      await database.write(async () => {
        const collection = database.collections.get(tableName);
  
        // Step 1: Iterate over the list of categories
        await Promise.all(
          categoriesData.map(async (categoryData) => {
            // Step 2: Create each category
            const categoryEntry = await createEntry(collection, categoryData);
  
            // Step 3: Handle nested products for each category
            await handleNestedProducts(categoryEntry, categoryData);
          })
        );
        
        console.log(`Categories and their related products added successfully!`);
      });
    } catch (error) {
      console.error('Error adding categories and products dynamically:', error);
    }
  }
  
  // Helper function to create an entry in the table
  async function createEntry(collection, data) {
    return await collection.create((entry) => {
      Object.keys(data).forEach((key) => {
        if (!Array.isArray(data[key])) { // Only assign non-array values (fields)
          entry[key] = data[key];
        }
      });
    });
  }
  
  // Helper function to handle the product relationship dynamically
  async function handleNestedProducts(categoryEntry, data) {
    if (data.products && Array.isArray(data.products)) {
      const productCollection = database.collections.get('products');
  
      // Loop through each product and add it
      await Promise.all(
        data.products.map(async (productData) => {
          await productCollection.create((product) => {
            // Set product fields
            Object.keys(productData).forEach((key) => {
              product[key] = productData[key];
            });
  
            // Link the product to the category within the create() block
            product.category.set(categoryEntry);
          });
        })
      );
    }
  }