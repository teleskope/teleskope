import React from 'react';
import { Card, Icon, Grid, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// const summaryMaxLen = 180;

const imageStyle = {
  width: '100%',
};

export default function CompanyCard(props) {

  const { companyName, address, website, summary } = props.company;
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
            <List.Item>{`Positions Open: 3`}</List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='globe' />
            {website}
          </a>
        </Card.Content>
      </Card>       
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
