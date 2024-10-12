import { database12 } from '../../data2/database'; // Your WatermelonDB database
import { Q } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

// Function to observe posts by similar title
export function observePostsBySimilarTitle(partialTitle) {
  return database12.collections
    .get('posts')
    .query(Q.where('title', Q.like(`%${partialTitle}%`))) // Query posts where the title matches the partialTitle
    .observe(); // Observe the changes in the posts collection
}

// Higher-order component with reactive observables
const enhance = withObservables(['partialTitle'], ({ partialTitle }) => ({
  posts: observePostsBySimilarTitle(partialTitle), // Pass the reactive posts observable
}));

// PostList Component to display posts in a FlatList
const PostList = enhance(({ posts }) => (
  <FlatList
    data={posts} // The observed data is passed to the FlatList
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <PostItem post={item} /> // Render each post using the PostItem component
    )}
  />
));

// PostItem Component to render a post and update its title
const PostItem = ({ post }) => {
  return (
    <View>
      {/* Display the current post title */}
      <Text>{post._raw.title}</Text>

      {/* Button to update the post title */}
      <Text
        onPress={async () => {
          try {
            // WatermelonDB requires a write action to update records
            await database12.write(async () => {
              // Find and update the post by its ID
              const postToUpdate = await database12.collections.get('posts').find(post.id);
              
              await postToUpdate.update(updatedPost => {
                updatedPost.title = 'Updated Title'; // Update the title of the post
              });
            });

            console.log('Post updated successfully');
          } catch (error) {
            console.error('Error updating post:', error);
          }
        }}>
        Update Post Title
      </Text>
    </View>
  );
};

// SearchablePostList Component with TextInput to search posts by title
const SearchablePostList = () => {
  const [partialTitle, setPartialTitle] = useState(''); // State to hold the partialTitle input

  return (
    <View style={{ padding: 20 }}>
      {/* TextInput to capture the search query */}
      <TextInput
        placeholder="Enter post title"
        value={partialTitle}
        onChangeText={setPartialTitle} // Update the partialTitle state
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      
      {/* Pass the partialTitle to PostList */}
      <PostList partialTitle={partialTitle} />
    </View>
  );
};

export default SearchablePostList;
