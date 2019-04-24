import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs';

// /** Initialize the database with a default data document. */
// function addData(data) {
//   console.log(`  Adding: ${data.title} (${data.employmentType})`);
//   Jobs.insert(data);
// }
//
// /** Initialize the collection if empty. */
// if (Jobs.find().count() === 0) {
//   if (Meteor.settings.defaultJobs) {
//     console.log('Creating default Jobs.');
//     Meteor.settings.defaultJobs.map(data => addData(data));
//   }
// }

/** This subscription publishes all the documents regardless of the user */
Meteor.publish('Jobs', function publish() {
  return Jobs.find();
});
