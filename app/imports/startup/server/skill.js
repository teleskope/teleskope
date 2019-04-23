import { Meteor } from 'meteor/meteor';
import { Skills } from '../../api/skill/skill';

/* eslint-disable no-console */

Meteor.publish('Skills', function publish() {
  return Skills.find();
});
