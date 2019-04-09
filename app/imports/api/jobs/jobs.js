import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Jobs = new Mongo.Collection('Jobs');

/** Create a schema to constrain the structure of documents associated with this collection. */
const JobsSchema = new SimpleSchema({
  title: String,
      employmentType: {
  type: String,
      allowedValues: ['Full Time', 'Part Time'],
      defaultValue: 'Full Time',
  },
  date: String,
      description: String,
    location: String,
    /* Add this back in when we figure out how to implement skills
     skills: Array[skill_ids],
     */
    requirements: String,
    companyID: String,
}, { tracker: Tracker });

Jobs.attachSchema(JobsSchema);

/** Make the collection and schema available to other code. */
export { Jobs, JobsSchema };
