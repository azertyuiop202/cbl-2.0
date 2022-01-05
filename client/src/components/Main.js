import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Album from './Album/Album';
import Login from './Login/Login';
import Logout from './Login/Logout';
import MyCards from './MyCards/MyCards';
import Orders from './Orders/Orders';
import Slots from './Slots/Slots';
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
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/logout' element={<Logout />} />
      <Route exact path='/album' element={<Album />} />
      <Route exact path='/myCards' element={<MyCards />} />
      <Route exact path='/orders' element={<Orders />} />
      <Route exact path='/slots' element={<Slots />} />
      <Route exact path='/trades' element={<Trades />} />
      <Route exact path='/triviaAnswers' element={<TriviaAnswers />} />
      <Route exact path='/wishlist' element={<Wishlist />} />
      <Route exact={false} path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}