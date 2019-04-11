import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';

export default class CompanyRegistration extends Component {
  render() {
    return (
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
    );
  }
}
