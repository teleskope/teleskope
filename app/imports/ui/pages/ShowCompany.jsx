import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, Icon, Grid, Menu, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Companies } from '../../api/company/company';
import { Profiles } from '../../api/profile/profile';
import JobCard from '../components/job/JobCard';

class ShowCompany extends Component {
  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { jobs } = this.props.company;
    return (
        <Grid style={{ marginTop: '2em' }}>
          <Grid.Row columns={2}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <Header as='h1'>{this.props.company.name}</Header>
              </Grid.Row>
              <Header as='h3'><Icon className="map marker alternate icon"/>
                {this.props.company.address}
              </Header>
              <Container>
                <Menu borderless text>
                  <Menu.Item><Icon size='large' className="twitter icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="linkedin icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="github icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="envelope outline icon"/></Menu.Item>
                </Menu>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container text>
              <Header as='h2'>Company Description</Header>
              {this.props.company.summary}
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Container text>
              <Header as='h2'>Current Openings</Header>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Container>
              <Card.Group stackable>
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
              </Card.Group>
            </Container>
          </Grid.Row>
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
