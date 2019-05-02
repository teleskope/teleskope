import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Icon, Image, Loader, Grid, Menu, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import zipcodes from 'zipcodes';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/profile';
import ProfileSkillsDropdown from '../components/ProfileSkillsDropdown';

class ShowStudent extends Component {

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { firstName, lastName, website, owner, summary, image, socials, zipCode } = this.props.student;
    const city = zipcodes.lookup(zipCode);

    return (
        <Grid style={{ marginTop: '2em' }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={image} style={{ width: '335px' }} floated='right'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{firstName} {lastName}</Header>
              <Container>
                <Menu borderless text>
                  <Menu.Item href={`mailto:${owner}?Subject=Hi ${firstName} ${lastName}!`} >
                    <Icon size='large' name="envelope outline"/>
                  </Menu.Item>
                  {website ? (
                      <Menu.Item href={website} target='_blank'>
                        <Icon size='large' name='globe'/></Menu.Item>
                  ) : ''}
                  {socials ? (socials.map((social, index) => (
                      <Menu.Item href={social.link} key={index} target='_blank'>
                        <Icon size='large' name={social.provider}/>
                      </Menu.Item>
                  ))) : ''}
                </Menu>
                {city ? (
                    <Header as='h4'>
                      <Icon name='map marker alternate'/>
                      <Header.Content>{`${city.city}, ${city.state}`}</Header.Content>
                    </Header>
                ) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'company') ? (
                  <Button
                      color='blue'
                      content='Interested'
                      icon='space shuttle'
                      toggle
                  />
                ) : ''}
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

ShowStudent.propTypes = {
  student: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.studentId;

  const subscription = Meteor.subscribe('Profiles');
  return {
    student: Profiles.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowStudent);
