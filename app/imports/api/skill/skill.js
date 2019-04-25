import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Skills = new Mongo.Collection('Skills');
/** Create a schema to constrain the structure of documents associated with this collection. */
const SkillSchema = new SimpleSchema({
  name: String,
  description: String,
  owners: { type: [String], required: false },
}, { tracker: Tracker });

Skills.attachSchema(SkillSchema);

/** Make schema available to other code. */
export { Skills, SkillSchema };
