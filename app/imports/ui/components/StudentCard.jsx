import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: '150px',
};

export default function StudentCard(props) {
  const { firstName, lastName, website, _id, owner, summary } = props.student;
  const [favorited, setFavorited] = useState(false);
  const summaryMaxLen = 150;
  const email01 = 'mailto:';
  const email02 = email01.concat(owner);
  const emailLink = email02.concat('?Subject=Applying for a job');

  return (
      <Card raised>
          <div style={{ position: 'relative' }}>
            <Image src='https://via.placeholder.com/150' style={imageStyle} centered></Image>
            <Link to={`/students/${_id}`} style={{ color: 'white' }}>
              <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{firstName} {lastName}</h1>
            </Link>
            <Icon
              link
              name={ favorited ? 'heart' : 'heart outline'}
              style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}
              onClick={(() => setFavorited(!favorited))}
            />
          </div>
        <Card.Content>
          <Card.Meta>
            <a href={emailLink} target="_top" style={{ color: '#0E6EB8' }} >{owner}</a>
            <a href={website}>
              <Icon name='globe' color='blue' style={{ position: 'absolute', right: 0, top: 157, margin: '0.5rem' }}/>
            </a>
          </Card.Meta>
        <Card.Description>
          {
           summary ? `${summary.substring(0, summaryMaxLen)}...` : ''
          }</Card.Description>
        </Card.Content>
         {/* TODO: list skills for extra card content????? */}
        {/* <Card.Content extra>{skills}</Card.Content> */}
      </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  match: PropTypes.string,
};
