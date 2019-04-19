import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, Icon, Grid, Segment, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Jobs } from '../../api/jobs/jobs';

class ShowJob extends Component {

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    renderPage() {
      return (
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>{this.props.jobs.title}</Header>
                <Header as='h3'><Icon className="map marker alternate icon"/>
                  {this.props.jobs.address}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Segment></Segment>
            <Grid.Row>
              <Container text>
              <Header as='h2'>Job Description</Header>
                {this.props.jobs.summary}
              </Container>
            </Grid.Row>
            <Segment></Segment>
            <Grid.Row>
              <Container text>
                <Header as='h2'>Current Openings</Header>
              </Container>
            </Grid.Row>
          </Grid>
      );
  }
}

ShowJob.propTypes = {
  jobs: PropTypes.array,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.companyId;

  const subscription = Meteor.subscribe('Jobs');
  return {
    jobs: Jobs.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowJob);
