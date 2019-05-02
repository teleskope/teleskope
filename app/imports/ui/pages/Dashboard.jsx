import React from 'react';
import { Grid, Header, Segment, Image, Button, List, Loader } from 'semantic-ui-react';
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
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { image, firstName, lastName } = this.props.profile;
    return (

      <div>
        <Grid container style={{ marginTop: '1em' }}>
          <Grid.Column width={4}>
              <Image src={image} size='medium' />
              <DashboardSubs
                myCompanies={this.props.myCompanies}
              />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h2'>{`${firstName} ${lastName}`} </Header>
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
          <Grid.Column width={2}/>
        </Grid>
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
