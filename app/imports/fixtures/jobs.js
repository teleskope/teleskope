import { Companies } from '/imports/api/company/company.js';

const defaultJobs = [
  {
    title: 'Software Engineer',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Engineer Software',
    zipCode: '96706',
    requirements: 'Software Engineering ability',
    companyName: 'Microsoft',
  },
  {
    title: 'Data Scientist',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Do Science with Data',
    zipCode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field',
    companyName: 'Apple',
  },
  {
    title: 'Database Architect',
    employmentType: 'Part Time',
    date: '12/25/2009',
    description: 'Create and maintain huge databases',
    zipCode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field',
    companyName: 'Apple',
  },
  {
    title: 'Full Stack Developer',
    employmentType: 'Full Time',
    date: '12/25/2009',
    description: 'Engineer High-quality UI and back-end web apps',
    zipCode: '96706',
    requirements: 'Bachelors Degree in Mathematics, Computer Science, or a related field',
    companyName: 'Microsoft',
  },
];

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data);
}

export default function createCompanies() {
  /** Initialize the collection if empty. */
  if (Companies.find().count() === 0) {
    if (defaultJobs) {
      console.log('Creating default companies.');
      defaultJobs.map(data => addData(data));
    }
  }
}
