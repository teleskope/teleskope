import React from 'react';
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
  const { name, website, _id, zipCode, jobs } = props.company;
  const city = zipcodes.lookup(zipCode);
  const handleFollow = () => {
    props.onFollow(props.favorited, _id);
  };

  return (
      <Card raised>
          <div style={{ position: 'relative' }}>
            <Image src={image !== undefined ? image :
                'https://www.bigredcloud.com/wp-content/uploads/Tthree-ways-your-company-can-benefit-from-' +
                'collaborating-with-other-companies.jpg'} style={imageStyle} centered />
            <Link to={`/companies/${_id}`} style={{ color: 'white' }}>
              <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{name}</h1>
            </Link>
            <Icon
              link
              name={ props.favorited ? 'star' : 'star outline'}
              style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}
              onClick={(() => handleFollow())}
              color={ props.favorited ? 'yellow' : 'black'}
            />
          </div>
        <Card.Content>
          <Card.Header></Card.Header>
          {city != null ? (
            <Card.Meta>
              <Icon name='map marker alternate'/>
              <span>{`${city.city}, ${city.state}`}</span>
            </Card.Meta>
          ) : ''}
          {/* <Card.Description>{summary.substring(0, summaryMaxLen) + '...'}</Card.Description> */}
          {website != null ? (
            <List>
              <Icon name='globe' />
              <a href={website}>{website}</a>
            </List>
          ) : ''}
        </Card.Content>
        <Card.Content extra>
            <Link to={`/companies/${_id}`}>
              <List.Item>{`${jobs.length} Listed Opportunities`}</List.Item>
            </Link>
        </Card.Content>
      </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  match: PropTypes.string,
  onFollow: PropTypes.func,
  favorited: PropTypes.bool,
};
