import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Companies = new Mongo.Collection('Companies');

const CompanySchema = new SimpleSchema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  website: String,
  summary: String,
  owner: Array,
  'owner.$': String,
}, { tracker: Tracker, requiredByDefault: false });

Companies.attachSchema(CompanySchema);

export { Companies, CompanySchema };
