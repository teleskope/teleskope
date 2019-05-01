import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Image, Button, Loader } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (this.props.ready) ? this.renderNavBar() : <Loader active>Retrieving data</Loader>;
  }

  renderNavBar() {
    const menuStyle = {
      margin: '0px',
      backgroundColor: '#455880',
    };
    const userId = Meteor.userId();

    return (
      <Menu style={menuStyle} borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
        <Image src='images/ts_white_logo.png' size='tiny'/><Image src='images/teleskope_horizontal.svg'/>
        </Menu.Item>
        {((Roles.userIsInRole(userId, 'student') || Roles.userIsInRole(userId, 'company')) && this.props.profile) ? (
            <Menu.Item as={NavLink}
                 activeClassName="active"
                 exact to={'/dashboard/'}
                 key='dashboard'
                 >
                 Dashboard
            </Menu.Item>
        ) : ''}
        {this.props.currentUser ? (
            [
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact to="/companies"
                         key='companies'>
                         Companies
              </Menu.Item>,
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact to="/students"
                         key='students'>
                         Students
              </Menu.Item>,
            ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <div>
              <Link to={'/signin'} key="signin">
                <Button content='Login' secondary inverted basic/>
              </Link>
              <Link to={'/signup'} key="signup">
                <Button content='Create Account' primary/>
              </Link>
            </div>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="My Profile" as={NavLink} exact to="/profile"/>

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
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const subscription = Meteor.subscribe('UserProfile');
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  profile: Profiles.findOne({}),
  ready: subscription.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
