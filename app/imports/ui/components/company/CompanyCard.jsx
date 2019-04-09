import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Card, Icon, Grid, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const imageStyle = {
  width: '100%',
};

export default function CompanyCard(props) {

  const { companyName, address, website, _id } = props.company;
  return (

      <Card as='a'>
        <Image src='https://via.placeholder.com/150' style={imageStyle} centered></Image>
        <Card.Content>
          <Card.Header>{companyName}</Card.Header>
          <Card.Meta>
            <span className='date'>{address}</span>
          </Card.Meta>
          {/* <Card.Description>{summary.substring(0, summaryMaxLen) + '...'}</Card.Description> */}
          <List>
            <Link to={`/companies/${_id}`}>
              <List.Item>{`Positions Open: 3`}</List.Item>
            </Link>
          </List>
        </Card.Content>
        <Card.Content extra>
            <Icon name='globe' />
            {website}
        </Card.Content>
      </Card>       
  );
}


CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  match: PropTypes.string,
};
