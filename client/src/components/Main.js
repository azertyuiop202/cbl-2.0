import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Album from './Album/Album';
import Login from './Login/Login';
import Logout from './Login/Logout';
import MyCards from './MyCards/MyCards';
import Orders from './Orders/Orders';
import TriviaAnswers from './TriviaAnswers/TriviaAnswers';
import UserDashboard from './UserDashboard/UserDashboard';

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
      <Route exact path='/triviaAnswers' element={<TriviaAnswers />} />
      <Route exact={false} path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}