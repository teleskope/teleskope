import { Meteor } from 'meteor/meteor';
import createCompanies from '/imports/fixtures/companies.js';
import createUsers from './accounts.js';
import createJobs from '/imports/fixtures/jobs.js';
import createSkills from '../../fixtures/skills.js';

const runFixtures = function () {
  const shouldRun = Meteor.users.find().count() === 0;
  if (shouldRun) {
      createUsers();
      createCompanies();
      createSkills();
      createJobs();
  }
};

// TODO: determine when to run it for prod
// if (!Meteor.isDevelopment) {
  runFixtures();
// }
