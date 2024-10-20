import { database } from "../database";


export async function addChatListWithMessages(chatListData, messagesData) {
  await database.write(async () => {
    // Create a new ChatList
    const newChatList = await database.collections.get('chatList').create((chatList) => {
      chatList.name = chatListData.name;
      chatList.position = chatListData.position;
    });

    // Create new messages related to the new ChatList
    const newMessages = messagesData.map((messageData) =>
      database.collections.get('messages').create((message) => {
        message.title = messageData.title;
        message.sender = messageData.sender;
        message.chatID = newChatList.id;  // Use the new chatList's ID
        message.date = messageData.date;
        if (messageData.hasMedia) {
          message.hasMedia = messageData.hasMedia;
        }
      })
    );

    // Batch the creation of messages to ensure atomicity
    await database.batch(...newMessages);
  });
}