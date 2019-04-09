import React from 'react';
import { Grid, Icon, Header, Divider, Menu, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

      <div >
        <div className="teleskope-landing-background">
          <Grid verticalAlign='middle' textAlign='center' container  >
            <Grid.Column width={8}>
              <Header as="h1" >Teleskope</Header>
              <Header as="h2" >Helping employers find stars</Header>
                <Button as={NavLink} activeClassName="active" exact to="/StudentSignup" key='signup'>Student</Button>,
                <Button as={NavLink} activeClassName="active" exact to="/CompanySignup" key='signup'>Company</Button>,
                {this.props.currentUser ? (
                    [<Button as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Button>,
                      <Button as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Button>,
                      <Button as={NavLink} activeClassName="active" exact to="/test" key='test'>Textbook</Button>]

                ) : ''}
            </Grid.Column>
          </Grid>
        </div>
        <div>
          <Grid container centered stackable columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="users" />
              <Header as="h1" >Multiple Users</Header>
              <Header as="h3" >This address book enables any number of users to register and save their business
                contacts.  You can only see the business contacts you have created</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="file alternate" />
              <Header as="h1" >Contact Details</Header>
              <Header as="h3" >For each contact you can save their name, address, and phone number.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name="checked calendar" />
              <Header as="h1" >Timestamped Notes</Header>
              <Header as="h3" >Each time you make contact with a contact, you can write a note that summarizes
                the conversation.  This note is saved along with a timestamp with a contact.</Header>

            </Grid.Column>

          </Grid>
        </div>
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
