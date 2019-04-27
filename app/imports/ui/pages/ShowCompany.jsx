import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, Icon, Grid, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Companies } from '../../api/company/company';
import { Profiles } from '../../api/profile/profile';
import JobCard from '../components/job/JobCard';
import zipcodes from 'zipcodes';

class ShowCompany extends Component {
  constructor() {
    super();
    this.state = {
      isFavorited: null,
    };
  }


  handleFollow = () => {
    const companyId = this.props.company._id;
    const followed = this.props.profile.following.includes(companyId);
    if (!followed) {
      Meteor.call('followCompany', companyId);
      this.setState({ isFavorited: true });
    } else {
      Meteor.call('unfollowCompany', companyId);
      this.setState({ isFavorited: false });
    }
  };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    renderPage() {
      const { jobs, zipCode, image, summary, name, address } = this.props.company;
      const city = zipcodes.lookup(zipCode);
      // TODO: Display owners emails
      // const email01 = 'mailto:';
      // const email02 = email01.concat(owners[0]);
      // const emailLink = email02.concat('?Subject=Hello');

      return (
          <Grid style={{ marginTop: '2em' }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src={image !== undefined ? image :
                    'https://www.bigredcloud.com/wp-content/uploads/Tthree-ways-your-company-can-benefit-from-' +
                    'collaborating-with-other-companies.jpg'}
                       style={{ width: '335px' }} floated='right'/>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>{name}</Header>
                <Header as='h3'><Icon className="map marker alternate icon"/>{address} {zipCode}</Header>
                {city ? (
                    <Header as='h4'>
                      <Header.Content>{`${city.city}, ${city.state}`}</Header.Content>
                    </Header>
                ) : ''}
                {/*TODO: Need to make a socials for company*/}
                {/*<Container>*/}
                  {/*<Menu borderless text>*/}
                  {/*<Menu.Item><Icon size='large' className="twitter icon"/></Menu.Item>*/}
                  {/*<Menu.Item><Icon size='large' className="linkedin icon"/></Menu.Item>*/}
                  {/*<Menu.Item><Icon size='large' className="github icon"/></Menu.Item>*/}
                  {/*<Menu.Item><Icon size='large' className="envelope outline icon"/></Menu.Item>*/}
                  {/*</Menu>*/}
                {/*</Container>*/}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Container text>
              <Header as='h2'>Company Description</Header>
                {summary}
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Container text>
                <Header as='h2'>Current Openings</Header>
              </Container>
            </Grid.Row>
            {jobs ? (
              <Grid.Row>
                <Container>
                <Card.Group stackable>
                  {jobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                  ))}
                </Card.Group>
                </Container>
              </Grid.Row>
            ) : ''}
          </Grid>
      );
  }
}

ShowCompany.propTypes = {
  company: PropTypes.object,
  profile: PropTypes.object,
  ready: PropTypes.bool,
  profile: PropTypes.object,
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
