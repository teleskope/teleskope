import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function StudentCard(props) {
  const { firstName, lastName, website, _id, summary, image } = props.student;
  const summaryMaxLen = 150;

  return (
      <Card raised style={{maxWidth: '300px' }}>
          <Label attached='top' size='large' style={{ zIndex: 1 }}>
            {`${firstName} ${lastName}`}
          </Label>
          <Link to={`/students/${_id}`}>
            <Image src={image} className="companyCardImage" style={{}}/>
        </Link>

        <Card.Content>
          <br/>
          <Card.Meta>
            <a href={`mailto:${owner}?Subject=Hi ${firstName} ${lastName}!`} target="_top" style={{ color: '#0E6EB8' }}
            >
              {owner}
            </a>
            { website ? (
              <a href={website}>
                <Icon name='globe' color='blue'/> &nbsp;{website}
              </a>
            ) : ''}
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
