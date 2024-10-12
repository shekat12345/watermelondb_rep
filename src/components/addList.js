import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import addNewChatList from '../services/addnewchatList';
import {database} from '../../dataBase/database';
import {
  createPostWithComments,
  findPostByTitle,
  getPostWithComment11s,
  getPostsWithComments,
  gettposts,
  observePostsBySimilarTitle,
} from '../../data2/insertion';

const AddNEwItem = () => {
  const [value, setValue] = useState('');
  const messages = [
    {text: 'Hello there!', createdAt: Date.now()}, // Date.now() returns a Unix timestamp
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are you?', createdAt: Date.now()},
    {text: 'How are youswdwwwdwdwd?', createdAt: Date.now()},
  ];
  const addNewItem = () => {
    addNewChatList(
      1,
      'Chat with John',
      'Hello there!',
      '2024-10-12',
      '/path/to/image',
      messages,
    );
  };
  const retriveData = async () => {
    var chatLists = await database.collections
      .get('chat_lists')
      .query()
      .fetch();
    var messages = await database.collections.get('messages').query().fetch();
    messages = messages.map(item => item._raw);
    chatLists = chatLists.map(item => item);
    // console.log(messages)
    // console.log(chatLists)
    chatLists.map(item => {
      var erff = messages.find(item1 => item1.chat_list_id === item.id);
      console.log(erff);
      // console.log(
      // item.chat_list_id
      // messages.includes(item)
      // )
    });
    // chatLists.map((item)=>{
    //   console.log(item.id+" this is for chatList")
    // })
  };

  return (
    <View style={{flex: 1, backgroundColor: '#4cb3d4'}}>
      <TextInput
        onChangeText={setValue}
        value={value}
        placeholder="Enter some text to add new items "
      />
      <Button
        onPress={async () => {
          // addNewItem()
          // retriveData()
          // createPostWithComments()
          const commentsArray = [
            'This is the first comment.',
            'This is the second comment.',
            'This is another comment.',
          ];
          // await createPostWithComments("new possts1212",commentsArray)

          // createPostWithComments('My First Post', commentsArray).then((e)=>{}).catch((e)=>{console.log(e)})
          // getPostWithComment11s('g2M7JDZG6eOyeoNJ').then((e)=>{
          //   alert(e)
          // })
          // findPostByTitle('new possts')
          observePostsBySimilarTitle('new possts',(posts)=>{
            console.log ("sdsdsdsdsdsdsd"+posts)
          });
          // gettposts().then((e)=>{
          //   console.log(e)
          // })
        }}
        title="Press me to Add !"
      />
      <Text>Hello newt</Text>
    </View>
  );
};
export default AddNEwItem;
