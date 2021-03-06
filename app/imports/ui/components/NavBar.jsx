import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Image, Button, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (this.props.ready) ? this.renderNavBar() : '';
  }

  renderNavBar() {
    const menuStyle = {
      margin: '0px',
      backgroundColor: '#455880',
    };
    const userId = Meteor.userId();
    const { role } = this.props.profile || '';

    return (
      <Menu style={menuStyle} borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
        <Image src='images/ts_white_logo.png' size='tiny'/>
        <h1 className='righteous' style={{ alignSelf: 'baseline' }}>TeleSkope</h1>
        </Menu.Item>
        {((Roles.userIsInRole(userId, 'student') || Roles.userIsInRole(userId, 'company')) && this.props.profile) ? (
            <StudentNav />
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            [
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact
                         to="/adminCompanies"
                         key='adminCompanies'>Company Admin</Menu.Item>,
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact to="/adminStudents"
                         key='adminStudents'>Student Admin</Menu.Item>,
            ]
          ) : ''}
        <Menu.Item position="right" className='nav-large'>
          {this.props.currentUser === '' ? (
            <div>
              <Link to={'/signin'} key="signin">
                <Button content='Log In' secondary inverted basic/>
              </Link>
              <Link to={'/signup'} key="signup">
                <Button content='Create Account' primary/>
              </Link>
            </div>
          ) : (
            <Dropdown text={`${this.props.currentUser}`} pointing="top right"
                      icon={ role === 'company' ? { name: 'building', size: 'large' } :
                                                  { name: 'student', size: 'large' }}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="My Profile" as={NavLink} exact to="/profile"/>

                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/"
                               onClick={(() => Meteor.logout())}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
        {/* menu for mobile */}
        <Menu.Item position="right" className='nav-small'>
          {this.props.currentUser === '' ? (

            <Dropdown pointing="top right" icon={<Icon name='bars' size='large'/>}>
              <Dropdown.Menu>
                <Dropdown.Item text="Log In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item text="Create Account" as={NavLink} exact to="/signup"
                />
              </Dropdown.Menu>
            </Dropdown>

          ) : (
            <Dropdown pointing="top right"
                      icon={<Icon name='bars' size='large'/>}>
              <Dropdown.Menu>
                <Dropdown.Header>{this.props.currentUser}</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item text='Dashboard' as={NavLink} exact to='/dashboard'/>
                <Dropdown.Item text='Companies' as={NavLink} exact to='/companies'/>
                <Dropdown.Item text='Students' as={NavLink} exact to='/students'/>
                <Dropdown.Divider />
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

const StudentNav = () => (
    [
      <Menu.Item as={NavLink}
                  className='nav-large'
                  activeClassName="active"
                  exact to={'/dashboard/'}
                  key='dashboard'>
                  Dashboard
      </Menu.Item>,
      <Menu.Item as={NavLink}
                 className='nav-large'
                 activeClassName="active"
                 exact to="/companies"
                 key='companies'>
                 Companies
      </Menu.Item>,
      <Menu.Item as={NavLink}
                 className='nav-large'
                 activeClassName="active"
                 exact to="/students"
                 key='students'>
                 Students
      </Menu.Item>,
    ]
  );

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
