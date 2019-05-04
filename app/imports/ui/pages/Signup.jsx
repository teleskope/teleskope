import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, Grid, Header, Message, Button } from 'semantic-ui-react';
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
      companyReg: false,
    };
  }

  toggleRegistrationType = () => {
    this.setState({ companyReg: !this.state.companyReg });
  };

  switchRegistration() {
    const { companyReg } = this.state;
    let icon;
    let text;
    let color;
    if (companyReg) {
      icon = 'student';
      text = 'Switch to Student registration';
      color = 'blue';
    } else {
      icon = 'building';
      text = 'Switch to Company registration';
      color = 'green';
    }
    return (
      <Button onClick={this.toggleRegistrationType} color={color} icon labelPosition='left' fluid>
        <Icon name={icon} />
        {text}
      </Button>
    );
  }

  /** Display the signup form. */
  render() {
    const switchButton = this.switchRegistration();
    const registrationForm = this.state.companyReg
      ? <CompanyRegistration />
      : <StudentRegistration />;

    return (
        <Container style={{ marginTop: '80px' }}>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                {this.state.companyReg ? 'Company Registration' : 'Student Registration'}
              </Header>
                {registrationForm}
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>

              <div>
                {switchButton}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
