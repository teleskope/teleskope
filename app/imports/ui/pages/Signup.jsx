import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import CompanyRegistration from '../components/registration/CompanyRegistration';
import StudentRegistration from '../components/registration/StudentRegistration';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      companyReg: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleRegistrationType = () => {
    this.setState({ companyReg: !this.state.companyReg });
  };

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
      }
    });
  }

  switchRegistration() {
    let button;
    if (this.state.companyReg) {
        button = <Button onClick={this.toggleRegistrationType} color='green'>
          Switch to company registration
        </Button>;
    } else {
        button = <Button onClick={this.toggleRegistrationType} color='blue'>
          Switch to Student registration
        </Button>;
    }
    return button;
  }

  /** Display the signup form. */
  render() {
    const switchButton = this.switchRegistration();
    const registrationForm = this.state.companyReg
      ? <CompanyRegistration />
      : <StudentRegistration />;

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              {registrationForm}
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
              <div>
                {switchButton}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
