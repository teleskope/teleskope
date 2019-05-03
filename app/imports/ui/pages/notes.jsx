import React from 'react';
import { Form, Header, Modal, Button, Grid, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import NumField from 'uniforms-semantic/NumField';
import PropTypes from 'prop-types';
import { check } from "meteor/check";
import { Profiles, ProfileSchema } from '../../api/profile/profile';


const sites = [{ provider: 'linkedin', link: '' },
  { provider: 'github', link: '' },
  { provider: 'twitter', link: '' }];
let socialSitesTemp = [];
this.state = { open: false };


/** On successful submit, insert the data. */
const submit = (data) => () => {
  const { firstName, lastName, website, summary, image, zipCode, _id } = data;
  let { socials } = data;
  socials = socials.filter((social) => social.link);

  /* Check's seem redundant but i included the anyways */
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
  this.setState({ open: false });
}

const loadData = (profile) => () => {
  this.setState({ open: true });
  console.log("entered loadData");
  console.log(profile.socials);
  let socialsIndex = 0;
  socialSitesTemp = [];
  for (let i = 0; i < sites.length; i++) {
    socialSitesTemp.push(Object.assign({}, sites[i]));
    if (socialsIndex < profile.socials.length) {
      if (profile.socials[socialsIndex].provider === socialSitesTemp[i].provider) {
        socialSitesTemp[i].link = profile.socials[socialsIndex].link;
        socialsIndex++;
      }
    }
  }
  console.log("entered loadData 2");
  console.log(socialSitesTemp);
  /* socialSitesTemp & profile.socials point to the same array since no CopyConstructor */
  // profile.socials = socialSitesTemp;
  Profiles.update(profile._id, { $set: { socials: socialSitesTemp } });
  console.log("exiting loadData");

}

/** Renders the Page for editing a single document. */
export default function EditProfile(props) {
  const { open } = this.state;
  return (
      <div>
        <Button color='green' content='Edit Profile' icon='edit'
                onClick={loadData(props.profile)}/>
        <Modal open={open} closeIcon>
          <Header icon='edit' content='Edit Profile'/>
          <Modal.Content>
            <Grid container centered>
              <Grid.Column>
                <Header as="h2" textAlign="center">Edit Profile</Header>
                <AutoForm schema={ProfileSchema} onSubmit={submit} model={props.profile}>
                  <Segment>
                    <Form.Group widths='equal'>
                      <TextField name='firstName'/>
                      <TextField name='lastName'/>
                    </Form.Group>
                    <TextField name='website'/>
                    {socialSitesTemp.map((social, index) => {
                      return <TextField label={`${social.provider}`}
                                        name={`socials.${index}.link`} key={index}/>;
                    })}
                    <TextField name='image'/>
                    <NumField name='zipCode' decimal={false}/>
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

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  profile: PropTypes.object,
};
