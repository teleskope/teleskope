import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Card, Divider, Dropdown } from 'semantic-ui-react';
import { Students } from '/imports/api/student/student';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudentCard from '../components/StudentCard';

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

class ListStudents extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving students</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { students } = this.props;
    return (
        <Container>
          <Grid>
            <Grid.Row>
              <Header as="h2" floated='left'>Promising employees</Header>
            </Grid.Row>
            <Grid.Row>
              <Card.Group stackable>
                  {students.map((student, index) => (
                        <StudentCard student={student} key={index}/>
                  ))}
              </Card.Group>
            </Grid.Row>
            <Divider />
            <Grid.Row verticalAlign='middle' columns='equal'>
              <Grid.Column floated='left'>
                <Header as="h2">All Students</Header>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  text='Filter Students'
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
  const subscription = Meteor.subscribe('Students');
  return {
    students: Students.find({}, { limit: 5 }).fetch(),
    ready: subscription.ready(),
  };
})(ListStudents);
