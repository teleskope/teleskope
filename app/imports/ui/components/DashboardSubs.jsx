import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Menu } from 'semantic-ui-react';

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
                      >
                      {/* TODO recent notification labels for each company */}
                      {/* <Label color='teal'></Label> */} 
                      {company.name}
                   </Menu.Item>;
    });
  }

  render() {
    const { activeItem } = this.state;
    const myCompanies = this.myCompanies();

    return (
      <Menu size='large' vertical>
        {/* only show if logged in as company TODO  */}
        <Menu.Item><Menu.Header>My Companies</Menu.Header></Menu.Item>
        { myCompanies }

        <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Updates
        </Menu.Item>
      </Menu>
    );
  }
}

DashboardSubs.propTypes = {
  myCompanies: PropTypes.array,
};
