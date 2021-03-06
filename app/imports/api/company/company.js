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
  owners: { type: Array, required: true },
  image: String,
  'owners.$': String,
  socials: { type: Array },
  'socials.$': Object,
  'socials.$.provider': String,
  'socials.$.link': String,
  jobs: { type: Array },
    'jobs.$': Object,
    'jobs.$.title': String,
    'jobs.$.employmentType': {
      type: String,
      allowedValues: ['Full Time', 'Part Time'],
      defaultValue: 'Full Time',
    },
    'jobs.$.date': String,
    'jobs.$.description': String,
    'jobs.$.zipCode': String,
    'jobs.$.requirements': String,
    'jobs.$.skills': Array,
    'jobs.$.skills.$': String,
  notifications: { type: Array },
    'notifications.$': Object,
    'notifications.$.datetime': Date,
    'notifications.$.content': String,
}, { tracker: Tracker, requiredByDefault: false });

Companies.attachSchema(CompanySchema);

export { Companies, CompanySchema };
