import { Q } from '@nozbe/watermelondb';
import database from '../posts/database';

export async function addPostWithComments(postTitle, commentsList) {
  try {
    await database.write(async () => {
      // Create the new post
      const newPost = await database.collections.get('posts').create(post => {
        post.title = postTitle;
      });

      // Iterate through the comments list and create each comment
      for (let commentBody of commentsList) {
        await database.collections.get('comments').create(comment => {
          comment.body = commentBody;
          comment.post.set(newPost); // Associate the comment with the post
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchPostsWithComments() {
  try {
    // Get all posts from the 'posts' table
    const postsCollection = database.collections.get('posts');
    const allPosts = await postsCollection.query().fetch();

    // Loop through each post and fetch the associated comments
    // const postsWithComments = await Promise.all(
    //   allPosts.map(async (post) => {
    //     const comments = await post.comments.fetch(); // Fetch comments for this post
    //     return {
    //       title: post.title,
    //       comments: comments.map(comment => comment.body), // Extract comment bodies
    //     };
    //   })
    // );

    // // Now you have posts with their comments
    // console.log(postsWithComments);
    return allPosts;
  } catch (error) {
    console.error('Error fetching posts with comments:', error);
  }
}
export async function getComment(id) {
  const postsCollection = database.collections.get('comments');
  alert(id)
  // const allPosts = (await postsCollection.query().fetch())
  // .filter(

  //   item => {
  //     console.log(item._raw.post_id +"  posts  " +id)
  //     return item._raw.post_id === id
  //   }
  // );
  try {
    // Get the comments collection
    const commentsCollection = database.collections.get('comments');

    // Query the comments collection and filter by post_id
    const relatedComments = await commentsCollection
      .query(Q.where('post_id', id)) // Filter by post_id
      .fetch();

    console.log('Related comments:', relatedComments.map((item)=>item.body));
    return relatedComments; // Return the filtered comments
  } catch (error) {
    console.error('Error fetching comments for post:', error);
  }
//    console.log(
//      allPosts.map((item)=>item.body)
//  );
}
export async function  insertAcomment(postId, commentBody){
  try {
    await database.write(async () => {
      const commentsCollection = database.collections.get('comments');
      alert(commentBody+"   posts"+postId)
      // Create a new comment
      await database.collections.get('comments').create(comment => {
        comment.body = commentBody;
        comment.post_id = postId; // Associate the comment with the post
         // Debugging
      });
      // await commentsCollection.create(comment => {
      //   comment.post_id = postId;
      //   comment.body = commentBody; // Set the comment body
      //      // Link the comment to the correct post using post_id
      // });
      let dattt =await commentsCollection.query().fetch()
      console.log("Created comment with post_id:", dattt.map((item)=>item.post_id+" ddd  "+item.body));
    });

    console.log('Comment successfully added!');
  } catch (error) {
    console.error('Error inserting comment:', error);
  }

}
export async function getCommentsForPost(postId) {
  try {
    // Get the comments collection
    const commentsCollection = database.collections.get('comments');

    // Query the comments table, filtering by post_id
    const relatedComments = await commentsCollection
      .query(Q.where('post_id', postId)) // Filter by post_id
      .fetch();

    console.log('Related comments:', relatedComments.map((item)=>{
      return item.body
    }));
    return relatedComments;
  } catch (error) {
    console.error('Error fetching comments for post:', error);
  }


  
}
export async function insertNewComment(postId, commentBody) {
  try {
    // All write operations in WatermelonDB must be wrapped in a write block
    await database.write(async () => {
      const commentsCollection = database.collections.get('comments');

      // Create a new comment
      await commentsCollection.create(comment => {
        comment.body = commentBody;  // Set the comment body
        comment.post_id = postId;    // Link the comment to the correct post using post_id
      });
    });

    console.log('Comment successfully added!');
  } catch (error) {
    console.error('Error inserting comment:', error);
  }
}