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
    company.website = '';
    company.summary = '';
    company.image = 'images/defaultCompany.jpg';
    company.socials = [];
    company.notifications = [];
    company.jobs = [];
    company.owners = [Meteor.user().emails[0].address];
    Companies.insert(company, (err, id) => Meteor.call('addNotification', id, `${company.name} has joined Teleskope!`));
  },

  addNotification: function (company_id, message) {
    check(company_id, String);
    check(message, String);

    const notification = {
      datetime: Date.now(),
      content: message,
    };

    Companies.update(company_id, { $push: { notifications: notification } });
  },

});
