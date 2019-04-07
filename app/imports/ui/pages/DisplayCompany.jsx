import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Image, Card } from 'semantic-ui-react';
import { Company } from '/imports/api/company/company';
import CompanyComponent from '/imports/ui/components/Company';
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
          {this.props.company.map((company) => <CompanyComponent key={company._id} company={company} />)}

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
  // Get access to Company documents.
  const subscription = Meteor.subscribe('Company');
  return {
    company: Company.find({}).fetch(),
    ready: subscription.ready(),
  };
})(DisplayCompany);
