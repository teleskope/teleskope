import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, Icon, Grid, Card, Image, Menu, Modal, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import zipcodes from 'zipcodes';
import { Companies } from '../../api/company/company';
import { Profiles } from '../../api/profile/profile';
import JobCard from '../components/job/JobCard';
// import { Menu } from 'semantic-ui-react/dist/commonjs/collections/Menu';


class ShowCompany extends Component {
  constructor() {
    super();
    this.state = {
      isFavorited: null,
    };
  }


  renderEditModal() {
    const { role } = this.props.profile;
    if (role !== 'company') {
      return null;
    }
    const profileWebsite = this.props.profile.website;
    const isOwned = this.props.company.owners.contains(profileWebsite);
    if (!isOwned) {

      return null;
    }
    return <Modal style={modal} trigger={<Button
        content='Edit'
        color='black'
        floated='right'
        inverted
    />} closeIcon>
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Company</Header>
          <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <TextField name='owners'/>
              <TextField name='address'/>
              <NumField name='zipCode' decimal={false}/>
              <LongTextField name='summary'/>
              <TextField name='website'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='_id' />
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
      this.setState({ isFavorited: true });
    } else {
      Meteor.call('unfollowCompany', companyId);
      this.setState({ isFavorited: false });
    }
  };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    renderPage() {
      const { jobs, zipCode, image, summary, name, address, owners, socials, website } = this.props.company;
      const city = zipcodes.lookup(zipCode);
      const email01 = 'mailto:';
      const email02 = email01.concat(owners[0]);
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
              <Grid.Column>
                <Image src={image} style={{ width: '335px' }} floated='right'/>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>{name}</Header>
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
                <Header as='h3'><Icon className="map marker alternate icon"/>{address} {zipCode}</Header>
                {city ? (
                    <Header as='h4'>
                      <Header.Content>{`${city.city}, ${city.state}`}</Header.Content>
                    </Header>
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
  const subscription2 = Meteor.subscribe('Profiles');
  return {
    company: Companies.findOne({ _id: documentId }),
    profile: Profiles.findOne({ _id: Meteor.userId() }),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ShowCompany);
