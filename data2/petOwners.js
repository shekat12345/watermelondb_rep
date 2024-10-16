import { Model } from "@nozbe/watermelondb";
import { children, field } from "@nozbe/watermelondb/decorators";

export default class PetOwners extends Model {
    static table = 'petowners';
    static associations = {
      pets: { type: 'has_many', foreignKey: 'owner_id' }, // Define association with Pets
    };
    @field('name') name; // Title of the post
    @field('age') age; // Title of the post
    
    // One-to-many relationship with comments
    @children('pets') pets; 
    
  }