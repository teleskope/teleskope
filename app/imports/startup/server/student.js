import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/student/student';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Students.insert(data);
}

/** Initialize the collection if empty. */
if (Students.find().count() === 0) {
  if (Meteor.settings.defaultStudents) {
    console.log('Creating default students.');
    Meteor.settings.defaultStudents.map(data => addData(data));
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
