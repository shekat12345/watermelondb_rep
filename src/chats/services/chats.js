import { database, databaseChat } from "../database";


export async function addNEwChat(chatList) {
  try {
    await databaseChat.write(async () => {
      const chatListCollection = databaseChat.collections.get('chatList');
      const productCollection = databaseChat.collections.get('messages');

     
      await Promise.all(
        chatList.map(async (item) => {
         
          const newChatList = await chatListCollection.create((chatListmodel) => {
            Object.keys(item).forEach((key) => {
              
              if (typeof chatListmodel !== "object"){
                chatListmodel[key] = item[key]; 
                alert("hell")
              }
              
            });
          });

          if (item.messages && item.messages) {
            alert ("hehehehehh")
            await Promise.all(
              item.messages.flat().map(async (productData) => {
                
                await productCollection.create((productModel) => {
                  Object.keys(productData).forEach((key) => {
                    productModel[key] = productData[key];  
                  });
                  productModel?.messages?.set(newChatList);  
                });
              })
            );
          }
        })
      );

      console.log('Categories and related products created successfully!');
    });
  } catch (error) {
    console.error('Error creating categories and products:', error);
  }
}
 export const getMessagesByChatID=async(chatID) =>{
  return databaseChat.read(async () => {
    // Step 1: Query the messages collection to find messages with the given chatID
    const messages = await databaseChat.collections
      .get('messages')
      .query(Q.where('chatId', chatID))  // 'chattid' refers to the foreign key in your schema
      .fetch();

    return messages;  // Return the list of messages associated with the chatID
  });
}
expo