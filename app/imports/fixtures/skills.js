import { Skills } from '/imports/api/skill/skill.js';

/* eslint-disable no-console */
/* eslint-disable max-len */

const defaultSkills = [
  {
    name: 'Machine Learning',
    description: 'Machine learning is a subfield of computer science that evolved from the study of pattern recognition and computational learning theory in artificial intelligence. Machine learning explores the study and construction of algorithms that can learn from and make predictions on data.',
  },
  {
    name: 'Bioinformatics',
    description: 'Bioinformatics is an interdisciplinary field combining computer science, statistics, mathematics, and engineering that develops methods and software tools for understanding biological data.',
  },
  {
    name: 'Data Science',
    description: 'Data science is an interdisciplinary field about processes and systems to extract knowledge or insights from data in various forms, either structured or unstructured.',
  },
  {
    name: 'Graphic Design',
    description: 'Graphic design is the process of visual communication and problem-solving using one or more of typography, photography and illustration.',
  },
];

function addData(data) {
  console.log(`  Adding Skill: ${data.name}`);
  Skills.insert(data);
}

export default function createSkills() {
  /** Initialize the collection if empty. */
  if (Skills.find().count() === 0) {
    if (defaultSkills) {
      console.log('Creating default skills.');
      defaultSkills.map(data => addData(data));
    }
  }
}
