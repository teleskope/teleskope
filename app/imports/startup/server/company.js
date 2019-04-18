import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
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
    check(data, Object);
    check(data.name, String);
    check(data.address, String);
    check(data.zipCode, String);
    // check(data.zipCode, String);
    // TODO: Validation of inserted company data and cleaning of specialchars
    const company = data;
    company.owner = Meteor.user().emails[0].address;
    Companies.insert(company);
  },
});
