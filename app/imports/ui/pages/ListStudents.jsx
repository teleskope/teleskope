import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Loader, Card } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudentCard from '../components/StudentCard';

class ListStudents extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { students } = this.props;
    return (
        <Container style={{ marginTop: '80px' }}>
          <Grid>
            <Grid.Row>
              <Card.Group stackable>
                {students.map((student, index) => (
                      <StudentCard student={student} key={index}/>
                  ))}
                </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

ListStudents.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    students: Profiles.find({ role: 'student' }, { limit: 10 }).fetch(),
    ready: subscription.ready(),
  };
})(ListStudents);
