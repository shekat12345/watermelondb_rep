import {Button, FlatList, Text, TextInput, View} from 'react-native';
import {
  getCategories,
  getCategoriesWithPagination,
  getCategoriesWithProducts,
  getCategoriesWithProductsObservable,
  getProductsForCategory,
  getProductsForCategory1212,
  insertNewCategory,
  insertNewProduct,
  insertProductToCategory,
  updateCategoryName,
  updateProduct,
} from './service';
import {useEffect, useState} from 'react';
import {database} from './database';
import eventEmitter, {emmitersList} from '../components/pets/service/emitter';
import { Q } from '@nozbe/watermelondb';

export const App1231 = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const sub = async()=>{
    const categoriesCollection = database.collections.get('categories');

    // Subscribe to real-time updates using observe()
    // const subscription = categoriesCollection
    //   .query() // This will observe all categories
    //   .observe() // Returns an observable
    //   .subscribe(observedCategories => {
    //     setData(observedCategories); // Update state when data changes
    //   });
    //   return subscription
    let data1 = await getCategoriesWithProducts()
    setData(data1)
    
  }
  const callData = () => {
   
    sub()
  };
  useEffect(() => {
    // Get the categories collection
    callData();
    eventEmitter.on(emmitersList.updateDataBase, callData);

    // Unsubscribe when the component unmounts to avoid memory leaks
    // return () => {
    //     sub().unsubscribe();
    // //   subscription.unsubscribe();
    // };
  }, []); //

  return (
    <View>
      <Text
        onPress={() => {
          insertNewProduct({
            name: 'Product Name',
            code: 'PROD123',
            description: 'This is a sample product.',
            price: 100,
            photo: 'http://example.com/photo.jpg',
            unit: 'kg',
            categoryId: 'G5dBsz4jbcrcWZOP', // This should be a valid category_id from the categories table
          });
          //   insertNewCategory();
        }}>
        Hello hello hello{' '}
      </Text>
      <Button
        onPress={async () => {
          insertNewCategory()
        }}
        title="press me to find"
      />
      <TextInput value={value} onChangeText={setValue} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <>
          <Text
            onPress={async () => {
                // await insertProductToCategory(item.id,value)
            //   alert(item.id)
            //   let data = await getProductsForCategory(item.id)
            // let data = await getCategoriesWithProducts()
            //   console.log(data.map((item1)=>item1.products))

            //   updateCategoryName(item.id, value).then(() => {
            //     eventEmitter.emit(emmitersList.updateDataBase);
            //   });
            //*-*-*-**-*-*-*-*-*
            // let data = await getCategoriesWithProducts()
            // console.log(data.map((item1)=>item1.products))
            // alert (item.id)
            // getProductsForCategory1212(item.id)

            }}>
            {item.name}   
            {JSON.stringify(item.products.map((item1)=>item1.name))}
          </Text>
          <Button onPress={async()=>{
            await insertProductToCategory(item.id,value)
          }} title='press to add product '/>
          </>
        )}
      />
    </View>
  );
};



export const App123 = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [open,setOpen] = useState(true)
  // Subscribe to the observable and set the data in real time
//   const subscribeToData = () => {
//     const subscription = getCategoriesWithProductsObservable().subscribe((categoriesWithProducts) => {
//       setData(categoriesWithProducts);
//     });

//     return subscription;  // Return subscription for cleanup
//   };

//   useEffect(() => {
//     const subscription = subscribeToData();  // Start the subscription

//     // Handle manual data updates (e.g., after adding a new product)
//     eventEmitter.on(emmitersList.updateDataBase, () => {
//       subscription.unsubscribe();  // Clean up the old subscription
//       subscribeToData();  // Re-subscribe to get the latest data
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);
const subscribeToData = () => {
    const subscription = getCategoriesWithProductsObservable().subscribe((categoriesWithProducts) => {
      setData(categoriesWithProducts); // Update the data state
    });

    return subscription;  // Return subscription for cleanup
  };

  useEffect(() => {
    const subscription = subscribeToData();  // Start the subscription

    // Handle manual data updates (e.g., after adding/updating a product)
    eventEmitter.on(emmitersList.updateDataBase, () => {
      subscription.unsubscribe();  // Clean up the old subscription
      subscribeToData();  // Re-subscribe to get the latest data
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
        <Button title='press me to hide ' onPress={()=>{
            setOpen(!open)
        }}/>
      <Text
        onPress={() => {
          insertNewProduct({
            name: 'Product Name',
            code: 'PROD123',
            description: 'This is a sample product.',
            price: 100,
            photo: 'http://example.com/photo.jpg',
            unit: 'kg',
            categoryId: 'G5dBsz4jbcrcWZOP', // Replace with actual category ID
          });
        }}>
        Hello hello hello{' '}
      </Text>
      <Button
        onPress={async () => {
          insertNewCategory();
        }}
        title="Add New Category"
      />
      <TextInput value={value} onChangeText={setValue} />
      {open && <FlatList
        data={data.slice(0,5)}
        renderItem={({item}) => (
          <>
            <Text onPress={()=>{
                // console.log(item.products[0].id)
                updateProduct(item.products[0].id,value)
                eventEmitter.emit(emmitersList.updateDataBase); 
                }}>
              {item.name} {JSON.stringify(item.products.map((item1) => item1.name))}
            </Text>
            <Button
              onPress={async () => {
                await insertProductToCategory(item.id, value);
                eventEmitter.emit(emmitersList.updateDataBase);  // Trigger data refresh after adding the product
              }}
              title="Add Product"
            />
          </>
        )}
      />}
    </View>
  );
};
