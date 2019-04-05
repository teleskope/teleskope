import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/company.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Companies.insert(data);
}

/** Initialize the collection if empty. */
if (Companies.find().count() === 0) {
  if (Meteor.settings.defaultCompanies) {
    console.log('Creating default companies.');
    Meteor.settings.defaultCompanies.map(data => addData(data));
  }
}

// /** This subscription publishes only the documents associated with the logged in user */
// Meteor.publish('Company', function publish() {
//   if (this.userId) {
//     const username = Meteor.users.findOne(this.userId).username;
//     return Companies.find({ owner: username });
//   }
//   return this.ready();
// });
