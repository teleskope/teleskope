import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, List, Label, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import zipcodes from 'zipcodes';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

const imageStyle = {
  width: '100%',
  height: '150px',
  // objectFit: 'cover',
  maxHeight: '150px',
  // filter: 'brightness(70%)',
  top: '17px',
};

export default function CompanyCard(props) {
  const { name, website, _id, zipCode, jobs, image } = props.company;
  const city = zipcodes.lookup(zipCode);
  const handleFollow = () => {
    props.onFollow(props.favorited, _id);
  };
  let label = null;
  // if (Roles.userIsInRole(Meteor.userId(), 'student')) {
  //     label = <Label as='a' color='orange' ribbon='right'
  //                    style={{ position: 'relative', top: '-11em',
  //                     visibility: props.company.matches ? 'visible' : 'hidden' }}>
  //                   {props.company.matches} skill matches!
  //                </Label>;
  // }

  let label2 = null;
  if (Roles.userIsInRole(Meteor.userId(), 'student')) {
    label2 = { as: 'a', color: 'orange', ribbon: 'right',
      content: 'skill matches!' };
  }

  return (
      <Card raised>
        {/*<div style={{ position: 'relative' }}>*/}
          {/*<Image src={image} style={imageStyle} centered />*/}
          {/*<Link to={`/companies/${_id}`} style={{ color: 'white' }}>*/}
            {/*<h1 style={{ position: 'absolute', left: 0, top: 0, margin: '0.5rem' }}>{name}</h1>*/}
          {/*</Link>*/}
          {/*{Roles.userIsInRole(Meteor.userId(), 'student') ? (*/}
            {/*<Icon*/}
              {/*link*/}
              {/*name={ props.favorited ? 'star' : 'star outline'}*/}
              {/*style={{ position: 'absolute', right: 0, top: 0, margin: '0.5rem' }}*/}
              {/*onClick={(() => handleFollow())}*/}
              {/*color={ props.favorited ? 'yellow' : 'yellow'}*/}
            {/*/>*/}
          {/*) : ''}*/}
        {/*</div>*/}

        <Label attached='top' size='big' to={`/companies/${_id}`} >
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
        <Image src={image} style={imageStyle} label={label2} />


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
