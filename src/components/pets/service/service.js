import {database13} from '../../../../data2/database';
import eventEmitter, {emmitersList} from './emitter';

export async function getPets(actionFunction) {
  const petsCollection = database13.collections.get('petowners'); // Get the collection
  const allPets = await petsCollection.query().fetch(); // Fetch all pets
  //   console.log(allPets); // Print the pets

  actionFunction(allPets);
  //   return allPets;
}
export async function getowners(actionFunction) {
  const petsCollection = database13.collections.get('petowners'); // Get the collection
  const allPets = await petsCollection.query().fetch(); // Fetch all pets
  //   console.log(allPets); // Print the pets

  actionFunction(allPets);
  //   return allPets;
}
export async function addNewPet(actionFunction) {
  //   const petsCollection = database13.collections.get('pets'); // Get the collection
  //   const allPets = await petsCollection.query().fetch(); // Fetch all pets
  //   console.log(allPets); // Print the pets
  //   eventEmitter.emit(emmitersList.updateDataBase)
  // actionFunction([]);
  //   return allPets;
  try {
    await database13.write(async () => {
        const petsCollection = database13.collections.get('pets'); // Get the pets collection
    
        // Add a new pet record
        await petsCollection.create(pet => {
          pet.name = 'Rio the dog'; // Set the pet's name
          //   pet.type = type;  // Set the pet's type (e.g., dog, cat)
          //   pet.age = 12;    // Set the pet's age
        });
        eventEmitter.emit(emmitersList.updateDataBase);
      });
  } catch (error) {
    alert (error)
  }
}
export async function addNewOwner(actionFunction) {
  //   const petsCollection = database13.collections.get('pets'); // Get the collection
  //   const allPets = await petsCollection.query().fetch(); // Fetch all pets
  //   console.log(allPets); // Print the pets
  //   eventEmitter.emit(emmitersList.updateDataBase)
  // actionFunction([]);
  //   return allPets;
  try {
    await database13.write(async () => {
        const petsCollection = database13.collections.get('petowners'); // Get the pets collection
    
        // Add a new pet record
       let newOwner= await petsCollection.create(owner => {
          owner.name = 'erfan ghaffari'; // Set the pet's name
          owner.age = 40
          //   pet.type = type;  // Set the pet's type (e.g., dog, cat)
          //   pet.age = 12;    // Set the pet's age
        });
        const petsData = [
          { name: 'Rex' }, 
          { name: 'Bella' }
        ]; // Replace with your dynamic list of pets
      
        for (const petData of petsData) {
          await database13.get('pets').create(pet => {
            pet.name = petData.name;
            pet.owner_id = newOwner.id; // This links the pet to the newly created owner
          });
        }

        eventEmitter.emit(emmitersList.updateDataBase);
      });
  } catch (error) {
    alert (error)
  }
}


export async function addOwnerWithPets(ownerData, petsData) {

  await database13.write(async () => {
    // Step 1: Create a new owner
    const newOwner = await database13.get('petowners').create((owner) => {
      owner.name = ownerData.name;  // e.g., 'John Doe'
      owner.age = ownerData.age;    // e.g., 45
    });

    // Step 2: Create pets associated with the new owner
    alert('called')
    await Promise.all(
      petsData.map(async (petData) => {
        console.log("added")
        await database13.get('pets').create((pet) => {
          pet.name = "petData.name";        // e.g., 'Rex', 'Bella'
          pet.owner_id = newOwner.id;     // Link the pet to the newly created owner
        });
      })
    );
  });
}

// Example usage



export async function fetchPetOwnersWithPets() {
  // Fetch all pet owners
  try {
    const petOwners = await database13.get('pets').query().fetch();

  // Loop through each pet owner and fetch their pets
  const ownersWithPets = await Promise.all(
    petOwners.map(async (owner) => {
      const pets = await owner.pets.fetch(); // Fetch the associated pets for this owner
      // console.log()
      console.log(pets)
      
      return {
        owner: owner.name,
        age: owner.age,
        pets: pets.map(pet => pet.name), // Get pet names or other details as needed
      };
    })
  );
  // console.log (ownersWithPets)
  return ownersWithPets;
  } catch (error) {
    console.log (error)
  }
}
