import {Q} from '@nozbe/watermelondb';
import {database, database12} from './database';
import {catchError, switchMap, tap,map } from 'rxjs';

export async function createPostWithComments(title, commentsArray) {
  await database12.write(async () => {
    // Step 1: Create the Post
    const newPost = await database12.collections.get('posts').create(post => {
      post.title = title;
    });

    // Step 2: Insert multiple comments linked to the Post
    await Promise.all(
      commentsArray.map(async commentText => {
        await database12.collections.get('comments').create(comment => {
          comment.body = commentText;
          comment.post.set(newPost); // Link the comment to the new post
        });
      }),
    );
  });
}
export async function gettposts() {
  const posts = await database12.collections.get('posts').query().fetch();
  return posts;
}
export async function getPostWithComment11s(postId) {
  // const post = await database12.get('comments');
  // var posts = (await database12.get('posts').query().fetch()).find((item)=>item._raw.id == 'g2M7JDZG6eOyeoNJ')
  var helper = [];
  var allComments = await database12.get('comments').query().fetch();
  var cmm = allComments.filter(
    item => item._raw.post_id === 'g2M7JDZG6eOyeoNJ',
  );
  // const comments = post; // Fetch the related comments
  // 'g2M7JDZG6eOyeoNJ'
  // console.log('Post:', post.title);
  // allComments = allComments.map((item)=>item._raw.post_id)
  console.log('Comments:', cmm.length);
}
// export async function getPostsWithComments() {
//   const posts = await database12.collections.get('posts').query().fetch();

//   const postsWithComments = await Promise.all(
//     posts.map(async post => {
//       const comments = await post.comments.fetch(); // Get all comments for the post
//       return {
//         post,
//         comments,
//       };
//     }),
//   );

//   console.log(postsWithComments);
// }
export async function getPostsWithComments() {
  const posts = await database12.collections.get('posts').query().fetch();
  const comments = await database12.collections.get('comments').query().fetch();

  // const postsWithComments = await Promise.all(

  // );
  // posts.map(async post => {
  // const comments = post.comments.fetch(); // Fetch the related comments
  console.log(comments.map(item => item._raw));
  // })

  // console.log(postsWithComments);
}
export function observePostsBySimilarTitle(partialTitle) {
  return database12.collections.get('posts')
    .query(Q.where('title', Q.like(`%${partialTitle}%`)))
    .observe() // Observe changes to the results
    .pipe(
      tap(posts => {
        // Log the posts or any debug information
        console.log('Posts found in pipe:', posts.length);
      }),
      map(posts => posts || []), // Ensure it returns an array, even if the result is null or undefined
      catchError(error => {
        // Log the error and return an empty array to keep the stream alive
        console.error('Error caught in pipe:', error);
        return of([]); // Returning an observable of an empty array
      })
    ).subscribe({
      next: (posts) => {
        if (posts.length > 0) {
          // alert(posts)
          return posts
        } else {
          console.log('No posts found');
        }
      },
      error: (error) => {
        // Log any errors that occur during subscription
        console.error('Error in subscription:', error);
      },
    });
}
