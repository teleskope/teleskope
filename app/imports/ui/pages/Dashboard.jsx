import React from 'react';
import { Grid, Header, Segment, Image, Container, Advertisement, List } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const profileStyle = {
  padding: '50px 0px',
};

const segmentStyle = {
  backgroundColor: '#455880',
};

class Dashboard extends React.Component {
  render() {
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
              <Grid.Column stretched>
                <Segment tertiary inverted compact style={segmentStyle}>
                  <Header as='h3' textalign='center'> Companies You Are Following </Header>
                  <List>
                    <List.Item>Company A</List.Item>
                    <List.Item>Company B</List.Item>
                    <List.Item>Company D</List.Item>
                  </List>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched>
                <Segment secondary inverted style={segmentStyle}>
                  <Header as='h3'> Notifications </Header>
                  <Segment.Group tertiary>
                    <Segment tertiary>Company A is interested in you!</Segment>
                    <Segment tertiary>Company B is interested in you!</Segment>
                    <Segment tertiary>Company C is interested in you!</Segment>
                    <Segment tertiary>Company A is interested in you!</Segment>
                    <Segment tertiary>Company B is interested in you!</Segment>
                  </Segment.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched>
                <Advertisement unit='vertical rectangle' test='Advertisements' long centered/>
                <Advertisement unit='vertical rectangle' test='Advertisements' long centered/>
              </Grid.Column>
            </Grid.Row>
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
