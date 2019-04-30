import React from 'react';
import { Card, Header, Modal, Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';



export default function JobCard(props) {
  const { zipCode, title, employmentType, description, requirements } = props.job;
  const city = zipcodes.lookup(zipCode);

  return (
      <Card id='modal' raised>
        <Card.Content id='cardHeader'>
          <Header id='cardHeader'>{title} <Modal id='modal' trigger={<Button
              content='View Job'
              color='black'
              floated='right'
              inverted
          />} closeIcon>
            <div id='modalHeader'>
              <Modal.Header as='h1'>{title}</Modal.Header>
              <Modal.Content>
                <Container>
                  <Button
                      content='Apply'
                      icon='space shuttle'
                      color='black'
                      inverted
                      toggle
                  />
                </Container>
              </Modal.Content>
            </div>
            <Container id='modalComponent' text>
              <Modal.Description>
                <Header>Location</Header>
                <p>{city.city}, {city.state}</p>
              </Modal.Description>
            </Container>
            <Container id='modalComponent' text>
              <Modal.Description>
                <Header>Requirements</Header>
                <p>{requirements}</p>
              </Modal.Description>
            </Container>
            <Container id='modalComponent' text>
              <Modal.Description>
                <Header>Description</Header>
                <p>{description}</p>
              </Modal.Description>
            </Container>
            <Container id='modalFooter'/>
          </Modal>
          </Header>
        </Card.Content>
        <Card.Content description={employmentType} />
        <Card.Content extra>
          {`${city.city}, ${city.state}`}
        </Card.Content>
      </Card>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  match: PropTypes.string,
};
