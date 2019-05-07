import { Companies, CompanySchema } from '../../../api/company/company';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react/dist/commonjs/collections/Grid';
import AutoForm from '../../pages/ShowCompany';


export default function AddJob(props) {




handleSubmit(data){
  const { title, employmentType, description, requirements } = data;
  Meteor.call(addJob(company_id, data));
    const reportError = (error, callback) => {
      if (callback) {
        callback(error);
      } else {
        throw error;
      }
    };
}

  return (
      <Modal id='modal' trigger={<Button
      content='Edit'
      color='green'
  />} closeIcon>
    <Grid container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Add Job</Header>
        <AutoForm schema={CompanySchema} onSubmit={this.submit} model={this.props.company}>
          <Segment>
            <TextField name='title'/>
            <SelectField name='employmentType'/>
            <TextField name='requirements'/>
            <LongTextField name='description'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  </Modal>

)}