import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export default class DashboardSubs extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  myCompanies() {
    const { activeItem } = this.state;
    return _.map(this.props.myCompanies, (company) => {
            return <Menu.Item
                      name={company.name}
                      active={activeItem === company.name}
                      onClick={this.handleItemClick}
                      key={company._id}
                      link href={`/#/companies/${company._id}`}
                      >
                      {/* TODO recent notification labels for each company */}
                      {/* <Label color='teal'></Label> */} 
                      {company.name}
                   </Menu.Item>;
    });
  }

  render() {
    const myCompanies = this.myCompanies();

    return (
      <Menu vertical fluid>
        {/* only show if logged in as company TODO  */}
        <Menu.Item><Menu.Header>My Companies</Menu.Header></Menu.Item>
        { myCompanies }
      </Menu>
    );
  }
}

DashboardSubs.propTypes = {
  myCompanies: PropTypes.array,
};
