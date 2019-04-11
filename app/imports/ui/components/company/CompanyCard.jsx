import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: '150px',
};

export default function CompanyCard(props) {
  const { companyName, website, _id, zipCode } = props.company;
  const city = zipcodes.lookup(zipCode);

  const [favorited, setFavorited] = useState(false);

  return (
      <Card raised>
          <div style={{ position: 'relative' }}>
            <Image src='https://via.placeholder.com/150' style={imageStyle} centered></Image>
            <Link to={`/companies/${_id}`} style={{ color: 'white' }}>
              <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{companyName}</h1>
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
          <List>
            <Icon name='globe' />
            <a href={website}>{website}</a>
          </List>
        </Card.Content>
        <Card.Content extra>

            <Link to={`/companies/${_id}`}>
              <List.Item>{'3 Listed Opportunities'}</List.Item>
            </Link>
        </Card.Content>
      </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  match: PropTypes.string,
};
