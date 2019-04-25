import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profiles = new Mongo.Collection('Profiles');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
    owner: String,
    role: String,
    firstName: String,
    lastName: String,
    website: String,
    skills: [String],
    summary: String,
    /* Find a way to have user input experiences individually, such as separate fields etc */
    experience: String,
    /* TODO: profile image
    image: String,
     */
}, { requiredByDefault: false, tracker: Tracker });

Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
