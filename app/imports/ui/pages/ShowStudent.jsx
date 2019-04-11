import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/student/student';

class ShowStudent extends Component {
  renderPage() {
    const { firstName, lastName} = this.props.student;

    return (
      <div>
        <h1>{firstName} {lastName}</h1>
      </div>
    );
  }

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }
}

ShowStudent.propTypes = {
  student: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const documentId = match.params.studentId;

  const subscription = Meteor.subscribe('Students');
  return {
    student: Students.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(ShowStudent);
