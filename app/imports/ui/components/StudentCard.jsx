import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function StudentCard(props) {
  const { firstName, lastName, website, _id, summary, image } = props.student;
  const summaryMaxLen = 150;

  return (
      <Card raised>
          <Label attached='top' size='big' >
            {`${firstName} ${lastName}`}
          </Label>
          <Link to={`/companies/${_id}`}>
            <Image src={image} className="companyCardImage" style={{ top: '17px' }}/>
        </Link>

        <Card.Content>
          <br/>
          <Card.Meta>
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
