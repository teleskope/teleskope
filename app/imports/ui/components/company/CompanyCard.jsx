import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';
import { Profiles } from '../../../api/profile/profile';

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: '150px',
};

export default function CompanyCard(props) {
  const { name, website, _id, zipCode, image } = props.company;
  const city = zipcodes.lookup(zipCode);
  const email = Meteor.user().emails[0].address;
  const profile = Profiles.findOne({ owner: email });
  const isFavorited = Profiles.findOne({ _id: profile._id }).following.includes(_id);
  const [favorited, setFavorited] = useState(isFavorited);

  const handleFollow = () => {
    setFavorited(!favorited);
    if (!favorited) {
      Meteor.call('followCompany', _id);
    } else {
      Meteor.call('unfollowCompany', _id);
    }
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
              name={ favorited ? 'star' : 'star outline'}
              style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}
              onClick={(() => handleFollow())}
              color={ favorited ? 'yellow' : 'black'}
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
              <List.Item>{'3 Listed Opportunities'}</List.Item>
            </Link>
        </Card.Content>
      </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  match: PropTypes.string,
  onFollow: PropTypes.func,
};
