import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

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

  myFollowing() {
    const { activeItem } = this.state;
    return _.map(this.props.profile.following, (company) => {
            return <Menu.Item
                      name={company}
                      active={activeItem === company}
                      onClick={this.handleItemClick}
                      key={company}
                      // link href={`/#/companies/${company._id}`}
                      >
                      {company}
                   </Menu.Item>;
    });
  }

  render() {
    return this.props.profile.role === 'company' ? this.renderCompany() : this.renderStudent();
  }

  renderCompany() {
    const myCompanies = this.myCompanies();

    return (
      <Menu vertical fluid>
        <Menu.Item><Menu.Header>My Companies</Menu.Header></Menu.Item>
        { myCompanies }
      </Menu>
    );
  }

  renderStudent() {
    const myCompanies = this.myCompanies();
    return (
      <Menu vertical fluid>
        <Menu.Item><Menu.Header>Following</Menu.Header></Menu.Item>
        { myCompanies }
      </Menu>
    );
  }
}

DashboardSubs.propTypes = {
  myCompanies: PropTypes.array,
  profile: PropTypes.object,
};
