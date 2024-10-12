import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {database}  from '../dataBase/database';
import { Q } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import Note from '../data/Note'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const PostList = (prp) => {
    console.log(prp.notes[0])
    
    const callback= ()=>{
        return database.collections.get('notes').query().observe().pipe()
    }
    useEffect(()=>{
        callback
    },[prp.notes.length])
  return (
    <View>
      <FlatList
        data={prp.notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item:{_raw} }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>
                {JSON.stringify(Object.keys(_raw))}
                {_raw.id}
                </Text>
          </View>
        )}
      />
    </View>
  );
  
};

// Query the posts and observe the changes
const enhance = withObservables(['notes'], () => ({
    notes: database.collections.get('notes').query().observe().pipe(),
}));

export default enhance(PostList);
