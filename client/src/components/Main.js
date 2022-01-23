import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Album from './Album/Album';
import Betting from './Betting/Betting';
import CardList from './CardList/CardList';
import CelebCollection from './Collection/CelebCollection';
import TypeCollection from './Collection/TypeCollection';
import Heatmap from './Heatmap/Heatmap';
import Login from './Login/Login';
import Logout from './Login/Logout';
import MyCards from './MyCards/MyCards';
import Orders from './Orders/Orders';
import Slots from './Slots/Slots';
import SpecialVote from './SpecialVote/SpecialVote';
import Trades from './Trades/Trades';
import TriviaAnswers from './TriviaAnswers/TriviaAnswers';
import UserDashboard from './UserDashboard/UserDashboard';
import Wishlist from './Wishlist/Wishlist';

export default () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return !isLoggedIn ? (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact={false} path='*' element={<Navigate to='/login' />} />
    </Routes>
  ) : (
    <Routes>
      <Route exact path='/' element={<UserDashboard />} />
      <Route exact path='/1celeb' element={<CelebCollection />} />
      <Route exact path='/1type' element={<TypeCollection />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/logout' element={<Logout />} />
      <Route exact path='/album' element={<Album />} />
      <Route exact path='/betting' element={<Betting />} />
      <Route exact path='/cardList' element={<CardList />} />
      <Route exact path='/heatmap' element={<Heatmap />} />
      <Route exact path='/myCards' element={<MyCards />} />
      <Route exact path='/orders' element={<Orders />} />
      <Route exact path='/slots' element={<Slots />} />
      <Route exact path='/specialVote' element={<SpecialVote />} />
      <Route exact path='/trades' element={<Trades />} />
      <Route exact path='/triviaAnswers' element={<TriviaAnswers />} />
      <Route exact path='/wishlist' element={<Wishlist />} />
      <Route exact={false} path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}