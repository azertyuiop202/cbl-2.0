import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import Betting from './Betting/Betting';
import BettingConfirmation from './Betting/BettingConfirmation';
import BettingFinalization from './Betting/BettingFinalization';
import Combine from './Combine/Combine';
import CombineDetails from './Combine/CombineDetails';
import Container from './Container';
import Exchange from './Exchange/Exchange';
import ExchangeCards from './Exchange/ExchangeCards';
import ExchangeConfirmation from './Exchange/ExchangeConfirmation';
import Instructions from './Exchange/Instructions';
import RedeemConfirmation from './Exchange/RedeemConfirmation';
import RedeemDetails from './Exchange/RedeemDetails';
import RedeemXP from './Exchange/RedeemXP';
import MainMenu from './MainMenu/MainMenu';
import StarterPack from './StarterPack/StarterPack';
import StarterPackDetails from './StarterPack/StarterPackDetails';
import Trivia from './Trivia/Trivia';
import TriviaAnswer from './Trivia/TriviaAnswer';
import TriviaConfirmation from './Trivia/TriviaConfirmation';

export default () => (
  <Route exact path="portal" element={<Container />} >
    <Route exact path="" element={<MainMenu />} />
    <Route exact path="betting" element={<Betting />} />
    <Route exact path="betting/confirmation" element={<BettingConfirmation />} />
    <Route exact path="betting/finalize" element={<BettingFinalization />} />
    <Route exact path="combine" element={<Combine />} />
    <Route exact path="combine/:id" element={<CombineDetails />} />
    <Route exact path="exchange" element={<Exchange />} />
    <Route exact path="exchange/confirmation/:id" element={<ExchangeConfirmation />} />
    <Route exact path="exchange/exchangeCards" element={<ExchangeCards />} />
    <Route exact path="exchange/instructions" element={<Instructions />} />
    <Route exact path="exchange/redeem" element={<RedeemXP />} />
    <Route exact path="exchange/redeemConfirmation/:id" element={<RedeemConfirmation />} />
    <Route exact path="exchange/redeemDetails/:id" element={<RedeemDetails />} />
    <Route exact path="starterPack" element={<StarterPack />} />
    <Route exact path="starterPack/:id" element={<StarterPackDetails />} />
    <Route exact path="trivia" element={<Trivia />} />
    <Route exact path="trivia/confirmation" element={<TriviaConfirmation />} />
    <Route exact path="trivia/:day" element={<TriviaAnswer />} />
    <Route exact={false} path='*' element={<Navigate to='/portal' />} />
  </Route>
);