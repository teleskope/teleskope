import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName} (${data.email})`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultStudents) {
    console.log('Creating default students.');
    Meteor.settings.defaultStudents.map(data => addData(data));
  }
}

/** This subscription publishes all the documents regardless of the user */
Meteor.publish('Students', function publish() {
  return Students.find();
});
