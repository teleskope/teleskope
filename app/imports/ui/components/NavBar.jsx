import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: '#455880',
    };
    return (
      <Menu style={menuStyle} borderless inverted fixed="top">
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
        <Image src='images/ts_white_logo.png' size='tiny'/><Image src='images/teleskope_horizontal.svg'/>
        </Menu.Item>
        {this.props.currentUser ? (
            [
              <Menu.Item as={NavLink}
                        activeClassName="active"
                        exact to="/profile"
                        key='profile'>
                        My Profile
              </Menu.Item>,
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
              <Button content='Login' secondary inverted basic
                      as={NavLink}
                      to='/signin'
              />
              <Button content='Create Account' primary
                      as={NavLink}
                      to='/signup'
              />
            </div>

          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
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
const subscription = Meteor.subscribe('Profiles');
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  profile: Profiles.findOne({ owner: Meteor.user() ? Meteor.user().username : '' }),
  ready: subscription.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
