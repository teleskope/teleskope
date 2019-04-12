import React, { Component } from 'react';
// import { Accounts } from 'meteor/accounts-base';
import { Segment, Form, Message } from 'semantic-ui-react';

export default class CompanyRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      companyName: '',
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
    // const { email, password, name } = this.state;
    // Accounts.createUser({ email, username: email, password }, (err) => {
    //   if (err) {
    //     this.setState({ error: err.reason });
    //   } else {
    //     // browserHistory.push('/login');
    //   }
    // });
  }

  render() {
    return (
  <React.Fragment>
    <Form onSubmit={this.handleSubmit}>
      <Segment stacked>
        <Form.Input
            label="Company Name"
            icon="user"
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
