import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import Combine from './Combine/Combine';
import CombineDetails from './Combine/CombineDetails';
import Container from './Container';
import MainMenu from './MainMenu/MainMenu';
import StarterPack from './StarterPack/StarterPack';
import StarterPackDetails from './StarterPack/StarterPackDetails';

export default () => (
  <Route exact path="portal" element={<Container />} >
    <Route exact path="" element={<MainMenu />} />
    <Route exact path="combine" element={<Combine />} />
    <Route exact path="combine/:id" element={<CombineDetails />} />
    <Route exact path="starterPack" element={<StarterPack />} />
    <Route exact path="starterPack/:id" element={<StarterPackDetails />} />
    <Route exact={false} path='*' element={<Navigate to='/portal' />} />
  </Route>
);