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
import { Menu } from 'semantic-ui-react/dist/commonjs/collections/Menu';


/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, website, summary, image, socials, zipCode, _id } = data;
    Profiles.update(_id, { $set: { firstName, lastName, website, summary, image, socials, zipCode } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready
        ? this.renderPage()
        : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { firstName, lastName, website, owner, summary, image, socials, zipCode } = this.props.profile;
    const city = zipcodes.lookup(zipCode);
    const email01 = 'mailto:';
    const email02 = email01.concat(owner);
    const emailLink = email02.concat('?Subject=Hello');
    const iconName = new Array(100);
    if (socials) {
      socials.map(function (social, index) {
        iconName[index] = social.provider;
        iconName[index].concat(' icon');
        return iconName[index];
      });
    }

    return (
        <Modal trigger={<Button
            color='green'
            content='Edit Profile'
            icon='edit'
            toggle
        />} closeIcon>
          <Header icon='archive' content='Archive Old Messages' />
          <Modal.Content>
            <Grid container centered>
              <Grid.Column>
                <Header as="h2" textAlign="center">Edit Stuff</Header>
                <AutoForm schema={ProfileSchema} onSubmit={this.submit} model={this.props.doc}>
                  <Segment>
                    <TextField name='firstName'/>
                    <TextField name='lastName'/>
                    <TextField name='website'/>
                    <TextField name='summary'/>
                    <TextField name='image'/>
                    <TextField name='zipCode'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='owner' />
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red'>
              <Icon name='remove' /> No
            </Button>
            <Button color='green'>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params.profileId;

  const subscription = Meteor.subscribe('Profiles');
  return {
    profile: Profiles.findOne({ _id: documentId }),
    ready: subscription.ready(),
  };
})(EditProfile);
