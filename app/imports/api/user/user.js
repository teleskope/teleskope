import SimpleSchema from 'simpl-schema';

/** Create a Meteor collection. */


/** Create a schema to constrain the structure of documents associated with this collection. */
const UserSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  linkedin: String,
  twitter: String,
  github: String,
  image: String,

});


/** Make the collection and schema available to other code. */
export { UserSchema };
