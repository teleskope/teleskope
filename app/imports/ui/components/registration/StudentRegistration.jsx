import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Form, Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';


export default class StudentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /**  TODO: Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, firstName, lastName } = this.state;
    const profile = {
      firstName,
      lastName,
    };
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Meteor.call('createUserProfile', profile);
        this.props.history.push('/profile');
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Segment stacked>
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
              <Form.Input fluid
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
              />
              <Form.Input fluid
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
              />
            </Form.Group>
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

StudentRegistration.propTypes = {
  history: PropTypes.object,
};
