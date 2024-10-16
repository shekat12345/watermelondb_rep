import { combineLatest, switchMap } from "rxjs";
import { database } from "./database";

export function getCategoriesWithProductsObservable() {
    const categoriesCollection = database.collections.get('categories');
    const productsCollection = database.collections.get('products');
  
    // Observe the categories and products together
    const categoriesObservable = categoriesCollection.query().observe();
    const productsObservable = productsCollection.query().observe();
  
    return combineLatest([categoriesObservable, productsObservable]).pipe(
      switchMap(async ([allCategories, allProducts]) => {
        // For each category, fetch related products from the products collection
        const categoriesWithProducts = await Promise.all(
          allCategories.map(async (category) => {
            const relatedProducts = allProducts.filter(product => product.category_id === category.id); // Get related products
            return {
              ...category._raw,    // Include category data
              products: relatedProducts.map(product => product._raw), // Include related products
            };
          })
        );
        return categoriesWithProducts;
      })
    );
  }


// Function to get categories with their products, using observables for real-time updates
export function getCategoriesWithProductsObservable12() {
  const categoriesCollection = database.collections.get('categories');
  const productsCollection = database.collections.get('products');

  // Observe the categories and products together
  const categoriesObservable = categoriesCollection.query().observe();
  const productsObservable = productsCollection.query().observe();

  return combineLatest([categoriesObservable, productsObservable]).pipe(
    switchMap(async ([allCategories, allProducts]) => {
      // For each category, fetch related products from the products collection
      const categoriesWithProducts = await Promise.all(
        allCategories.map(async (category) => {
          const relatedProducts = allProducts.filter(product => product.category_id === category.id); // Get related products
          return {
            ...category._raw,    // Include category data
            products: relatedProducts.map(product => product._raw), // Include related products
          };
        })
      );
      return categoriesWithProducts;
    })
  );
}
