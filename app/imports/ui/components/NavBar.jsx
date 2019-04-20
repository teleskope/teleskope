import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Loader, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (this.props.ready) ? this.renderNavBar() : <Loader active>Retrieving data</Loader>;
  }
  renderNavBar() {
    const menuStyle = { marginBottom: '10px' };
    //WHY IS _id UNDEFINED????????
    // const { _id } = this.props.profile[0];

    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>TeleSkope</Header>
        </Menu.Item>
        {Roles.userIsInRole(Meteor.userId(), 'student') || Roles.userIsInRole(Meteor.userId(), 'company') ? (
            <Menu.Item as={NavLink}
                        activeClassName="active"
                        exact to={`/profile/${this.props.profile[0]._id}`}
                        key='profile'
                        >
                        My Profile
              </Menu.Item>
        ) : ''}
        {this.props.currentUser ? (
              [<Menu.Item as={NavLink}
                         activeClassName="active"
                         exact to="/companies"
                         key='companies'>
              Companies
              </Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/students" key='students'>Students</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                //REDIRECT SIGNOUT TO THE LANDING PAGE
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/"
                               onClick={(() => Meteor.logout())}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.array,
  ready: PropTypes.bool.isRequired,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const subscription = Meteor.subscribe('Profiles');
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  profile: Profiles.find({ owner: Meteor.user() ? Meteor.user().username : '' }).fetch(),
  ready: subscription.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
