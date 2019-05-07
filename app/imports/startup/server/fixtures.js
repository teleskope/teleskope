import { Meteor } from 'meteor/meteor';
import createCompanies from '../../fixtures/companies.js';
import createUsers from './accounts.js';
import createSkills from '../../fixtures/skills.js';
import createJobs from '../../fixtures/jobs.js';

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
