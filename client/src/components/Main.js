import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';
import Logout from './Login/Logout';
import MyCards from './MyCards/MyCards';
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
      <Route exact path='/myCards' element={<MyCards />} />
      <Route exact={false} path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}