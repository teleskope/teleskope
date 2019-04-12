import React from 'react';
import { Grid, Icon, Header, Button, Segment, Image, Container, Divider } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react/dist/commonjs/collections/Table';
//import logo from '../../../public/images/TeleSKOPE.png';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

      <Container fluid className="uhire-landing-background">
        {/*<Segment basic attached="top" inverted padded="very" size="large" textAlign="center">*/}
          {/*<Header as="h1" size="huge">TeleSkope</Header>*/}
            {/*/!*<Image src="images/TeleSKOPE.png" size='medium' />*!/*/}
          {/*<Header as="h2" size="medium">Helping employers find stars</Header>*/}
          {/*<Header as="h3">New?  Choose a role below and register!</Header>*/}
          {/*<Link to={`/signup`} key="StudentSignup">*/}
            {/*<Button>Student</Button>*/}
          {/*</Link>*/}
          {/*<Link to={`/signup`} key="CompanySignup">*/}
            {/*<Button>Company</Button>*/}
          {/*</Link>*/}

          {/*{this.props.currentUser ? (*/}
            {/*[<Link to={`/signup`} key="test1">*/}
              {/*<Button>test 1</Button>*/}
            {/*</Link>,*/}
            {/*<Link to={`/signup`} key="test2">*/}
              {/*<Button>test 2</Button>*/}
            {/*</Link>,*/}
            {/*]*/}
          {/*) : ''}*/}

        {/*</Segment>*/}
        <Container>
          <Header centered inverted as="h1" size="huge">TeleSkope</Header>
        </Container>
        <Grid centered container stackable columns={3}>
          <Grid.Column textAlign='center'>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Grid.Row>
              <Header inverted as="h1" size="huge">TeleSkope</Header>
            </Grid.Row>

            <Divider hidden />

            <Grid.Row >
              <Header inverted as="h2" size="medium">Helping employers find stars</Header>
            </Grid.Row>

            <Divider hidden />
            <Divider hidden />
            <Divider hidden />

            <Grid.Row>
              <Header inverted as="h3">New?  Choose a role below and register!</Header>
            </Grid.Row>
            <Grid.Row>
              <Link to={`/signup`} key="StudentSignup">
                <Button>Student</Button>
              </Link>
              <Link to={`/signup`} key="CompanySignup">
                <Button>Company</Button>
              </Link>

              {this.props.currentUser ? (
                  [<Link to={`/signup`} key="test1">
                    <Button>test 1</Button>
                  </Link>,
                  ]
              ) : ''}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column textAlign='center'>
          </Grid.Column>
        </Grid>
        <Grid centered container stackable columns={3}>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name="star outline" />
            <Header as="h1" >1,000</Header>
            <Header as="h3" >Companies looking for stars</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name="connectdevelop" />
            <Header as="h1" >2,000</Header>
            <Header as="h3" >connections made</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name="money bill alternate outline" />
            <Header as="h1" >1,210</Header>
            <Header as="h3" >Career opportunities available</Header>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LandingContainer);
