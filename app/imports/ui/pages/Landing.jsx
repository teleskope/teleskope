import React from 'react';
import { Grid, Icon, Header, Button, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Landing extends React.Component {
  render() {
    return (

      <div >
        <Segment id="teleskope-background" attached="top" inverted padded="very" size="large" textAlign="center">
          <Header as="h1" size="huge">TeleSkope</Header>
          <Header as="h2" size="medium">Helping employers find stars</Header>
          <Header as="h3">New?  Choose a role below and register!</Header>
          <Link to={'/signup'} key="StudentSignup">
            <Button>Student</Button>
          </Link>
          <Link to={'/signup'} key="CompanySignup">
            <Button>Company</Button>
          </Link>

          {this.props.currentUser ? (
            [<Link to={'/signup'} key="test1">
              <Button>test 1</Button>
            </Link>,
            <Link to={'/signup'} key="test2">
              <Button>test 2</Button>
            </Link>,
            ]
          ) : ''}

        </Segment>

        <Segment padded="very" basic>
          <Grid container centered stackable columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="star outline" />
              <Header as="h1" >1,000</Header>
              <Header as="h3" >Companies looking for stars</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="connectdevelop" />
              <Header as="h1" >2,000</Header>
              <Header as="h3" >connections made</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="money bill alternate outline" />
              <Header as="h1" >1,210</Header>
              <Header as="h3" >Career opportunities available</Header>

            </Grid.Column>

          </Grid>
        </Segment>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LandingContainer);
