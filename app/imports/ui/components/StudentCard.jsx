import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Label, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function StudentCard(props) {
  const { firstName, lastName, website, _id, summary, image, owner } = props.student;
  const summaryMaxLen = 150;

  return (
      <Card raised style={{ maxWidth: '300px' }}>
          <Label attached='top' size='big' style={{ zIndex: 2 }}>
            <Link to={`/students/${_id}`} style={{ color: '#000' }}>
                  {`${firstName} ${lastName}`}</Link>
          </Label>
        <Link to={`/students/${_id}`}>
            <Image src={image} className="studentCardImage" />
        </Link>
        <Card.Content>
          <Card.Meta>
            <List>
              <List.Item>
                <List.Icon name='envelope'/>
                <List.Content as='a' href={owner} style={{ color: '#0E6EB8' }}>{owner}</List.Content>
              </List.Item>
              { website ? (
                <List.Item>
                  <Icon name='globe'/>
                  <List.Content as='a' href={website} style={{ color: '#0E6EB8' }}>{website}</List.Content>
                </List.Item>
              ) : ''}
            </List>
          </Card.Meta>
        <Card.Description>
          {summary ? `${summary.substring(0, summaryMaxLen)}...` : ''}
        </Card.Description>
        </Card.Content>
      </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  match: PropTypes.string,
};
