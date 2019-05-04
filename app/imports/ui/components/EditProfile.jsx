import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Header, Modal, Button, Grid, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import PropTypes from 'prop-types';
import { check } from 'meteor/check';
import { Profiles, ProfileSchema } from '../../api/profile/profile';

class EditProfile extends React.Component {
  socialMedia = this.props.profile.socials;

  userId = this.props.profile._id;

  sites = [{ provider: 'linkedin', link: '' },
            { provider: 'github', link: '' },
            { provider: 'twitter', link: '' }];

  socialSitesTemp = [];

  state = { open: false };

  noSubmit = true;

  /* Open modal */
  show = () => this.setState({ open: true });

  /* Close modal */
  close = () => {
    if (this.noSubmit) {
      /* Clear any social sites without any links (for not submitting) */
      this.socialMedia = (this.socialMedia).filter((social) => social.link);
      Profiles.update(this.userId, { $set: { socials: this.socialMedia } });
    }
    this.noSubmit = true;
    this.setState({ open: false });
  };

  /** On successful submit, insert the this.props.profile. */
  submit(data) {
    const { firstName, lastName, website, summary, zipCode, _id } = data;

    /* Clear any social sites without any links */
    let { socials, image } = data;
    socials = socials.filter((social) => social.link);
    console.log(this.socialMedia);

    /* Need to update this.socialMedia if socials changed */
    this.socialMedia = $.extend(true, [], socials);

    /* Default profile picture */
    image = image || 'https://apod.nasa.gov/apod/image/1905/photo95cielaustral1024.jpg';

    /* Check's seem redundant but i included it anyways */
    check(data, Object);
    check(firstName, String);
    check(lastName, String);

    // Profiles.update(_id, { $unset: { socials } });
    Profiles.update(_id, { $set: { firstName, lastName, socials, zipCode, summary, website, image } },
        (error) => (error ?
            Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Update succeeded' })));
    this.noSubmit = false;
    this.close();
  }

  loadData = (profile) => () => {
    let socialsIndex = 0;
    this.socialSitesTemp = [];

    /* Copy profile.socials.$.link to socialSitesTemp */
    for (let i = 0; i < this.sites.length; i++) {
      this.socialSitesTemp.push(Object.assign({}, this.sites[i]));
      if (socialsIndex < profile.socials.length) {
        if (profile.socials[socialsIndex].provider === this.socialSitesTemp[i].provider) {
          this.socialSitesTemp[i].link = profile.socials[socialsIndex].link;
          socialsIndex++;
        }
      }
    }
    Profiles.update(profile._id, { $set: { socials: this.socialSitesTemp } });
    this.show();
  };

  /** Renders the Page for editing a single document. */
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    const { open } = this.state;

    return (
        <div >
          <Button color='green' content='Edit Profile' icon='edit'
                  onClick={this.loadData(this.props.profile)}/>
          <Modal open={open} onClose={this.close.bind(this)} closeIcon>
            <Header icon='edit' content='Edit Profile'/>
            <Modal.Content>
              <Grid container centered>
                <Grid.Column>
                  <Header as="h2" textAlign="center">Edit Profile</Header>
                  <AutoForm schema={ProfileSchema} onSubmit={this.submit.bind(this)}
                            model={this.props.profile}>
                    <Segment>
                      <Form.Group widths='equal'>
                        <TextField name='firstName'/>
                        <TextField name='lastName'/>
                      </Form.Group>
                      <TextField name='website'/>
                      {/* TODO: username input and then append site to beginning of it */}
                      {this.socialSitesTemp.map((social, index) => (<TextField label={`${social.provider}`}
                                          name={`socials.${index}.link`} key={index}/>
                      ))}
                      <TextField name='image'/>
                      <TextField name='zipCode'/>
                      <LongTextField name='summary'/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='owner'/>
                      <HiddenField name='role'/>
                    </Segment>
                  </AutoForm>
                </Grid.Column>
              </Grid>
            </Modal.Content>
          </Modal>
        </div>
    );
  }
}
/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(EditProfile);
