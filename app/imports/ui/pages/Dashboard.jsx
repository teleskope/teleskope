import React from 'react';
import { Grid, Header, Segment, Image, Loader, Comment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/profile';
import { Companies } from '/imports/api/company/company';
import DashboardSubs from '../components/dashboard/DashboardSubs';
import Notification from '../components/dashboard/Notification';

const segmentStyle = {
  backgroundColor: '#455880',
};
 /* eslint no-else-return: "error" */
class Dashboard extends React.Component {
  notificationFeed() {
    const { notifications } = this.props;
    return _.map(notifications, (notice) => <Notification notice={notice} key={uuid.v1()}/>);
  }

  subCompanies(role) {
    const { companies, profile } = this.props;
    let result = [];
    if (role === 'company') {
      result = _.filter(companies, company => company.owners.includes(profile.owner));
    } else if (role === 'student') {
      result = _.filter(companies, (company) => profile.following.includes(company._id));
    }
    return result;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { image, firstName, lastName, role } = this.props.profile;
    const companies = this.subCompanies(role);
    return (

      <div>
        <Grid container style={{ marginTop: '1em' }} stackable>
          <Grid.Column width={4}>
              <Image src={image} size='medium' />
              <DashboardSubs
                myCompanies={companies}
                profile={this.props.profile}
              />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h2'>{`${firstName} ${lastName}`} </Header>
            <Segment secondary inverted style={segmentStyle}>
              <Header as='h3'> Notifications </Header>
              <Comment.Group>
                { this.notificationFeed() }
              </Comment.Group>
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
  companies: PropTypes.array,
  notifications: PropTypes.array,
};

const DashboardContainer = withTracker(() => {
  const handles = [
    Meteor.subscribe('UserProfile'),
    Meteor.subscribe('Companies'),
  ];
  const profile = Profiles.findOne({});
  // const email = Meteor.user() ? Meteor.user().username : undefined;

  const companies = Companies.find({}).fetch();
  const notifications = _.chain(companies)
                          .filter(company => profile.following.includes(company._id))
                          .map(company => {
                            const notices = company.notifications;
                            notices.forEach((notice) => {
                              const n = notice;
                              n.company = company.name;
                              n.image = company.image;
                            });
                            return notices;
                          })
                          .flatten()
                          .sortBy(n => n.datetime)
                          .reverse()
                          .value();

  const ready = handles.some(handle => handle.ready());
  return {
    profile,
    companies,
    ready,
    notifications,
  };
})(Dashboard);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DashboardContainer);
