import React from 'react';
import { Grid, Segment, Header, Button, Modal, Message, Form } from 'semantic-ui-react';
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
            content='Edit'
            color='green'
        />} closeIcon>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Jobs</Header>
        <React.Fragment>
          <Form onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                  label="Job Title"
                  iconPosition="left"
                  name="job.$.title"
                  type="text"
                  placeholder="Job Title"
                  onChange={this.handleChange}
                  required
              />
              <Form.Select
                  label="Employment Type"
                  iconPosition="left"
                  name="jobs.$.employmentType"
                  options={employmentType}
                  placeholder="Employment Type"
                  onChange={this.handleChange}
                  required
              />
              <Form.Input fluid
                          label="Requirements"
                          name="job.$.requirements"
                          type="text"
                          placeholder="What the employee must have."
                          onChange={this.handleChange}
                          required
              />
              <Form.Input fluid
                          label="Description"
                          name="job.$.description"
                          type="text"
                          placeholder="A brief summary of the work that will be performed"
                          onChange={this.handleChange}
                          required
              />
              <Form.Input
                  label="Skills"
                  name="jobs.$.skills"
                  type="text"
                  placeholder="What skills would the employee need to be successful at this position"
                  onChange={this.handleChange}
              />

              <Form.Button content="Submit" fluid primary/>
            </Segment>
          </Form>
          {this.state.error === '' ? ('') :
              (
                  <Message
                      error
                      header="Add was not successful"
                      content={this.state.error}
                  />
              )}
        </React.Fragment>
            </Grid.Column>
          </Grid>
        </Modal>
    );
  }
}


export default AddJob;
