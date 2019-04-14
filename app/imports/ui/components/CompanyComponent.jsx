import React from 'react';
import { Grid, Image, Header, Icon, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyComponent extends React.Component {
  render() {
    const { image, name, address, summary } = this.props.company;
    // TODO: social attributes should go in a subschema on company or user profile
    const { linkedin, github, twitter, email } = this.props.company;

    return (
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={image} size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>{name}</Header>
              <Header as='h3'><Icon className="map marker alternate icon"/>
                {address}
              </Header>
              <Container>
                <Link to={twitter}><Icon className="twitter icon"/></Link>
                <Link to={linkedin}><Icon className="linkedin icon"/></Link>
                <Link to={github}><Icon className="github icon"/></Link>
                <Link to={email}><Icon className="envelope outline icon"/></Link>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as='h2'>Company Description</Header>
            <Container>
              {summary}
            </Container>
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
