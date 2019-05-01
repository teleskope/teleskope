import React from 'react';
import { Grid, Header, Segment, Image, Container, Advertisement, List } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/profile';
import { Companies } from '/imports/api/company/company';
import DashboardSubs from '../components/DashboardSubs';

const profileStyle = {
  padding: '50px 0px',
};

const segmentStyle = {
  backgroundColor: '#455880',
};

class Dashboard extends React.Component {
  render() {
    console.log(this.props.myCompanies);
    return (

      <div>
        <Container>
          {/* Image here needs to be grabbed from the user's profile */}
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Image src='http://clipart-library.com/images/6cpop79oi.png' size='medium' style={profileStyle}/>
              </Grid.Column>
              <Grid.Column style={profileStyle}>
                <Header as='h2'> Welcome First Last </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DashboardSubs
                  myCompanies={this.props.myCompanies}
                />
              </Grid.Column>
              <Grid.Column stretched>
                <Segment secondary inverted style={segmentStyle}>
                  <Header as='h3'> Notifications </Header>
                  <Segment.Group>
                    <Segment tertiary>Company A is interested in you!</Segment>
                    <Segment tertiary>Company B is interested in you!</Segment>
                    <Segment tertiary>Company C is interested in you!</Segment>
                    <Segment tertiary>Company A is interested in you!</Segment>
                    <Segment tertiary>Company B is interested in you!</Segment>
                  </Segment.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched>
                <Advertisement unit='vertical rectangle' test='Advertisements' centered/>
                <Advertisement unit='vertical rectangle' test='Advertisements' centered/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool,
  myCompanies: PropTypes.array,
};

const DashboardContainer = withTracker(() => {
  const handles = [
    Meteor.subscribe('UserProfile'),
    Meteor.subscribe('Companies'),
  ];

  const email = Meteor.user() ? Meteor.user().username : undefined;
  const myCompanies = Companies.find({ owners: email }).fetch();

  const profile = Profiles.findOne({});
  const ready = handles.some(handle => handle.ready());
  return {
    profile,
    myCompanies,
    ready,
  };
})(Dashboard);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DashboardContainer);
