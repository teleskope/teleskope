import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Companies } from '../../api/company/company.js';

Meteor.publish('Companies', function publish() {
  return Companies.find();
});


Meteor.methods({
  addUserRoleCompany: function () {
    if (!this.userId) throw new Meteor.Error('403', 'Access Denied', 'You must be logged in');
    Roles.addUsersToRoles(this.userId, 'company');
  },
  createUserCompany: function (data) {
    // TODO: Validation of inserted company data
    let company = data;
    company.owner = this.userId;
    Companies.insert(company);
  },
});
