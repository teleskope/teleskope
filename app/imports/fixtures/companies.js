import { Companies } from '/imports/api/company/company.js';
import defaultCompanies from './data/companies';
import defaultJobs from './data/jobs';
import _ from 'underscore';
/* eslint-disable no-console */

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data);
}

function mapJobsToCompanies() {
  const companies = _.map(defaultCompanies, (company) => {
    if (company.jobs.length !== 0) return company;
    const newCompany = company;
    defaultJobs.forEach(job => {
      const newJob = job;
      newJob.zipCode = company.zipCode;
      newJob.date = Date.now();
      newCompany.jobs.push(newJob);
    });
    return company;
  });
  return companies;
}

export default function createCompanies() {
  /** Initialize the collection if empty. */
  if (Companies.find().count() === 0) {
    if (defaultCompanies && defaultJobs) {
      console.log('Creating default companies.');
      const companies = mapJobsToCompanies();
      companies.map(data => addData(data));
    }
  }
}
