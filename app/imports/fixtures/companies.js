import { Companies } from '/imports/api/company/company.js';
import defaultCompanies from './data/companies';
import defaultJobs from './data/jobs';
import _ from 'underscore';
/* eslint-disable no-console */

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data);
}

// randomly assigns 2-3 jobs per company with company and job zip same
function mapJobsToCompanies() {
  const companies = _.map(defaultCompanies, (company) => {
    if (company.jobs.length !== 0) return company;

    const newCompany = { ...company };
    const zip = newCompany.zipCode;
    const num = Math.floor(Math.random() * 4) + 1;
    const randjobs = _.shuffle(defaultJobs).slice(0, num);

    randjobs.forEach(job => {
      const newJob = { ...job };
      newJob.zipCode = zip;
      newJob.date = Date.now();
      newCompany.jobs.push(newJob);
    });
    return newCompany;
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
