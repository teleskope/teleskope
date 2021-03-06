import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, Icon, Grid, Card, Image, Menu, Modal, Button, Segment,
          List } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { withTracker } from 'meteor/react-meteor-data';
import zipcodes from 'zipcodes';
import { Companies, CompanySchema } from '../../api/company/company';
import { Profiles } from '../../api/profile/profile';
import JobCard from '../components/job/JobCard';


class ShowCompany extends Component {
  constructor() {
    super();
    this.follow = null;
  }

  submit(data) {
    const { name, owners, address, zipCode, summary, website, _id, image } = data;
    Companies.update(_id, { $set: { name, owners, address, zipCode, summary, website, image } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }


  renderEditModal() {
    const { role } = this.props.profile;
    if (role !== 'company') {
      return null;
    }
    const owner = this.props.profile.owner;
    const isOwned = this.props.company.owners.includes(owner);
    if (!isOwned) {
      return null;
    }
    return <Modal id='modal' trigger={<Button
        content='Edit'
        color='green'
    />} closeIcon>
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Company</Header>
          <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
            <Segment>
              <TextField name='name'/>
              <TextField name='owners'/>
              <TextField name='address'/>
              <NumField name='zipCode' decimal={false}/>
              <TextField name='website'/>
              <TextField name='image'/>
              <LongTextField name='summary'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    </Modal>;
  }


  handleFollow = () => {
    const companyId = this.props.company._id;
    const followed = this.props.profile.following.includes(companyId);
    if (!followed) {
      Meteor.call('followCompany', companyId);
      this.follow = true;
    } else {
      Meteor.call('unfollowCompany', companyId);
      this.follow = false;
    }
  };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    renderPage() {
      const { jobs, zipCode, image, summary, name, address, owners, socials, website } = this.props.company;
      const city = zipcodes.lookup(zipCode);
      const { firstName, lastName, role } = this.props.profile;
      this.follow = this.props.profile.following.includes(this.props.company._id);

      return (
          <Grid style={{ marginTop: '2em' }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src={image} style={{ width: '335px' }} floated='right'/>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>{name}  {this.renderEditModal()}</Header>
                <Menu borderless text>
                  <Menu.Item href={`mailto:${owners[0]}?Subject=Hi, I'm ${firstName} ${lastName}!`}>
                    <Icon size='large' name="envelope outline"/>
                  </Menu.Item>
                  {website ? (
                      <Menu.Item href={website} target='_blank'>
                        <Icon size='large' name='globe'/></Menu.Item>
                  ) : ''}
                  {socials ? (socials.map((social, index) => {
                    if (social.link) {
                      return <Menu.Item href={social.link} key={index} target='_blank'>
                        <Icon size='large' name={social.provider}/>
                      </Menu.Item>;
                    }
                    return '';
                  })) : ''}
                </Menu>
                <List>
                  <List.Item>
                    <List.Icon name='map marker alternate' size='big' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>{address}, {zipCode}</List.Header>
                      {city ? (
                      <List.Description>{`${city.city}, ${city.state}`}</List.Description>
                      ) : ''}
                    </List.Content>
                  </List.Item>
                </List>
                {role === 'student' ? (
                <Button color={ this.follow ? null : 'yellow'} content={this.follow ? 'unfollow' : 'follow'} icon='star'
                        onClick={this.handleFollow}/>
                ) : ''}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Container text>
              <Header as='h2'>Company Description</Header>
                {summary}
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Container text>
                <Header as='h2'>Current Openings</Header>
              </Container>
            </Grid.Row>
            {jobs ? (
              <Grid.Row>
                <Container>
                <Card.Group stackable>
                  {jobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                  ))}
                </Card.Group>
                </Container>
              </Grid.Row>
            ) : ''}
          </Grid>
      );
  }
}

ShowCompany.propTypes = {
  company: PropTypes.object,
  profile: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.companyId;

  const subscription = Meteor.subscribe('Companies');
  const subscription2 = Meteor.subscribe('UserProfile');
  return {
    company: Companies.findOne({ _id: documentId }),
    profile: Profiles.findOne({}),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ShowCompany);
