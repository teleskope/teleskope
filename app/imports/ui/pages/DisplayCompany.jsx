import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Image, Card } from 'semantic-ui-react';
import { Company } from '/imports/api/company/company';
// import  from '/imports/ui/components/'; this line will contain the import statement for the company
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class DisplayCompany extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Grid divided='vertically'>
          <Grid.Row column={2}>
          <Grid.Column>
            <Image src={this.props.company.image} size='medium' />
          </Grid.Column>
            <Grid.Column>
          <Header inverted as="h2" textAlign="center">{this.props.company.companyName}</Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Header as="h4">{this.props.company.address}</Header>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">{this.props.company.zipCode}</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">{this.props.company.email}</Header>
              </Grid.Column>
            </Grid.Row>
            <Header as="h3">Description:</Header>
            <Card>
              {this.props.company.summary}
            </Card>
          </Grid>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
DisplayCompany.propTypes = {
  company: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Company');
  return {
    company: Company.find({}).fetch(),
    ready: subscription.ready(),
  };
})(DisplayCompany);
