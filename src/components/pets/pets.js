import {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import eventEmitter, {emmitersList} from './service/emitter';
import {addNewOwner, addNewPet, addOwnerWithPets, fetchPetOwnersWithPets, getPets, getowners} from './service/service';
import {database13} from '../../../data2/database';
import { Q } from '@nozbe/watermelondb';

const Pets = () => {
  const [data, setData] = useState([]);
  const action = e => {
    setData(e);
    console.log(e);
  };
  const Listener = () => {
    getPets(action);
  };
  useEffect(() => {
    eventEmitter.on(emmitersList.updateDataBase, Listener);
    return () => {
      eventEmitter.removeListener(emmitersList.updateDataBase, Listener);
      setData(null);
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => {
          // addNewPet();
          const ownerData = {
            name: 'John Doe',
            age: 45,
          };
          
          const petsData = [
            { name: 'Rex' },
            { name: 'Bella' },
          ];
          addOwnerWithPets(ownerData, petsData).then((e)=>{console.log(e,"ededed")})
        }}
        title="Press me to add new data in data base"
      />
      <Button
        onPress={async() => {
          // addNewOwner();
          // var elrt =(e)=>{
          //   // console.log(e.map())
          //   e.map((itemm)=>{console.log(itemm.owner_id)})
          // }
          // getowners(elrt)
          try {
            await fetchPetOwnersWithPets()
          } catch (error) {
            console.log (error)
          }
          
        }}
        title="Press me to check data"
      />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <Text
            onPress={async () => {
              const petsCollection = await database13.collections
                .get('pets').query()
                 // Filter pets by the owner_id
                .fetch();
                // petsCollection.map((item1)=>{
                  console.log(petsCollection.filter((item1)=>item1.owner_id === item.id).length)
                // })
            }}>
            dede
          </Text>
        )}
      />
    </View>
  );
};
export default Pets;
