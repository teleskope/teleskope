import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs';

/** This subscription publishes all the documents regardless of the user */
Meteor.publish('Jobs', function publish() {
  return Jobs.find();
});
