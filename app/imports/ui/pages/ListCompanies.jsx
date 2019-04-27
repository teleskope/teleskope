import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Card, Divider, Dropdown } from 'semantic-ui-react';
import { Companies } from '/imports/api/company/company';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CompanyCard from '../components/company/CompanyCard';
import { Profiles } from '../../api/profile/profile';

const filterOptions = [
  {
    key: 'By Industry',
    text: 'By Industry',
    value: 'By Industry',
  },
  {
    key: 'Most Popular',
    text: 'Most Popular',
    value: 'Most Popular',
  },
  {
    key: 'Recently Updated',
    text: 'Recently Updated',
    value: 'Recently Updated',
  },
];

class ListCompanies extends React.Component {
  handleFollow = (favorited, companyId) => {
    if (!favorited) {
      Meteor.call('followCompany', companyId);
    } else {
      Meteor.call('unfollowCompany', companyId);
    }
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const favorites = this.props.profile.following;
    const { companies } = this.props;
    return (
        <Container style={{ marginTop: '80px' }}>
          <Grid>
            <Grid.Row>
              <Header as="h2" floated='left'>We think you may like</Header>
            </Grid.Row>
            <Grid.Row>
              <Card.Group stackable>
                  {companies.map((company, index) => {
                    const isFavorited = favorites.includes(company._id);
                    return (
                      <CompanyCard
                          key={index}
                          company={company}
                          onFollow={this.handleFollow}
                          favorited={isFavorited}
                      />);
                    })}
                </Card.Group>
            </Grid.Row>
            <Divider />
            <Grid.Row verticalAlign='middle' columns='equal'>
              <Grid.Column floated='left'>
                <Header as="h2">All Companies</Header>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  text='Filter Companies'
                  icon='filter'
                  labeled
                  button
                  className='icon'
                >
                  <Dropdown.Menu>
                    <Dropdown.Divider />
                    <Dropdown.Menu scrolling>
                      {filterOptions.map(option => (
                        <Dropdown.Item key={option.value} {...option} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
              <Grid.Column width={8}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Card.Group stackable>
                {companies.map((company, index) => {
                  const isFavorited = favorites.includes(company._id);
                  return (
                    <CompanyCard
                        key={index}
                        company={company}
                        onFollow={this.handleFollow}
                        favorited={isFavorited}
                    />);
                    })}
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
  profile: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe('Companies');
  const sub2 = Meteor.subscribe('UserProfile');
  return {
    companies: Companies.find({}, { limit: 5 }).fetch(),
    profile: Profiles.findOne({}),
    ready: sub1.ready() && sub2.ready(),
  };
})(ListCompanies);
