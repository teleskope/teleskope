import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Icon, Image, Loader, Grid, Menu, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/profile';
import ProfileSkillsDropdown from '../components/ProfileSkillsDropdown';


class Profile extends Component {

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid style={{ marginTop: '2em' }}>
          <Grid.Row columns={2}>
            <Grid.Column >
              <Image src={'https://media1.giphy.com/media/MuE0xWbEohUrxbm77r/giphy.gif'}
                     style={{ width: '335px' }} floated='right'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
              <Container>
                <Menu borderless text>
                  <Menu.Item><Icon size='large' className="twitter icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="linkedin icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="github icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="envelope outline icon"/></Menu.Item>
                </Menu>
                <Button
                    color='green'
                    content='Edit Profile'
                    icon='edit'
                    toggle
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
          <br></br>
          <Grid.Row>
            <Container text>
              <Header as='h2'>About</Header>
              {this.props.profile.summary}
            </Container>
          </Grid.Row>
          <br></br>
          <br></br>
          <Grid.Row>
            <Container text>
              <Header as='h2'>Skills</Header>
              <ProfileSkillsDropdown/>
            </Container>
          </Grid.Row>
        </Grid>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  // const documentId = match.params.profileId;
  const subscription = Meteor.subscribe('Profiles');
  const userEmail = async () => {
    await Meteor.user().emails[0].address;
  };
  return {
    profile: Profiles.findOne({ owner: userEmail }),
    ready: subscription.ready(),
  };
})(Profile);
