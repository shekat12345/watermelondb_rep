import { database } from "../../dataBase/database";


async function addNewChatList(conversationId, title, lastMessage, lastChange, profileImagePath, messages) {
  await database.write(async () => {
    // Create a new ChatList entry
    try {
      const newChatList = await database.collections.get('chat_lists').create(chatList => {
        chatList.conversationId = conversationId;
        chatList.title = title;
        chatList.lastMessage = lastMessage;
        chatList.lastChange = lastChange;
        chatList.profileImagePath = profileImagePath;        
      });
      if (messages && messages.length > 0) {
        alert ("called")
        messages.forEach(async message => {
          await database.collections.get('messages').create(newMessage => {
            newMessage.message = message.text; // Assuming the message object contains a 'text' property
            newMessage.createdAt = message.createdAt; // Ensure this is a Unix timestamp (number)
            newMessage.chatList.set(newChatList); // Associate the message with the ChatList
          });
        });
      }
    } catch (error) {
      console.error(error)
    }

    // Add associated messages if they exist
   
  });
}
export default addNewChatList;
