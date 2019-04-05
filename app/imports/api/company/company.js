import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { UserSchema } from '/imports/api/user/user';

/** Create a Meteor collection. */
const Companies = new Mongo.Collection('Companies');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CompanySchema = new SimpleSchema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  website: String,
  summary: String,
}, { tracker: Tracker });

CompanySchema.extend(UserSchema);
Companies.attachSchema(CompanySchema);

/** Make the collection and schema available to other code. */
export { Companies, CompanySchema };
