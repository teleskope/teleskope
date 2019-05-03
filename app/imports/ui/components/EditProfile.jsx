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
  sites = [{ provider: 'linkedin', link: '' },
    { provider: 'github', link: '' },
    { provider: 'twitter', link: '' }];

  socialSitesTemp = [];

  state = { open: false };

  /* Open modal */
  show = () => this.setState({ open: true });

  /* Close modal */
  close = () => {
    console.log('close');
    this.setState({ open: false });
  }

  callClose = () => {
    console.log('callClose');
    this.close;
  }

  /** On successful submit, insert the this.props.profile. */
  submit(data) {
    const { firstName, lastName, website, summary, image, zipCode, _id } = data;
    let { socials } = data;
    console.log('socials');
    console.log(socials);
    socials = socials.filter((social) => social.link);
    console.log('socials');
    console.log(socials);

    /* Check's seem redundant but i included it anyways */
    check(data, Object);
    check(firstName, String);
    check(lastName, String);

    // Profiles.update(_id, { $unset: { socials } });
    Profiles.update(_id, { $set: { firstName, lastName, socials, zipCode, summary, website, image } },
        (error) => (error ?
            Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Update succeeded' })));
    console.log("Profile object");
    console.log(Profiles.findOne({ _id: _id }));
    this.close();
  }

  loadData = (profile) => () => {
    console.log("entered loadData");
    console.log(profile.socials);
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
    console.log("entered loadData 2");
    console.log(this.socialSitesTemp);
    /* this.socialSitesTemp & profile.socials point to the same array since no CopyConstructor */
    // profile.socials = this.socialSitesTemp;
    Profiles.update(profile._id, { $set: { socials: this.socialSitesTemp } });
    console.log("exiting loadData");
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
          <Modal open={open} onClose={this.close} closeIcon>
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
                      {this.socialSitesTemp.map((social, index) => {
                        // if (index > 0) {
                        //   console.log(`${index - 1}, ${this.props.profile.socials[index - 1].link}`);
                        // }
                        return <TextField label={`${social.provider}`}
                                          name={`socials.${index}.link`} key={index}/>;
                      })}
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
