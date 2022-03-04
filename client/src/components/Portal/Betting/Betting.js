import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button';
import Link from '../UI/Link';
import Title from '../UI/Title';

import fetch from '../../../utils/fetch';

const Betting = () => {
  const [title, setTitle] = useState('');
  const [matches, setMatches] = useState({});
  const bets = useSelector((state) => state.portal.bets);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/portal/betting/title').then(setTitle);
    fetch('/api/portal/betting/matches').then(setMatches);
  }, []);

  const clearBets = () => {
    dispatch({ type: 'UPDATE_BETS', payload: {} });
  }

  const addBet = (match, vote) => {
    let bet = {};
    switch (vote) {
      case 1:
        bet = { name: `${match.value1} | `, odds: match.odds1Win };
        break;
      case 2:
        bet = { name: `${match.value2} | `, odds: match.odds2Win };
        break;
      case 'Draw':
        bet = { name: `${match.value1}/${match.value2} Draw | `, odds: match.oddsDraw };
        break;
    }

    bet.column = match.column;

    dispatch({ type: 'UPDATE_BETS', payload: { ...bets, [match.id]: bet } });
  }

  const placeBets = () => {
    if (odds < 2) return;

    navigate('/portal/betting/finalize');
  }

  const buttonProps = { ignoreDiv: true, fontSize: '1em' };

  const odds = Object.values(bets).reduce((acc, bet) => acc * bet.odds, 1).toFixed(2);

  return (
    <>
      <Title>{title}</Title>

      <p>
        Bets placed on matches that have already expired will <strong>not</strong><br/>
        be counted. If you see expired matches, please try refreshing your<br/>
        browser or alerting a mod/vol.<br/>
      </p>

      <i>
        Bets with at least a x10 multiplier will receive a bonus<br/>
        x2 multiplier for free.
      </i>

      <br/><br/><br/>

      { Object.keys(matches).map((league, idx, _) => {
        return (
          <div key={idx} style={{ fontSize: '1em' }}>
            <Title>{league}</Title>
            { matches[league].map((match, idx, matches) => {
              return (
                <div key={idx} style={{ float: 'none' }}>
                  <Button {...buttonProps} callback={ () => { addBet(match, 1) }} text={match.name1} style={{ float: 'none' }} /> x{match.odds1Win} | &nbsp;
                  <Button {...buttonProps} callback={ () => { addBet(match, 'Draw') }} text='Draw' style={{ float: 'none' }} /> x{match.oddsDraw} | &nbsp;
                  <Button {...buttonProps} callback={ () => { addBet(match, 2) }} text={match.name2} style={{ float: 'none' }} /> x{match.odds2Win}
                </div>
              );
            }) }
            <br/>
          </div>
        );
      }) }

      <br/><br/>

      <p>
        Your current bet selection is: { Object.values(bets).reduce((acc, bet) => `${acc} ${bet.name}`, '') }<br/>
        Current multiplier is: x{odds}
      </p>

      <Button callback={clearBets} text='Clear Bets' />

      <Button callback={placeBets} text='Place Bets' />

      { odds >= 2 ? null : <p>Your bet must have total odds of at least x2 before it can be placed.</p>}
      { odds > 10
        ? <p>Fortune favors the bold! You will receive an additional x2 multiplier upon payout.</p>
        : <br/> }

      <Link url='/portal' text='Main Menu' />
    </>
  );
}

export default Betting;