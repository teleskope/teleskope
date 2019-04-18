import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';

/* eslint-disable no-console */
/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName}`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. Load per user. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addData(data));
  }
}

/** This subscription publishes all the documents regardless of the user */
Meteor.publish('Profiles', function publish() {
  return Profiles.find();
});

Meteor.publish('UserProfile', function publish() {
  return Profiles.find({ owner: this.user().email });
});
