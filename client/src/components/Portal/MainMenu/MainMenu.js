import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Link from '../UI/Link';

import { canPlaySlots } from '../../../utils/slotsUtils';
import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';

const MainMenu = () => {
  const [allowStarterPack, setAllowStarterPack] = useState(false);
  const [allowSlots, setAllowSlots] = useState(false);

  const slotsDateRun = useSelector((state) => state.portal.slotsDateRun);

  useEffect(() => {
    fetch(`/api/portal/starterPacks/${getUser().id}/isAvailable`).then(setAllowStarterPack);

    setAllowSlots(canPlaySlots(slotsDateRun));
  }, []);
  
  return (
    <>
      <h2>Welcome to the CBL Main Menu.<br/>What would you like to do?</h2>
      { allowStarterPack && <Link url='/portal/starterPack' text='Claim Starter Pack' /> }
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