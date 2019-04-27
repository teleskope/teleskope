import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button, Loader, Container, Header, Icon, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import zipcodes from 'zipcodes';

class ShowJob extends Component {

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    renderPage() {
    const city = zipcodes.lookup(this.props.jobs.zipCode);
      return (
          <Grid>
            <Grid.Row centered>
                <Header as='h1'>{this.props.jobs.title}</Header>
            </Grid.Row>
            <Container textAlign='center'>
              <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
              <Header as='h3'>{this.props.jobs.employmentType}</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3'><Icon name="map marker alternate"/>{`${city.city}, ${city.state}`}</Header>
              </Grid.Column>
              <Grid.Column>
              <div>
                <Button
                    color='blue'
                    content='Apply'
                    icon='space shuttle'
                    toggle
                />
                <Button inverted
                  color='blue'
                  content='Follow'
                  icon='star'
                  toggle
                  />
              </div>
              </Grid.Column>
            </Grid.Row>
              </Grid>
            </Container>
            <Grid.Row centered>
              <Container text>
                <Header as='h2'>Our Requirements</Header>
                {this.props.jobs.requirements}
              </Container>
            </Grid.Row>
            <Grid.Row centered>
              <Container text>
              <Header as='h2'>Job Description</Header>
                {this.props.jobs.description}
              </Container>
            </Grid.Row>
          </Grid>
      );
  }
}

ShowJob.propTypes = {
  jobs: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.jobId;

  const subscription = Meteor.subscribe('Jobs');
  return {
    jobs: Jobs.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowJob);
