import { Companies } from '/imports/api/company/company.js';

const defaultCompanies = [
  {
    owner: ['microsoft@example.com'],
    name: 'Microsoft',
    address: 'One Microsoft Way',
    zipCode: '98052',
    website: 'https://www.microsoft.com',
    summary: 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and related services.',
  },
  {
    owner: ['apple@example.com'],
    name: 'Apple',
    address: 'One Apple Way',
    zipCode: '95015',
    website: 'https://www.apple.com',
    summary: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Four of technology along with Amazon, Google, and Facebook.',
  },
];

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
