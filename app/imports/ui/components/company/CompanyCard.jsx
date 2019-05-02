import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Card, Icon, Image, List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

export default function CompanyCard(props) {
  const { name, website, _id, zipCode, jobs, image } = props.company;
  const city = zipcodes.lookup(zipCode);
  const handleFollow = () => {
    props.onFollow(props.favorited, _id);
  };

  let label2 = null;
  if (Roles.userIsInRole(Meteor.userId(), 'student') && props.company.matches > 0) {
    label2 = { as: 'a', color: 'orange', ribbon: 'right',
      content: `${props.company.matches} skill matches!` };
  }

  return (
      <Card raised>
        <Label attached='top' size='big' to={`/companies/${_id}`} as={NavLink} activeClassName="active" >
          {name}
          {Roles.userIsInRole(Meteor.userId(), 'student') ? (
              <Icon
                  link
                  name={ props.favorited ? 'star' : 'star outline'}
                  style={{ position: 'absolute', right: 0, top: '7px', margin: '0.5rem' }}
                  onClick={(() => handleFollow())}
                  color={ props.favorited ? 'yellow' : 'yellow'}
              />
          ) : ''}
        </Label>
        <Link to={`/companies/${_id}`}>
          <Image src={image} className="companyCardImage" style={{ top: '17px' }} label={label2}/>
        </Link>
        <Card.Content>
          <br/>
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
        <Card.Content extra >
            <Link to={`/companies/${_id}`} style={{ left: '10px',
                  display: 'inline', float: 'left' }}>
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
