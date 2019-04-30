import React from 'react';
import { Grid, Icon, Header, Button, Segment, Image, Container, Advertisement } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  render() {
    return (

      <div>
        <Container>
          {/* Image here needs to be grabbed from the user's profile */}
          <Image src='http://clipart-library.com/images/6cpop79oi.png' size='medium' circular />
          <Grid columns='three'>
            <Grid.Column stretched>
              <Header as='h3' centered>Companies</Header>
            </Grid.Column >
            <Grid.Column stretched>
              <Header as='h3' centered>Notifications</Header>

            </Grid.Column>
            <Grid.Column stretched centered>
              <Advertisement unit='vertical rectangle' test='Advertisements' />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.string,
};

const DashboardContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Dashboard);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DashboardContainer);
