import { Button } from "react-native"
import { addChatListWithMessages } from "../services/chats"

export const ChatListTest =()=>{
    const Add = ()=>{

        const chatListData = {
            name: 'General Chat',
            position: 1
          };
          
          const messagesData = [
            { title: 'Hello!', sender: 1, date: '2024-10-16', hasMedia: 'no' },
            { title: 'How are you?', sender: 2, date: '2024-10-16', hasMedia: 'no' },
            // Add more messages if needed
          ];
          
          addChatListWithMessages(chatListData, messagesData)
            .then(() => console.log('ChatList with messages added!'))
            .catch((error) => console.error('Error adding ChatList with messages:', error));
          

        addChatListWithMessages(chatListData,messagesData).then(()=>{
            alert ("hello ")
        })
    }
    return <View>
        <Button title="press me to add a chat " onPress={Add}/>
    </View>
}