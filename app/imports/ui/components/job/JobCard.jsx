import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';


export default function JobCard(props) {
  const { job, _id, zipCode } = props.job;
  const city = zipcodes.lookup(zipCode);

  const [favorited, setFavorited] = useState(false);

  return (
      <Card raised>
          <div style={{ position: 'relative' }}>
            <Link to={`/jobs/${_id}`} style={{ color: 'white' }}>
              <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{job}</h1>
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
      </Card>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  match: PropTypes.string,
};
