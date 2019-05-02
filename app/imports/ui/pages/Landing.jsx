/* eslint-disable max-len */
import React from 'react';
import { Grid, Icon, Header, Button, Segment, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Landing extends React.Component {
  render() {
    return (

      <div>
        <Segment id="teleskope-background" attached="top" inverted padded="very" size="large" textAlign="center">
          <Header as="h1" className='righteous' size='large'>TeleSkope</Header>
          <Header as="h2" size="medium">Helping employers find stars</Header>
          {!Meteor.user() ? ([
            <Link to={'/signup'} key="StudentSignup">
              <Button>{'I\'m a Student'}</Button>
            </Link>,
            <Link to={'/signup'} key="CompanySignup">
              <Button>{'I\'m an Employer'}</Button>
            </Link>,
          ]) : ''}
        </Segment>

        <Segment padded="very" basic>
          <Grid container centered stackable>
            <Grid.Row textAlign='center' columns={3}>
              <Grid.Column textAlign='center'>
                <div style={{ maxWidth: '250px', margin: 'auto' }}>
                  <Image src='images/student.png' centered/>
                  <h3>For Students</h3>
                  <i>{'“Teleskope helped me realize that I have no discernable skills that employers would find ' +
                  'useful!”'}</i>
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center' verticalAlign='middle'>
                <h2><i>Match your skill set with the skills employers are looking for</i></h2>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <div style={{ maxWidth: '250px', margin: 'auto' }}>
                  <Image src='images/company.png' centered/>
                  <h3>For Companies</h3>
                  <i>{'This is the perfect tool to match our hiring managers with passionate compatible candidates.'}
                  </i>
                </div>

              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
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
            </Grid.Row>


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
