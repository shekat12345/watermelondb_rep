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
import {Q} from '@nozbe/watermelondb';
import {
  GenericRepository,
  RepositoryFactory,
  createCategoryWithProducts,
  createCategoryWithProducts1212,
  repository,
  testOfCollections,
} from '../Rep/GenericRep';
import Product from './product';

export const App1231 = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const sub = async () => {
    const categoriesCollection = database.collections.get('categories');

    // Subscribe to real-time updates using observe()
    // const subscription = categoriesCollection
    //   .query() // This will observe all categories
    //   .observe() // Returns an observable
    //   .subscribe(observedCategories => {
    //     setData(observedCategories); // Update state when data changes
    //   });
    //   return subscription
    let data1 = await getCategoriesWithProducts();
    setData(data1);
  };
  const callData = () => {
    sub();
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
          insertNewCategory();
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
              {JSON.stringify(item.products.map(item1 => item1.name))}
            </Text>
            <Button
              onPress={async () => {
                await insertProductToCategory(item.id, value);
              }}
              title="press to add product "
            />
          </>
        )}
      />
    </View>
  );
};

export const App123 = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(true);
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
    const subscription = getCategoriesWithProductsObservable().subscribe(
      categoriesWithProducts => {
        setData(categoriesWithProducts); // Update the data state
      },
    );

    return subscription; // Return subscription for cleanup
  };

  useEffect(() => {
    const subscription = subscribeToData(); // Start the subscription

    // Handle manual data updates (e.g., after adding/updating a product)
    eventEmitter.on(emmitersList.updateDataBase, () => {
      subscription.unsubscribe(); // Clean up the old subscription
      subscribeToData(); // Re-subscribe to get the latest data
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
      <Button
        title="Hello world "
        onPress={()=>{
          // testOfCollections(['categories','products'])
          createCategoryWithProducts1212([
            {
              name: 'hello',tableName:"categories", 
              position: '120',
              
              innerValue: {
                tableName:"products",
                addTo:"category",
                values:[
                  {
                    name: 'Product Name 1',
                    code: 'PROD123',
                    description: 'This is a sample product.',
                    price: 100,
                    photo: 'http://example.com/photo.jpg',
                    unit: 'kg',
                    categoryId: 'G5dBsz4jbcrcWZOP' // Replace with actual category ID
                  },
                  {
                    name: 'Product Name 2',
                    code: 'PROD124',
                    description: 'This is another sample product.',
                    price: 150,
                    photo: 'http://example.com/photo2.jpg',
                    unit: 'kg',
                    categoryId: 'G5dBsz4jbcrcWZOP' // Replace with actual category ID
                  }
                ]
              }
            },
            { name: 'hello1',tableName:"categories", position: '120' }, // No products for this category
            { name: 'hello2',tableName:"categories", position: '120' }, // No products for this category
            { name: 'hello3',tableName:"categories", position: '120' }, // No products for this category
            { name: 'hello4',tableName:"categories", position: '120' }  // No products for this category
          ])
          alert ("hello")
        }}
        // onPress={async() => {
        //   // alert ("gello ")
        //   // const erf = new GenericRepository(database)
        //   // const rf = new RepositoryFactory(database);
        //   // rf.GetGeneric(Product).create('categories', [
        //   //   {name: 'hello', position: '120',products:[{
        //   //     name: 'Product Name',
        //   //     code: 'PROD123',
        //   //     description: 'This is a sample product.',
        //   //     price: 100,
        //   //     photo: 'http://example.com/photo.jpg',
        //   //     unit: 'kg',
        //   //     categoryId: 'G5dBsz4jbcrcWZOP', // Replace with actual category ID
        //   //   },{
        //   //     name: 'Product Name',
        //   //     code: 'PROD123',
        //   //     description: 'This is a sample product.',
        //   //     price: 100,
        //   //     photo: 'http://example.com/photo.jpg',
        //   //     unit: 'kg',
        //   //     categoryId: 'G5dBsz4jbcrcWZOP', // Replace with actual category ID
        //   //   }]},
        //   //   {name: 'hello1', position: '120'},
        //   //   {name: 'hello2', position: '120'},
        //   //   {name: 'hello3', position: '120'},
        //   //   {name: 'hello4', position: '120'},
        //   // ],[{
        //   //   name: 'Product Name',
        //   //   code: 'PROD123',
        //   //   description: 'This is a sample product.',
        //   //   price: 100,
        //   //   photo: 'http://example.com/photo.jpg',
        //   //   unit: 'kg',
        //   //   categoryId: 'G5dBsz4jbcrcWZOP', // Replace with actual category ID
        //   // }]);
        //   // await createCategoryWithProducts([
        //   //   {
        //   //     name: 'hello', 
        //   //     position: '120',
        //   //     products: [
        //   //       {
        //   //         name: 'Product Name 1',
        //   //         code: 'PROD123',
        //   //         description: 'This is a sample product.',
        //   //         price: 100,
        //   //         photo: 'http://example.com/photo.jpg',
        //   //         unit: 'kg',
        //   //         categoryId: 'G5dBsz4jbcrcWZOP' // Replace with actual category ID
        //   //       },
        //   //       {
        //   //         name: 'Product Name 2',
        //   //         code: 'PROD124',
        //   //         description: 'This is another sample product.',
        //   //         price: 150,
        //   //         photo: 'http://example.com/photo2.jpg',
        //   //         unit: 'kg',
        //   //         categoryId: 'G5dBsz4jbcrcWZOP' // Replace with actual category ID
        //   //       }
        //   //     ]
        //   //   },
        //   //   { name: 'hello1', position: '120' }, // No products for this category
        //   //   { name: 'hello2', position: '120' }, // No products for this category
        //   //   { name: 'hello3', position: '120' }, // No products for this category
        //   //   { name: 'hello4', position: '120' }  // No products for this category
        //   // ])
        // }}
        
      />
      <Button
        title="Test for get method  "
        onPress={async () => {
          // const erf = new GenericRepository(database)
          const rf = new RepositoryFactory(database);
          let erff = await rf
            .GetGeneric(Product)
            .Read('categories', {name: ''})
          console.log(erff.map((item)=>item.products))
        }}
      />
      <Button
        title="press me to hide "
        onPress={() => {
          setOpen(!open);
        }}
      />
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
      {open && (
        <FlatList
          data={data.slice(0, 5)}
          renderItem={({item}) => (
            <>
              <Text
                onPress={() => {
                  // console.log(item.products[0].id)
                  updateProduct(item.products[0].id, value);
                  eventEmitter.emit(emmitersList.updateDataBase);
                }}>
                {item.name}{' '}
                {JSON.stringify(item.products.map(item1 => item1.name))}
              </Text>
              <Button
                onPress={async () => {
                  await insertProductToCategory(item.id, value);
                  eventEmitter.emit(emmitersList.updateDataBase); // Trigger data refresh after adding the product
                }}
                title="Add Product"
              />
            </>
          )}
        />
      )}
    </View>
  );
};
