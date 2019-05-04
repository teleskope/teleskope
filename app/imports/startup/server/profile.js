import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/profile';


/* eslint-disable no-console */
/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName}`);
  const profile = data;
  if (!profile.socials) {
    profile.socials = [];
  }
  Profiles.insert(profile);
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
    profile.website = '';
    profile.zipCode = '';
    profile.socials = [];
    // const providers = ['linkedin', 'github', 'twitter'];
    // providers.map((provider) => profile.socials.push({ provider: `${provider}`, link: '' }));
    profile.skills = [];
    profile.experience = '';
    profile.summary = '';
    profile.image = 'https://apod.nasa.gov/apod/image/1905/photo95cielaustral1024.jpg';
    profile.owner = Meteor.user().emails[0].address;
    profile.role = Roles.userIsInRole(Meteor.userId(), ['company']) ? 'company' : 'student';
    profile.following = [];
    Profiles.insert(profile);
  },

  followCompany: function (id) {
    check(id, String);
    const email = Meteor.user().emails[0].address;
    const profile = Profiles.findOne({ owner: email });
    Profiles.update(profile._id, { $push: { following: id } });
  },

  unfollowCompany: function (id) {
    check(id, String);
    const email = Meteor.user().emails[0].address;
    const profile = Profiles.findOne({ owner: email });
    Profiles.update(profile._id, { $pull: { following: id } });
  },

  updateUserSkills: function (skills) {
    check(skills, Array);
    const email = Meteor.user().emails[0].address;
    const profile = Profiles.findOne({ owner: email });
    Profiles.update(profile._id, { $set: { skills: skills } });
  },
});

if (Meteor.isServer) {
/** This subscription publishes all the documents regardless of the user */
  Meteor.publish('Profiles', function publish() {
    return Profiles.find();
  });

  Meteor.publish('UserProfile', function publish() {
    if (this.userId) {
      const email = Meteor.user().username;
      return Profiles.find({ owner: email });
    }
    return this.ready();
  });
}
