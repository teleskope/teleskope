import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: '150px',
};


export default function JobCard(props) {
  const { zipCode, title, _id } = props.job;
  const city = zipcodes.lookup(zipCode);

  const [favorited, setFavorited] = useState(false);

  return (
      <Card raised>
        <div style={{ position: 'relative' }}>
          <Image src='https://via.placeholder.com/150' style={imageStyle} centered></Image>
          <Link to={`/jobs/${_id}`} style={{ color: 'white' }}>
            <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{title}</h1>
          </Link>
          <Icon
              link
              name={ favorited ? 'heart' : 'heart outline'}
              style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}
              onClick={(() => setFavorited(!favorited))}
          />
        </div>
        <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>
            <Icon name='map marker alternate'/>
            <span>{`${city.city}, ${city.state}`}</span>
          </Card.Meta>
          {/* <Card.Description>{summary.substring(0, summaryMaxLen) + '...'}</Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <Link to={`/jobs/${_id}`}>
          </Link>
        </Card.Content>
      </Card>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  match: PropTypes.string,
};
