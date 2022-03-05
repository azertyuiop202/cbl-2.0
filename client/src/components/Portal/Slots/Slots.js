import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import Button from '../UI/Button';
import Center from '../UI/Center';

import fetch from '../../../utils/fetch';
import { canPlaySlots } from '../../../utils/slotsUtils';

const Slots = () => {
  const slotsRunID = useSelector((state) => state.portal.slotsRunID);
  const slotsDateRun = useSelector((state) => state.portal.slotsDateRun);

  const [maxCelebNumber, setMaxCelebNumber] = useState(0);
  const [spinNumber, setSpinNumber] = useState(1);
  const [image1, setImage1] = useState('https://i.ibb.co/fdTknZy/4Tokens.png');
  const [image2, setImage2] = useState('https://i.ibb.co/Cv7wq6k/6Card.png');
  const [image3, setImage3] = useState('https://i.ibb.co/80VHT1P/1Logo.png');
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPrizes = ['Weekly Lotto Ticket', '3 Gold Coins', '250 Tokens', '5 Exchange Points', 'Card'];
  const allImages = [
    'https://i.ibb.co/80VHT1P/1Logo.png',
    'https://i.ibb.co/wY3GZRt/2Raffle.png',
    'https://i.ibb.co/C08LPYf/3Coins.png',
    'https://i.ibb.co/fdTknZy/4Tokens.png',
    'https://i.ibb.co/pxTd5tH/5-Exchange.png',
    'https://i.ibb.co/Cv7wq6k/6Card.png',
  ];
  const prizesWon = useRef([]);
  
  useEffect(() => {
    if (!canPlaySlots(slotsDateRun)) {
      navigate('/portal');
      return;
    }
    
    dispatch({ type: 'UPDATE_SLOTS_DATE_RUN', payload: moment.utc().format('YYYY-MM-DD') });

    fetch('/api/celebs/maxNumber').then((maxNumber) => setMaxCelebNumber(parseInt(maxNumber)));
  }, []);

  const claimPrizes = () => {
    const prizes = prizesWon.current.reduce((acc, prize, idx) => { return { ...acc, [`prize${idx+1}`]: prize } }, {});
    if (prizesWon.current.length > 0) prizes.other = 'WIN';
    fetch('/api/portal/slots/submit', 'POST', true, { slotsRunID, gamename: 'Slots', ...prizes });

    navigate('/portal/slots/confirmation');
  }

  const spin = () => {
    const spins = getSpins();
    const win = spins[0] === spins[1] && spins[0] === spins[2];

    if (win) {
      const prize = getPrize(spins[0]);
      setPrize(prize);
      prizesWon.current.push(prize);
    } else {
      setPrize('');
    }

    setSpinning(true);

    const setImagesFns = [setImage1, setImage2, setImage3];
    setImagesFns.forEach((setImageFn) => { setImageFn('https://i.ibb.co/J2JgFNn/Spin.gif'); });
    
    let counter = 0;
    const spinning = setInterval(() => {
      setImagesFns[counter](allImages[spins[counter]]);

      counter++;
      if (counter < 3) return;
      clearInterval(spinning);

      setSpinNumber(spinNumber + 1);
      setSpinning(false);
    }, 0);
  }

  const getSpins = () => {
    let spins = [];
    for (let i = 0; i < 5; i++) {
      spins = new Array(3).fill(0).map((a) => Math.floor(Math.random() * 5) + 1);
      
      if (spins[0] === spins[1] && spins[0] === spins[2]) break;
    }

    return spins;
  }

  const getPrize = (spin) => {
    let prize = allPrizes[spin - 1];
    if (prize !== 'Card') return prize;

    let rnd = Math.floor(Math.random() * 10);
    let type = '';
    if (rnd <= 4) type = 'B';
    else if (rnd <= 7) type = 'IF';
    else if (rnd <= 9) type = 'SIF';
    else type = 'XIF';

    rnd = Math.floor(Math.random() * maxCelebNumber);
    return `${rnd.toString().padStart(3, '0')}-A-${type}`;
  }

  return (
    <>
      <p>Spin: { Math.min(spinNumber, 5) } / 5</p>

      <Center>
        <Image src={image1} />
        <Image src={image2} />
        <Image src={image3} />
      </Center>

      { prize !== '' && <p><br/>You have won {prize}!</p> }

      { (!spinning && spinNumber <= 5) && <Button callback={spin} text={ spinNumber === 1 ? 'Spin' : 'Spin Again' } /> }

      { spinNumber > 5 && <Button callback={claimPrizes} text='Claim Prizes / Main Menu' /> }
    </>
  );
}

export default Slots;