import { databaseChat } from './database'; // Adjust the path according to your project



export default class ChatListRepository {
  
    // Method to create multiple ChatList entries with dynamic properties and their messages
    async createChatsWithMessages(chatListDataArray) {
      return database.write(async () => {
        // Step 1: Loop through each chatList entry in the provided array
        for (const chatListData of chatListDataArray) {
          
          // Step 2: Destructure the messages array and other dynamic properties from the chatListData
          const { messages, ...chatListProperties } = chatListData;
          
          // Step 3: Create a ChatList with dynamic properties
          const newChatList = await database.collections
            .get('chatList')
            .create((chatList) => {
              Object.keys(chatListProperties).forEach((key) => {
                chatList[key] = chatListProperties[key];  // Dynamically assign properties
              });
            });
  
          // Step 4: For each message in the messages array, create and associate it with the new ChatList
          for (const messageData of messages) {
            await this.createMessageForChatList(newChatList, messageData);
          }
        }
      });
    }
  
    // Helper method to create a Message with dynamic properties and associate it with a ChatList
    async createMessageForChatList(chatList, messageData) {
      const newMessage = await database.collections
        .get('messages')
        .create((message) => {
          Object.keys(messageData).forEach((key) => {
            message[key] = messageData[key]; // Dynamically set message properties
          });
          message.chatList.set(chatList);  // Associate the message with the ChatList
        });
      
      return newMessage;
    }
  }
