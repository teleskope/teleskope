import { Companies } from '/imports/api/company/company.js';

const defaultJobs = {
  {
    title: 'Software Engineer',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Engineer Software',
    zipcode: '96706',
    requirements: 'Software Engineering ability',
    companyID: 'Microsoft'
  },
  {
    title: 'Data Scientist',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Do Science with Data',
    zipcode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field'',
    companyID: 'Apple'
  },
  {
    title: 'Database Architect',
    employmentType: 'Part Time',
    date: '12/25/2009',
    description: 'Create and maintain huge databases',
    zipcode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field'',
    companyID: 'Apple'
  },
  {
    title: 'Full Stack Developer',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Engineer High-quality UI and back-end web apps',
    zipcode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field'',
    companyID: 'Microsoft'
  }

}

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data);
}

export default function createCompanies() {
  /** Initialize the collection if empty. */
  if (Companies.find().count() === 0) {
    if (defaultCompanies) {
      console.log('Creating default companies.');
      defaultCompanies.map(data => addData(data));
    }
  }
}
