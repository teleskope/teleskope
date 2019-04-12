import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/company.js';

Meteor.publish('Companies', function publish() {
  return Companies.find();
});
