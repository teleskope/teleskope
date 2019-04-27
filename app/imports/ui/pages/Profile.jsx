import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import zipcodes from 'zipcodes';
import { Container, Header, Icon, Image, Loader, Grid, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/profile';
import ProfileSkillsDropdown from '../components/ProfileSkillsDropdown';
import EditProfile from '../components/EditProfile';

class Profile extends Component {

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { firstName, lastName, website, owner, summary, image, socials, zipCode, skills } = this.props.profile;
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
              <Image src={image} style={{ width: '335px' }} floated='right'/>
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
                <EditProfile/>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <br></br>
          <Grid.Row>
            <Container text>
              <Header as='h2'>About</Header>
              <p>{summary}</p>
            </Container>
          </Grid.Row>
          <br></br>
          <br></br>
            <Grid.Row>
              <Container text>
                <Header as='h2'>Skills</Header>
                <p>
                  Help us provide better company and job matches by listing technical skills that really make you shine!
                </p>

                <ProfileSkillsDropdown userSkills={skills}/>
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
  const subscription = Meteor.subscribe('UserProfile');
  return {
    profile: Profiles.findOne({}),
    ready: subscription.ready(),
  };
})(Profile);
