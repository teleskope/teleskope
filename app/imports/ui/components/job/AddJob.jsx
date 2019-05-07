import React from 'react';
import { CompanySchema } from '/imports/api/company/company';
import PropTypes from 'prop-types';
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddJob extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        employmentType: '',
        requirements: '',
        description: '',
        skills: '',
        error: '',
      };
   }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }


  /** On submit, insert the data. */
  submit(data) {
    const { title, employmentType, requirements, description, skills } = data;
    const job = { title, employmentType, requirements, description, skills };
    Meteor.call('addJob', this.company, job);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Modal id='modal' trigger={<Button
            content='Add Job'
            color='green'
        />} closeIcon>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Job</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={CompanySchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='jobs.$.title'/>
                <SelectField name='jobs.$.employmentType'/>
                <LongTextField name='jobs.$.requirements'/>
                <LongTextField name='jobs.$.description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </Modal>
    );
  }
}


export default AddJob;
