import { Meteor } from 'meteor/meteor';
import createCompanies from '/imports/fixtures/companies.js';
import createUsers from './accounts.js';

const runFixtures = function () {
  const shouldRun = Meteor.users.find().count() === 0;
  if (shouldRun) {
      createUsers();
      createCompanies();
  }
};

// TODO: determine when to run it for prod
// if (!Meteor.isDevelopment) {
  runFixtures();
// }
