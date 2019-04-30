import React from 'react';
import { Card, Header, Modal, Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';

const cardHeader = {
  backgroundColor: '#455880',
  fontFamily: 'Lato, sans-serif',
  color: '#F5F0F0',
};

const modal = {
  backgroundColor: '#F5F0F0',
};
const modalHeader = {
  backgroundColor: '#455880',
  fontFamily: 'Lato, sans-serif',
  color: '#F5F0F0',
  paddingBottom: '10px',
  paddingTop: '10px',
  paddingLeft: '30px',
};

const modalComponent = {
  paddingTop: '10px',
  paddingBottom: '10px',
  fontFamily: 'lato, sans-serif',
};

const modalFooter = {
  backgroundColor: '#455880',
  paddingTop: '15px',
  paddingBottom: '15px',
};


export default function JobCard(props) {
  const { zipCode, title, employmentType, description, requirements } = props.job;
  const city = zipcodes.lookup(zipCode);

  return (
      <Card style={modal} raised>
        <Card.Content style={cardHeader}>
          <Header style={cardHeader}>{title} <Modal style={modal} trigger={<Button
              content='View Job'
              color='black'
              floated='right'
              inverted
          />} closeIcon>
            <div style={modalHeader}>
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
                  <Button
                      content='Follow'
                      icon='star'
                      color='black'
                      inverted
                      toggle
                  />
                </Container>
              </Modal.Content>
            </div>
            <Container style={modalComponent} text>
              <Modal.Description>
                <Header>Location</Header>
                <p>{city.city}, {city.state}</p>
              </Modal.Description>
            </Container>
            <Container style={modalComponent} text>
              <Modal.Description>
                <Header>Requirements</Header>
                <p>{requirements}</p>
              </Modal.Description>
            </Container>
            <Container style={modalComponent} text>
              <Modal.Description>
                <Header>Description</Header>
                <p>{description}</p>
              </Modal.Description>
            </Container>
            <Container style={modalFooter}/>
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
