import React from 'react';
import { Grid, Image, Header, Icon, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyComponent extends React.Component {
  render() {
    return (
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={this.props.company.image} size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{this.props.company.companyName}</Header>
              <Header as='h3'><Icon className="map marker alternate icon"/>
                {this.props.company.address}
              </Header>
              <Container>
                <Link to={this.props.company.twitter}><Icon className="twitter icon"/></Link>
                <Link to={this.props.company.linkedin}><Icon className="linkedin icon"/></Link>
                <Link to={this.props.company.github}><Icon className="github icon"/></Link>
                <Link to={this.props.company.email}><Icon className="envelope outline icon"/></Link>
              </Container>
            </Grid.Column>

          </Grid.Row>

        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
CompanyComponent.propTypes = {
  company: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CompanyComponent);
