import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';
import Logout from './Login/Logout';
import CardList from './UserHub/CardList/CardList';
import TopXX from './UserHub/Ranking/TopXX';
import { default as hubRoutes } from './UserHub/routes';

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
      { hubRoutes() }
      <Route exact={false} path='*' element={<Navigate to='/hub' />} />
    </Routes>
  );
}