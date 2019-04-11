import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

export default class StudentRegistration extends Component {
  render() {
    return (
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
    )
  }
}
