import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
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

Meteor.methods({
  addUserRoleStudent: function () {
    if (!this.userId) throw new Meteor.Error('403', 'Access Denied', 'You must be logged in');
    Roles.addUsersToRoles(this.userId, 'student');
  },
  createUserProfile: function (data) {
    console.log(data);
    check(data, Object);
    check(data.firstName, String);
    check(data.lastName, String);
    // TODO: Validation of inserted company data and cleaning of specialchars
    const profile = data;
    profile.owner = Meteor.user().emails[0].address;
    profile.role = Roles.userIsInRole(Meteor.userId(), ['company']) ? 'company' : 'student';
    Profiles.insert(profile);
  },

  followCompany: function (companyId) {
    console.log(companyId);
    // check(companyId, String);
    // const profile = async () => {
    //   const email = Meteor.user().emails[0].address;
    //   await Profiles.find({ owner: email });
    // };
    
    // Profiles.update(profile, { $addToSet: { 'following.$': companyId } });
  },
});


/** This subscription publishes all the documents regardless of the user */
Meteor.publish('Profiles', function publish() {
  return Profiles.find();
});

Meteor.publish('UserProfile', function publish() {
  return Profiles.find({ owner: this.user().emails[0].address });
});
