import { Meteor } from 'meteor/meteor';
import { Companies } from '/imports/api/company/company.js';
import defaultCompanies from './data/companies';
/* eslint-disable no-console */

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data, (err, id) => Meteor.call('addNotification', id, `${data.name} has joined Teleskope!`));
}

export default function createCompanies() {
  /** Initialize the collection if empty. */
  if (Companies.find().count() === 0) {
    if (defaultCompanies) {
      console.log('Creating default companies.');
      defaultCompanies.map(data => addData(data));
    }
  }
}
