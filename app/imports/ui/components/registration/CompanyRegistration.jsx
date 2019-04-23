import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Segment, Form, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


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
        this.props.history.push('/profile');
      }
    });
  }

  render() {
    if (Meteor.UserId) return <Redirect to='/profile' />;

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
        />
        <Form.Input
            label="Email"
            icon="user"
            iconPosition="left"
            name="email"
            type="email"
            placeholder="E-mail address"
            onChange={this.handleChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={this.handleChange}
          />
          <Form.Input
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Input
              label="Address"
              name="address"
              type="text"
              placeholder="Address"
              onChange={this.handleChange}
        />
        <Form.Input
          label="Zip Code"
          name="zipCode"
          type="text"
          placeholder="Zip Code"
          onChange={this.handleChange}
        />
        <Form.Input
            label="Password"
            icon="lock"
            iconPosition="left"
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
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
