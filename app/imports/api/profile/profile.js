import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profiles = new Mongo.Collection('Profiles');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
  owner: { type: String, required: true },
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  website: String,
  socials: { type: Array },
    'socials.$': Object,
    'socials.$.provider': String,
    'socials.$.link': String,
  zipCode: String,
  following: Array,
  'following.$': String,
  skills: Array,
  'skills.$': String,
  summary: String,
  /* Find a way to have user input experiences individually, such as separate fields etc */
  experience: String,
  image: String,
}, { requiredByDefault: false, tracker: Tracker });

Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
