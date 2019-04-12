import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/company.js';

// /** Initialize the database with a default data document. */
// function addData(data) {
//   console.log(`  Adding: ${data.companyName} (${data.password})`);
//   Companies.insert(data);
// }

// /** Initialize the collection if empty. */
// if (Companies.find().count() === 0) {
//   if (Meteor.settings.defaultCompanies) {
//     console.log('Creating default companies.');
//     Meteor.settings.defaultCompanies.map(data => addData(data));
//   }
// }

Meteor.publish('Companies', function publish() {
  return Companies.find();
});
