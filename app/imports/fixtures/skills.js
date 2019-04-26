import { Skills } from '/imports/api/skill/skill.js';
import defaultSkills from './Data/skills';

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
