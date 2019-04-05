import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a schema to constrain the structure of documents associated with this collection. */
const UserSchema = new SimpleSchema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  linkedin: String,
  twitter: String,
  github: String,
  image: String,

}, { requiredByDefault: false, tracker: Tracker });


/** Make schema available to other code. */
export { UserSchema };
