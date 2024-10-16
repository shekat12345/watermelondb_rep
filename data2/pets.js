import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Pets extends Model {
    static table = 'pets';
    static associations = {
      petowners: { type: 'belongs_to', key: 'owner_id' }, // Define association with PetOwners
    };
    @field('name') name; // The content of the comment
  
    // Relationship to the Post model
    @relation('petowners', 'owner_id') petowner; // Foreign key to Post
  }
  