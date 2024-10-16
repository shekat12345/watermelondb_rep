import {database12} from '../../data2/database'; // Your WatermelonDB database
import {Q} from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import React, {memo, useEffect, useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';

// Function to observe posts by similar title
export function observePostsBySimilarTitle(prp) {
  
  let partialTitle = prp.partialTitle;
  return database12.collections
    .get('posts')
    .query(Q.where('title', Q.like(`%${partialTitle}%`))) // Query posts where the title matches the partialTitle
    .observe(); // Observe the changes in the posts collection
}
export function observComments() {
  try {
    let erf = database12.collections.get('comments').query().observe();
    // Query posts where the title matches the partialTitle
    // Observe the changes in the posts collection
    // console.log(erf);
    return erf;
  } catch (error) {
    alert('errr');
  }
}
function observeCommentsForPost(postId) {
  return database12.collections
    .get('comments')
    .query(Q.where('post_id', postId)) // Query comments where the post_id matches
    .observe(); // Observe the comments reactively
}
// Higher-order component with reactive observables
const enhance = withObservables(['partialTitle', 'post', 'bool'], prp => ({
  posts: observePostsBySimilarTitle(prp), // Observe the posts collection reactively, based on the partialTitle input
  comments: observComments(),
  //   comments:observeCommentsForPost()
}));

// PostList Component to display posts in a FlatList
const PostList = enhance(({posts, post, bool, setBool}) => (
  <FlatList
    data={posts} // The observed data is passed to the FlatList
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <PostItem setBool={setBool} bool={bool} post={item} /> // Render each post using the PostItem component
    )}
  />
));

// PostItem Component to render a post and update its title
const PostItem = memo(
  ({post, bool, setBool, comments}) => {
    const [comments1,setComments1] = useState([])
    const sett = async()=>{
        var erff = (await database12.collections.get('comments').query().fetch()).filter((item1)=>item1._raw.post_id === post.id)
        console.log("erffsdsdsdsdsderffsdsdsdsdsderffsdsdsdsdsderffsdsdsdsdsderffsdsdsdsdsd")
        setComments1(erff)
    }
    useEffect(() => {
    //   console.log('render');
      sett()
    }, []);

    return (
      <View>
        {/* Display the current post title */}
        <Button
          onPress={async () => {
            await database12.write(async () => {
              // Find and update the post by its ID
              const newPost = await database12.collections
                .get('posts')
                .create(post => {
                  post.title = 'ededededededed';
                });
            });
            
            // console.log(erff.map((item)=>item.body))
          }}
          title="press to add"
        />
        {comments1.map((item)=><Text 
       onPress={async () => {
        await database12.write(async () => {
          // Find and update the post by its ID
          const postToUpdate = await database12.collections
            .get('comments')
            .find(item.id);

          await postToUpdate.update(updatedPost => {
            updatedPost.body = 'Updated Twdwdwdwdwdwditle'; // Update the title of the post
          });
        });

        // console.log(post.id);
        setBool(!bool);
      }}
        >{item.body} cccococooc</Text>)}
        <Text
          onPress={async () => {
            await database12.write(async () => {
              // Find and update the post by its ID
              const postToUpdate = await database12.collections
                .get('posts')
                .find(post.id);

              await postToUpdate.update(updatedPost => {
                updatedPost.title = 'Updated Twdwdwdwdwdwditle'; // Update the title of the post
              });
            });

            // console.log(post.id);
            setBool(!bool);
          }}>
          {post.title} {`${bool}`}
        </Text>
        {/* <Text>{typeof comments}</Text> */}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if post.id or bool has changed
    return (
      prevProps.post.title !== nextProps.post.title
      //   prevProps.bool === nextProps.bool
    );
  },
);

// SearchablePostList Component with TextInput to search posts by title
const SearchablePostList = () => {
  const [partialTitle, setPartialTitle] = useState(''); // State to hold the partialTitle input
  const [bool, setBool] = useState(false);
  useEffect(() => {}, []);
  return (
    <View style={{padding: 20}}>
      {/* TextInput to capture the search query */}
      <TextInput
        placeholder="Enter post title"
        value={partialTitle}
        onChangeText={setPartialTitle} // Update the partialTitle state
        style={{borderWidth: 1, marginBottom: 20, padding: 10}}
      />
      {/* Pass the partialTitle to PostList */}
      <PostList partialTitle={partialTitle} setBool={setBool} bool={bool} />
      {/* The partialTitle is passed to PostList and observed */}
    </View>
  );
};

export default SearchablePostList;
