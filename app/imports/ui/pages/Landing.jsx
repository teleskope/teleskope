import React from 'react';
import { Grid, Icon, Header, Button, Segment, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
//import logo from '../../../public/images/TeleSKOPE.png';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

      <div >
        <Segment id="teleskope-background" attached="top" inverted padded="very" size="large" textAlign="center">
          <Header as="h1" size="huge">TeleSkope</Header>
            {/*<Image src="images/TeleSKOPE.png" size='medium' />*/}
          <Header as="h2" size="medium">Helping employers find stars</Header>
          <Header as="h3">New?  Choose a role below and register!</Header>
          <Button as={NavLink} exact to="/signup" key='StudentSignup'>Student</Button>
          <Button as={NavLink}  exact to="/signup" key='CompanySignup'>Company</Button>
          {this.props.currentUser ? (
            [<Button as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Button>,
              <Button as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Button>,
              <Button as={NavLink} activeClassName="active" exact to="/test" key='test'>Textbook</Button>]

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

export default withRouter(LandingContainer);
