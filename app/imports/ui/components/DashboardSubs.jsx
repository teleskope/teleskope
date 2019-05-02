import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Label } from 'semantic-ui-react';

export default class DashboardSubs extends Component {
  constructor() {
    super();
    this.state = { activeItem: '' };
  }

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
                      {company.name}
                   </Menu.Item>;
    });
  }

  render() {
    const myCompanies = this.myCompanies();

    return (
      <Menu vertical fluid>
        <Menu.Item>
          <Label color='teal'>{myCompanies.length}</Label>
          <Menu.Header>
            {this.props.profile.role === 'company' ? 'My Companies' : 'Following'}
          </Menu.Header>
        </Menu.Item>
        { myCompanies }
      </Menu>
    );
  }
}

DashboardSubs.propTypes = {
  myCompanies: PropTypes.array,
  profile: PropTypes.object,
};
