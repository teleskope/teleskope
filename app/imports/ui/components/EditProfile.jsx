import React from 'react';
import { Loader, Header, Modal, Button, Grid, Segment, Icon } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';
import { Profiles, ProfileSchema } from '../../api/profile/profile';

function submit(data) {
  const { firstName, lastName, website, summary, image, socials, zipCode, _id } = data;
  Profiles.update(_id, { $set: { firstName, lastName, website, summary, image, socials, zipCode } }, (error) => (error ?
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
      Bert.alert({ type: 'success', message: 'Update succeeded' })));
};

/** Renders the Page for editing a single document. */
export default function EditProfile(props){
  /** On successful submit, insert the data. */


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  // render() {
    return (
        <Modal trigger={<Button color='green' content='Edit Profile' icon='edit' toggle/>} closeIcon>
          <Header icon='edit' content='Edit Profile'/>
          <Modal.Content>
            <Grid container centered>
              <Grid.Column>
                <Header as="h2" textAlign="center">Edit Profile</Header>
                <AutoForm schema={ProfileSchema} onSubmit={submit} profile={props.profile}>
                  <Segment>
                    <TextField name='firstName'/>
                    <TextField name='lastName'/>
                    <TextField name='website'/>
                    <TextField name='summary'/>
                    <TextField name='image'/>
                    <TextField name='zipCode'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='owner'/>
                    <HiddenField name='role'/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red'>
              <Icon name='remove'/> Cancel
            </Button>
            <Button color='green'>
              <Icon name='checkmark'/> Save
            </Button>
          </Modal.Actions>
        </Modal>
    );
 // }

}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  profile: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// export default withTracker(EditProfile);
