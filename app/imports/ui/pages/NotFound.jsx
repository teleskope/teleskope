import React from 'react';
import { Header, Container } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: '80px' }}>
        <Header as="h2" textAlign="center" >
          <p>Page not found</p>
        </Header>
      </Container>
    );
  }
}

export default NotFound;
