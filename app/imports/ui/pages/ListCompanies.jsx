import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Card } from 'semantic-ui-react';
import { Companies } from '/imports/api/company/company';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CompanyCard from '../components/company/CompanyCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCompanies extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { companies } = this.props;
    return (
        <Container>
          <Header as="h2">Trending Companies</Header>
          <Grid>
            <Grid.Row>
              <Card.Group stackable>
              {companies.map((company, index) => (
                    <CompanyCard key={index} company={company}/>
                ))}
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

ListCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Companies');
  return {
    companies: Companies.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListCompanies);
