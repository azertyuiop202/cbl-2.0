import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import Button from '../UI/Button';
import Link from '../UI/Link';
import Title from '../UI/Title';

import fetch from '../../../utils/fetch';

const BettingFinalization = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(1);
  const bets = useSelector((state) => state.portal.bets);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/portal/betting/title').then(setTitle);
  }, []);

  const clearBets = () => {
    dispatch({ type: 'UPDATE_BETS', payload: {} });

    navigate('/portal/betting');
  }

  const submitBets = () => {
    if (amount < 1 || amount > 10) return;

    const postData = Object.values(bets).reduce((acc, bet) => {
      return { ...acc, [bet.column]: bet.name };
    }, {});
    postData.amount = amount;
    postData.calc = odds;
    postData.calc2 = amount * odds;

    fetch('/api/portal/betting/submit', 'POST', true, postData);

    dispatch({ type: 'UPDATE_BETS', payload: {} });
    navigate('/portal/betting/confirmation');
  }

  const odds = Object.values(bets).reduce((acc, bet) => acc * bet.odds, 1).toFixed(2);

  return (
    <>
      <Title>{title}</Title>

      <p>
        Your current bet selection is: { Object.values(bets).reduce((acc, bet) => `${acc} ${bet.name}`, '') }<br/>
        Current multiplier is: x{odds}
      </p>

      <i>
        Bets with at least a x10 multiplier will receive a bonus<br/>
        x2 multiplier for free.
      </i>

      <Button callback={clearBets} text='Clear Bets' />

      { odds <= 10 ? null : <p>Your x2 multiplier will be applied at the time of payout.</p> }

      <p>How many Tokens would you like to bet? (10 Max)</p>
      <Input
        type='Number'
        min={1}
        max={10}
        value={amount}
        onChange={ (e) => setAmount(e.target.value) } />

      <Button callback={submitBets} text='Confirm' />

      <Link url='/portal/betting' text='Edit Selection' />
    </>
  );
}

export default BettingFinalization;