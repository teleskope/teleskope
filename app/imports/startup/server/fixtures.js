import createCompanies from '/imports/fixtures/companies.js';
import createUsers from './accounts.js';

const runFixtures = function () {
  const shouldRun = Meteor.users.find().count() === 0;
  if (shouldRun) {
      createUsers();
      createCompanies();
  }
};

// if (!Meteor.isDevelopment) {
  runFixtures();
// }