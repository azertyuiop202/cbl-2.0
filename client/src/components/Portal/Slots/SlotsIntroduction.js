import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button';
import Link from '../UI/Link';
import Title from '../UI/Title';

import fetch from '../../../utils/fetch';
import { canPlaySlots } from '../../../utils/slotsUtils';

const SlotsIntroduction = () => {
  const slotsDateRun = useSelector((state) => state.portal.slotsDateRun);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!canPlaySlots(slotsDateRun)) {
      navigate('/portal');
      return;
    }
  }, []);
  
  const startSlots = () => {
    const runID = Math.floor(Math.random() * 9999999) + 1;
    
    dispatch({ type: 'UPDATE_SLOTS_RUN_ID', payload: runID });

    fetch('/api/portal/slots/submit', 'POST', true, { runID, gamename: 'startplay' });

    navigate('/portal/slots/spin');
  }

  return (
    <>
      <Title>Slots</Title>

      <br/>

      <p><strong>
        Each user can play the Slots once<br/>
        per day, Eastern Daylight Time.
      </strong></p>

      <br/>

      <p>
        <strong>Potential Prizes:</strong><br/>
        Weekly Lotto Ticket<br/>
        5 Exchange Points<br/>
        Random Base-XIF Card<br/>
        250 Tokens<br/>
        3 Gold Coins
      </p>

      <br/>

      <p>
        You get 5 spins of the wheel and could<br/>
        potentially win up to 5 prizes.
      </p>

      <br/>

      <strong>You must play to the end to claim the prizes!</strong>

      <br/><br/>

      <Button callback={startSlots} text="Let's Spin" />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default SlotsIntroduction;