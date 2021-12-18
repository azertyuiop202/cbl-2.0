import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import MyCards from './MyCards/MyCards';
import UserDashboard from './UserDashboard/UserDashboard';

export default () => (
  <Routes>
    <Route exact path='/' element={<UserDashboard />} />
    <Route exact path='/myCards' element={<MyCards />} />
    <Route exact={false} path='*' element={<Navigate to='/' />} />
  </Routes>
);