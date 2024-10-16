import React, {useEffect, useState} from 'react';
import {Button, FlatList, Pressable, Text, View} from 'react-native';

import {BehaviorSubject} from 'rxjs';
import database from '../database';
import {
  getComment,
  getCommentsForPost,
  insertAcomment,
  insertNewComment,
} from '../../services/Postservices';

const PostsList = ({value}) => {
  const [posts, setPosts] = useState([]);

  // Function to subscribe to posts observable
  const observePosts = () => {
    const postsCollection = database.collections.get('posts');

    // Observe the posts collection and subscribe to the updates
    const subscription = postsCollection
      .query() // Query to fetch posts
      .observe() // Observe the query, returning an observable
      .subscribe(allPosts => {
        setPosts(allPosts); // Update the state with the new list of posts
      });

    return subscription; // Return the subscription to allow unsubscribing later
  };

  useEffect(() => {
    const subscription = observePosts(); // Subscribe to the observable when the component mounts

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    };
  }, []);

  // Function to render each post in the FlatList
  const renderPost = ({item}) => (
    <Pressable
      onPress={async () => {
        insertNewComment(item.id, value);
        // alert (item.id)
      }}>
      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#ddd'}}>
        <Text style={{fontSize: 18}}>
          {item.title} sxsx {item.id}
        </Text>
        <Button
          title="Get comments"
          onPress={() => {
            getCommentsForPost(item.id);
          }}
        />
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id} // Use post id as the key
      renderItem={renderPost} // Render each post
    />
  );
};

export default PostsList;
