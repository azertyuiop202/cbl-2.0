import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';
import Logout from './Login/Logout';
import { default as hubRoutes } from './UserHub/routes';
import { default as portalRoutes } from './Portal/routes';

export default () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return !isLoggedIn ? (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact={false} path='*' element={<Navigate to='/login' />} />
    </Routes>
  ) : (
    <Routes>
      <Route exact path='login' element={<Login />} />
      <Route exact path='logout' element={<Logout />} />
      {/* { hubRoutes() } */}
      { portalRoutes() }
      <Route exact={false} path='*' element={<Navigate to='/portal' />} />
    </Routes>
  );
}