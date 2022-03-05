import React from 'react';
import { useSelector } from 'react-redux';

import Link from '../UI/Link';

import { canPlaySlots } from '../../../utils/slotsUtils';

const MainMenu = () => {
  const slotsDateRun = useSelector((state) => state.portal.slotsDateRun);

  const allowSlots = canPlaySlots(slotsDateRun);
  
  return (
    <>
      <h2>Welcome to the CBL Main Menu.<br/>What would you like to do?</h2>
      <Link url='/portal/starterPack' text='Claim Starter Pack' />
      <Link url='/portal/packs' text='Buy Packs' />
      <Link url='/portal/combine' text='Combine Cards' />
      <Link url='/portal/exchange' text='Access the Exchange' />
      <Link url='/portal/betting' text='Place Bets' />
      <Link url='/portal/trivia' text='Answer Trivia' />
      { allowSlots && <Link url='/portal/slots' text='Play the Slots' /> }
    </>
  );
}

export default MainMenu;