import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Companies } from '../../api/company/company';

class ShowCompany extends Component {
  renderPage() {
    const { companyName } = this.props.company;

    return (
      <div>
        <h1>{companyName}</h1>
      </div>
    );
  }

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }
}

ShowCompany.propTypes = {
  company: PropTypes.object,
  read: PropTypes.bool,
};

export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params.companyId;

  const subscription = Meteor.subscribe('Companies');
  return {
    company: Companies.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowCompany);
