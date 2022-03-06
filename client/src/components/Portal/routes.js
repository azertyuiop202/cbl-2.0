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
import AddGC from './Packs/AddGC';
import AddBoosters from './Packs/AddBoosters';
import ChoosePack from './Packs/ChoosePack';
import PacksInfo from './Packs/PacksInfo';
import Slots from './Slots/Slots';
import SlotsConfirmation from './Slots/SlotsConfirmation';
import SlotsIntroduction from './Slots/SlotsIntroduction';
import StarterPack from './StarterPack/StarterPack';
import StarterPackChoiceConfirmation from './StarterPack/StarterPackChoiceConfirmation';
import StarterPackConfirmation from './StarterPack/StarterPackConfirmation';
import StarterPackDetails from './StarterPack/StarterPackDetails';
import Trivia from './Trivia/Trivia';
import TriviaAnswer from './Trivia/TriviaAnswer';
import TriviaConfirmation from './Trivia/TriviaConfirmation';
import PacksConfirmation from './Packs/PacksConfirmation';

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
    <Route exact path="packs" element={<ChoosePack />} />
    <Route exact path="packs/addGC" element={<AddGC />} />
    <Route exact path="packs/addBoosters" element={<AddBoosters />} />
    <Route exact path="packs/confirmation" element={<PacksConfirmation />} />
    <Route exact path="packs/info" element={<PacksInfo />} />
    <Route exact path="slots" element={<SlotsIntroduction />} />
    <Route exact path="slots/confirmation" element={<SlotsConfirmation />} />
    <Route exact path="slots/spin" element={<Slots />} />
    <Route exact path="starterPack" element={<StarterPack />} />
    <Route exact path="starterPack/:id/confirm" element={<StarterPackChoiceConfirmation />} />
    <Route exact path="starterPack/:id/confirmation" element={<StarterPackConfirmation />} />
    <Route exact path="starterPack/:id" element={<StarterPackDetails />} />
    <Route exact path="trivia" element={<Trivia />} />
    <Route exact path="trivia/confirmation" element={<TriviaConfirmation />} />
    <Route exact path="trivia/:day" element={<TriviaAnswer />} />
    <Route exact={false} path='*' element={<Navigate to='/portal' />} />
  </Route>
);