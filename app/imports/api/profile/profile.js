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
    /* Add this back when we figure out how to implement skills
    https://react.semantic-ui.com/modules/dropdown/#types-multiple-selection

    skills: Array[skill_ids],
    OR
    skills:{
      type: String,
      allowedValues: [
        { key: 'angular', text: 'Angular', value: 'angular' },
        { key: 'css', text: 'CSS', value: 'css' },
      ],
    },
     */
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
