import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import Container from './Container';
import MainMenu from './MainMenu/MainMenu';

export default () => (
  <Route exact path="portal" element={<Container />} >
    <Route exact path="" element={<MainMenu />} />
    <Route exact={false} path='*' element={<Navigate to='/portal' />} />
  </Route>
);