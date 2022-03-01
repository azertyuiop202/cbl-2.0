import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default () => (
  <>
    <Menu.Item as={Link} to='/hub/'>Dashboard</Menu.Item>
    <Menu.Item as={Link} to='/hub/myCards'>Sort</Menu.Item>
    <Menu.Item as={Link} to='/hub/album'>Album</Menu.Item>
    <Menu.Item as={Link} to='/hub/orders'>Orders</Menu.Item>
    <Menu.Item as={Link} to='/hub/triviaAnswers'>Trivia</Menu.Item>
    <Menu.Item as={Link} to='/hub/slots'>Slots</Menu.Item>
    <Menu.Item as={Link} to='/hub/trades'>Trades</Menu.Item>
    <Menu.Item as={Link} to='/hub/wishlist'>Wishlist</Menu.Item>
    <Menu.Item as={Link} to='/hub/cardList'>CardList</Menu.Item>
    <Menu.Item as={Link} to='/hub/specialVote'>SpecialVote</Menu.Item>
    <Menu.Item as={Link} to='/hub/betting'>Betting</Menu.Item>
    <Menu.Item as={Link} to='/hub/heatmap'>Heatmap</Menu.Item>
    <Menu.Item as={Link} to='/hub/1celeb'>1Celeb</Menu.Item>
    <Menu.Item as={Link} to='/hub/1type'>1Type</Menu.Item>
    <Menu.Item as={Link} to='/hub/collection'>Collection</Menu.Item>
    <Menu.Item as={Link} to='/hub/search'>Search</Menu.Item>
    <Menu.Item as={Link} to='/hub/top25'>Top25</Menu.Item>
  </>
);