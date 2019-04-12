import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Icon, Image, Loader, Segment, Grid, Menu, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/student/student';

class ShowStudent extends Component {

  render() {
    return this.props.ready
      ? this.renderPage()
      : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={this.props.student.image} size='huge'/>
              <Button
                color='blue'
                content='Interested'
                icon='space shuttle'
                attached='bottom'
                toggle
                />
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{this.props.student.firstName} {this.props.student.lastName}</Header>
              <Header as='h3'><Icon className="map marker alternate icon"/>
                {this.props.student.address}
              </Header>
              <Container>
                <Menu borderless text>
                  <Menu.Item><Icon size='large' className="twitter icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="linkedin icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="github icon"/></Menu.Item>
                  <Menu.Item><Icon size='large' className="envelope outline icon"/></Menu.Item>
                </Menu>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Segment></Segment>
          <Grid.Row>
            <Container text>
              <Header as='h2'>Skills</Header>
            </Container>
          </Grid.Row>
          <Segment></Segment>
          <Grid.Row>
            <Container text>
              <Header as='h2'> About this Student</Header>
              {this.props.student.summary}
            </Container>
          </Grid.Row>
        </Grid>
    );
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
