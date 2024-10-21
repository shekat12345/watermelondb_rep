/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {DatabaseProvider} from '@nozbe/watermelondb/DatabaseProvider';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import PostList from './components/PostList';
import ListCheck from './src/components/listChecker';
// import { database } from './dataBase/database';




import {database} from './src/categories/database';


import {CategoryCollection} from './src/Rep/resp_ali';


import ProductCategory from './src/categories/categories';

const App = () => {
  const [value, setValue] = useState('');
  const Action = () => {
    async () => {      
      const categoryData = [
        {
          name: 'Electronics',
          position: '1',
          products: [
            {name: 'Smartphone', code: 'P001', price: 500},
            {name: 'Laptop', code: 'P002', price: 1200},
          ],
        },
        {
          name: 'Mathematics',
          position: '3',
          products: [{name: 'Calculator', code: 'P004', price: 50}],
        },
      ];
      // createCategoriesWithProductsRecursively(categoryData);
      CategoryCollection.create(categoryData);
    };
  };
  return (
    <DatabaseProvider database={database}>
      <Button title="hello press for teswwwt " onPress={Action} />
    </DatabaseProvider>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
