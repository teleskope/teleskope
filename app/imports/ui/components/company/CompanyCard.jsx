import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: '150px',
  filter: 'brightness(70%)',
};

export default function CompanyCard(props) {
  const { name, website, _id, zipCode, jobs, image } = props.company;
  const city = zipcodes.lookup(zipCode);
  const handleFollow = () => {
    props.onFollow(props.favorited, _id);
  };

  const label =  <Label as='a' color='orange' ribbon='right'
                        style={{ position: 'relative', top: '-11em', visibility: props.company.matches ? 'visible' : 'hidden' }}>
                   {props.company.matches} skill matches!
                 </Label>;

  return (
      <Card raised>
        <div style={{ position: 'relative' }}>
          <Image src={image} style={imageStyle} centered />
          <Link to={`/companies/${_id}`} style={{ color: 'white' }}>
            <h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{name}</h1>
          </Link>
          <Icon
            link
            name={ props.favorited ? 'star' : 'star outline'}
            style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}
            onClick={(() => handleFollow())}
            color={ props.favorited ? 'yellow' : 'yellow'}
          />

        </div>
        <Card.Content>
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
        <Card.Content extra >{label}
            <Link to={`/companies/${_id}`} style={{ position: 'absolute', left: '10px', display: 'inline', float: 'left'}}>
              <List.Item >{`${jobs.length} Listed Opportunities`}</List.Item>
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
