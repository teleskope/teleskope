import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import { Companies } from '/imports/api/company/company.js';
import defaultJobs from './data/jobs';
/* eslint-disable no-console */

export default function createJobs() {
  /** Initialize the collection if empty. */
    if (defaultJobs) {
      console.log('Creating randomized default Jobs.');
      const defaultCompanies = Companies.find().fetch();
      // eslint-disable-next-line consistent-return
      _.map(defaultCompanies, (company) => {
        if (company.jobs.length !== 0) return company;

        const num = Math.floor(Math.random() * 4) + 1;
        const randjobs = _.shuffle(defaultJobs).slice(0, num);

        randjobs.forEach(job => {
          Meteor.call('addJob', company._id, job);
        });
      });
    }
}
