/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
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

import AddNEwItem from './src/components/addList';
import {database13} from './data2/database';
import test from './rxjs/basic';
import Pets from './src/components/pets/pets';
import {
  addPostWithComments,
  fetchPostsWithComments,
  // getComment,
  // insertAcomment,
} from './src/services/Postservices';
import PostsList from './src/posts/components/List';
import { database } from './src/categories/database';
// import { database } from './src/chats/database';
import { App123 } from './src/categories';
import { ChatListTest } from './src/chats/components/chatTest';

function App12(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const App = () => {
  const [value,setValue] = useState('')
  return (
    <DatabaseProvider database={database}>
      {/* <App11/> */}
      {/* <PostList /> */}
      {/* <AddNEwItem/> */}
      {/* <ListCheck/> */}
      <></>
      {/* <Button title='press me to test the observable' onPress={()=>{
        // test.subscribe({
        //   next(value) { console.log('Received value:', value); },
        //   complete() { console.log('Stream complete'); }
        // });
        test()
      }}/> */}
      {/* <Pets/> */}
      {/* <Button
        title="Add New post "
        onPress={() => {
          const commentsList = [
            'First comment',
            'Second comment',
            'Another interesting comment',
          ];
          addPostWithComments('this is new post for testing ', commentsList);
        }}
      />
      <Button
        title="Get posts"
        onPress={() => {
          // fetchPostsWithComments().then(e => {
          //   e?.map(item => {
          //     console.log(item.id);
          //   });
          // });
          // getComment('pnYIBl9dLaFXqJbp')
        }}
      />
      <TextInput value={value} onChangeText={setValue}/>
      <Button
        title="Add a Comment"
        onPress={() => {
          // fetchPostsWithComments().then(e => {
          //   e?.map(item => {
          //     console.log(item.id);
          //   });
          // });
          // insertAcomment('pnYIBl9dLaFXqJbp',value)
        }}
      />
      <PostsList value={value}/> */}
      <App123/>
      {/* <ChatListTest/> */}
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
