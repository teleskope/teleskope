import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Companies } from '../../api/company/company';
import CompanyComponent from '/imports/ui/components/CompanyComponent';

class ShowCompany extends Component {

  render() {
    return this.props.ready
        ? this.renderPage()
        : <Loader active>Getting data</Loader>;
  }

    renderPage() {
      return (
          <Container>
            {this.props.company.map((company) => <CompanyComponent key={company._id} company={company} />)};
          </Container>
      );
  }
}

ShowCompany.propTypes = {
  company: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.companyId;

  const subscription = Meteor.subscribe('Companies');
  return {
    company: Companies.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowCompany);
