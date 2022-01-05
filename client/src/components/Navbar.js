import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Dropdown, Menu } from 'semantic-ui-react';

import getUser from '../utils/getUser';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <Menu style={{ marginTop: '5px', backgroundColor: '#F1F3F4' }}>
      <Menu.Item as={Link} to='/'>Dashboard</Menu.Item>
      <Menu.Item as={Link} to='/myCards'>Sort</Menu.Item>
      <Menu.Item as={Link} to='/album'>Album</Menu.Item>
      <Menu.Item as={Link} to='/orders'>Orders</Menu.Item>
      <Menu.Item as={Link} to='/triviaAnswers'>Trivia</Menu.Item>
      <Menu.Item as={Link} to='/slots'>Slots</Menu.Item>
      <Menu.Item as={Link} to='/trades'>Trades</Menu.Item>
      <Menu.Item as={Link} to='/wishlist'>Wishlist</Menu.Item>

      <Menu.Menu position='right'>
        { isLoggedIn ? (
          <Dropdown item text={ getUser().username }>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/logout'>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item name='login' as={Link} to='/login' />
        ) }
      </Menu.Menu>
    </Menu>
  );
}

export default Navbar;