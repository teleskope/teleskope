import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });

  switch (role) {
    case 'admin':
      Roles.addUsersToRoles(userID, 'admin');
      break;
    case 'company':
      Roles.addUsersToRoles(userID, 'company');
      break;
    default:
      Roles.addUsersToRoles(userID, 'student');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
export default function createUsers() {
  if (Meteor.users.find().count() === 0) {
    if (Meteor.settings.defaultAccounts) {
      console.log('Creating the default user(s)');
      Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
    } else {
      console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
    }
  }
}
