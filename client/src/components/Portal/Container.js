import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default () => {
  return (
    <Container style={{ width: '500px', textAlign: 'center' }}>
      <Outlet />
    </Container>
  );
}