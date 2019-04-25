import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Segment, Form, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';


export default class CompanyRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      companyName: '',
      address: '',
      zipCode: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  // TODO: reimplement handleSubmit
  handleSubmit() {
    const { email, password, companyName, address, zipCode, firstName, lastName } = this.state;
    const reportError = (error, callback) => {
      if (callback) {
        callback(error);
      } else {
        throw error;
      }
    };

    if (!companyName) {
      reportError(new Meteor.Error(400, 'Company Name fields may not be empty'), (err) => {
        if (err) {
          this.setState({ error: err.reason });
        }
      });
    } else if (!firstName || !lastName) {
      reportError(new Meteor.Error(400, 'Name fields may not be empty'), (err) => {
        if (err) {
          this.setState({ error: err.reason });
        }
      });
    } else if (!address || !zipCode) {
      reportError(new Meteor.Error(400, 'Address fields may not be empty'), (err) => {
        if (err) {
          this.setState({ error: err.reason });
        }
      });
    } else if (zipcodes.lookup(zipCode) == null) {
      reportError(new Meteor.Error(400, 'ZIP code doesn\'t exist'), (err) => {
        if (err) {
          this.setState({ error: err.reason });
        }
      });
    } else {
      const company = {
        name: companyName,
        address,
        zipCode,
      };

      const profile = {
        firstName,
        lastName,
      };

      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          Meteor.call('addUserRoleCompany');
          Meteor.call('createUserProfile', profile);
          Meteor.call('createUserCompany', company);
          // this.props.history.push('/profile');
        }
      });
    }
  }

  render() {
    // if (Meteor.userId()) return <Redirect to='/profile' />;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input
                label="Company Name"
                icon="building"
                iconPosition="left"
                name="companyName"
                type="text"
                placeholder="Company Name"
                onChange={this.handleChange}
                required
            />
            <Form.Input
                label="Email"
                icon="user"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={this.handleChange}
                required
            />
            <Form.Group widths='equal'>
              <Form.Input fluid
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  required
              />
              <Form.Input fluid
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  required
              />
            </Form.Group>
            <Form.Input
                  label="Address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  onChange={this.handleChange}
                  required
            />
            <Form.Input
              label="Zip Code"
              name="zipCode"
              type="text"
              placeholder="ZIP Code"
              onChange={this.handleChange}
              required
            />
            <Form.Input
                label="Password"
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                required
            />
            <Form.Button content="Submit"/>
          </Segment>
        </Form>
          {this.state.error === '' ? ('') :
          (
            <Message
              error
              header="Registration was not successful"
              content={this.state.error}
            />
          )}
      </React.Fragment>
    );
  }
}

CompanyRegistration.propTypes = {
  history: PropTypes.object,
};
