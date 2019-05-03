import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Card, Divider, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import zipcodes from 'zipcodes';
import { Companies } from '/imports/api/company/company';
import { Profiles } from '../../api/profile/profile';
import CompanyCard from '../components/company/CompanyCard';
import { Roles } from 'meteor/alanning:roles';

const filterOptions = [
  {
    key: 'Alphabetical',
    text: 'Alphabetical',
    value: 'Alphabetical',
  },
  {
    key: 'By Distance',
    text: 'By Distance',
    value: 'Distance',
  },
  {
    key: 'By Openings',
    text: 'By Openings',
    value: 'Openings',
  },
];

class ListCompanies extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: null,
    };
  }

  handleSort = (e, data) => {
    this.setState({ sort: data.value });
  }

  render() {
    return (this.props.loading) ? <Loader active>Getting data</Loader> : this.renderPage();
  }

  sortCompanies(filter) {
    const { profile, companies } = this.props;
    let sorted = [...companies];
    function dist(there) {
      return zipcodes.distance(profile.zipCode, there.zipCode);
    }

    switch (filter) {
      case 'Openings':
        sorted = sorted.sort((a, b) => b.jobs.length - a.jobs.length);
        break;
      case 'Distance':
        sorted = sorted.sort((a, b) => dist(a) - dist(b));
        break;
      case 'Alphabetical':
        sorted = sorted.sort(function (a, b) {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      default:
    }
    return sorted;
  }

  matchedCompanies() {
    const companies = [...this.props.companies];
    // // sort by amount of matching skills

    // // get users skills into array
    const userSkills = this.props.profile.skills;
    // added aggregated skills to companies
    const companyskills = _.chain(companies)
                            .map(company => {
                              const skills = [];
                              company.jobs.forEach(j => skills.push(j.skills));
                              return _.extend(company, { skills: _.uniq(_.flatten(skills)) });
                            })
                            .value();

    // function that gets difference of user skills to each company skills
    // sort by length of matched skills
    const sorted = _.chain(companyskills)
                      .sortBy((company) => _.intersection(company.skills, userSkills).length)
                      .map(company => {
                        return _.extend(company, { matches: _.intersection(company.skills, userSkills).length });
                      })
                      .value();

    return sorted.reverse().slice(0, 3);
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortedCompanies = this.sortCompanies(this.state.sort);

    return (
        <Container style={{ marginTop: '80px' }}>
          <Grid>
            {Roles.userIsInRole(Meteor.userId(), 'student') ? (
              [
                <Grid.Row key='head'>
                  <Header as="h2" floated='left'>We think you may like</Header>
                </Grid.Row>,
                <Grid.Row key='card'>
                  <Card.Group stackable>
                      {this.matchedCompanies().map((company, index) => {
                        return (
                          <CompanyCard
                              key={index}
                              company={company}
                          />);
                        })}
                    </Card.Group>
                </Grid.Row>,
                <Divider key='divider'/>,
              ]
            ) : ''}
            <Grid.Row verticalAlign='middle' columns='equal'>
              <Grid.Column floated='left'>
                <Header as="h2">All Companies</Header>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  text={this.state.sort ? this.state.sort : 'Filter Companies'}
                  icon='filter'
                  labeled
                  button
                  className='icon'
                >
                  <Dropdown.Menu >
                    <Dropdown.Menu scrolling>
                      {filterOptions.map(option => (
                        <Dropdown.Item key={option.value} {...option} onClick={this.handleSort}/>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
              <Grid.Column width={8}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Card.Group stackable>
                {sortedCompanies.map((company, index) => {
                  return (
                    <CompanyCard
                        key={index}
                        company={company}
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
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object,
};

export default withTracker(() => {
  const handles = [
    Meteor.subscribe('Companies'),
    Meteor.subscribe('UserProfile'),
  ];
  const companies = Companies.find({}, {}).fetch();
  const profile = Profiles.findOne({});
  const loading = handles.some(handle => !handle.ready());
  return {
    companies,
    profile,
    loading,
  };
})(ListCompanies);
