import {Button, View} from 'react-native';
import ChatListRepository from '../service';
import { addNEwChat } from '../services/chats';

export const ChatListTest = () => {
  const Add =async () => {
    const chatListRepo = new ChatListRepository();

   try {
    addNEwChat([
        {
          name: 'Dynamic Chat List', // dynamic properties for chatList
          position: 2,
          additionalField: 'Extra Information', // You can add more properties
          messages: [
            {
              title: 'Dynamic First message', // dynamic properties for message
              chattid: 'chat_001',
              hasMedia: false,
              sender: 'user_001',
              customField: 'Custom Info 1', // You can add more properties dynamically
            },
            {
              title: 'Dynamic Second message',
              chattid: 'chat_002',
              hasMedia: true,
              sender: 'user_002',
              customField: 'Custom Info 2',
            },
          ],
        },
      ]);
   } catch (error) {
    console.log(error)
   }
  };
  return (
    <View>
      <Button title="press me to add a chat " onPress={Add} />
    </View>
  );
};
