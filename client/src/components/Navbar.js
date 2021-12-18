import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <Menu style={{ marginTop: '5px', backgroundColor: '#F1F3F4' }}>
      <Menu.Item as={Link} to='/'>Dashboard</Menu.Item>
      <Menu.Item as={Link} to='/myCards'>Sort</Menu.Item>
    </Menu>
  );
}

export default Navbar;