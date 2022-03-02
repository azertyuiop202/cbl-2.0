import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default () => {
  return (
    <Container
      style={{
        width: '750px',
        minHeight: '850px',
        padding: '2em',
        textAlign: 'center',
        color: 'white',
        backgroundImage: 'url(https://images.hdqwalls.com/download/abstract-spiral-4k-nz-800x1280.jpg)',
        backgroundPosition: 'top center',
        backgroundRepeat: 'repeat-y',
        backgroundAttachment: 'cover',
        backgroundSize: 'auto',
      }}>
      <Outlet />
    </Container>
  );
}