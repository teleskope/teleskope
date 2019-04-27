import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import zipcodes from 'zipcodes';
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
    const { firstName, lastName, website, owner, summary, image, socials, zipCode } = this.props.profile;
    const city = zipcodes.lookup(zipCode);
    const email01 = 'mailto:';
    const email02 = email01.concat(owner);
    const emailLink = email02.concat('?Subject=Hello');
    const iconName = new Array(100);
    if (socials) {
      socials.map(function (social, index) {
      iconName[index] = social.provider;
      iconName[index].concat(' icon');
      return iconName[index];
      });
    }

    return (
        <Grid style={{ marginTop: '2em' }}>
          <Grid.Row columns={2}>
            <Grid.Column >
              <Image src={image !== undefined ? image :
                    'https://media1.giphy.com/media/MuE0xWbEohUrxbm77r/giphy.gif'}
                     style={{ width: '335px' }} floated='right'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{firstName} {lastName}</Header>
              <Container>
                <Menu borderless text>
                  <Menu.Item href={emailLink}>
                    <Icon size='large' name="envelope outline"/>
                  </Menu.Item>
                  {website ? (
                      <Menu.Item href={website} target='_blank'>
                        <Icon size='large' name='globe'/></Menu.Item>
                  ) : ''}
                  {socials ? (socials.map((social, index) => (
                    <Menu.Item href={social.link} key={index} target='_blank'>
                      <Icon size='large' name={iconName[index]}/>
                    </Menu.Item>
                  ))) : ''}
                </Menu>
                {city ? (
                  <Header as='h4'>
                    <Icon name='map marker alternate'/>
                    <Header.Content>{`${city.city}, ${city.state}`}</Header.Content>
                  </Header>
                ) : ''}
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
              {summary}
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

export default withTracker(() => {
  const owner = Meteor.user().username;

  const subscription = Meteor.subscribe('Profiles');
  return {
    profile: Profiles.findOne({ owner: owner }),
    ready: subscription.ready(),
  };
})(Profile);
