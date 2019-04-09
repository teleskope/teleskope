import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { UserSchema } from '/imports/api/user/user';

/** Create a Meteor collection. */
const Students = new Mongo.Collection('Students');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudentSchema = new SimpleSchema({
  name: String,
      website: String,
    /* Add this back when we figure out how to implement skills
    skills: Array[skill_ids],
     */
    summary: String,
    /* Find a way to have user input experiences individually, such as separate fields etc */
    experience: String,
}, { tracker: Tracker });

StudentSchema.extend(UserSchema);
Students.attachSchema(StudentSchema);

/** Make the collection and schema available to other code. */
export { Students, StudentSchema };
