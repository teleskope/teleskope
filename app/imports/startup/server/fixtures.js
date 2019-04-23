import { Meteor } from 'meteor/meteor';
import createCompanies from '/imports/fixtures/companies.js';
import createUsers from './accounts.js';
import createJobs from './job.js';

const runFixtures = function () {
  const shouldRun = Meteor.users.find().count() === 0;
  if (shouldRun) {
      createUsers();
      createCompanies();
      createJobs();
  }
};

// TODO: determine when to run it for prod
// if (!Meteor.isDevelopment) {
  runFixtures();
// }
