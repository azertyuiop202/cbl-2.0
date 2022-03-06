import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const PacksConfirmation = () => {
  const pack = useSelector((state) => state.portal.pack);

  const [packState, setPackState] = useState('LOADING');
  const [celebsClasses, setCelebsClasses] = useState(null);
  const [packOdds, setPackOdds] = useState(null);
  const [typeAmounts, setTypeAmounts] = useState(null);
  const [boosterOdds, setBoosterOdds] = useState(null);

  const dispatch = useDispatch();

  //Fetch required data
  useEffect(() => {
    fetch('/api/celebs/classifications').then(setCelebsClasses);
    fetch(`/api/portal/packs/${pack.id}/rates`).then(setPackOdds);
    fetch(`/api/cards/types/amounts`).then(setTypeAmounts);
    fetch(`/api/cards/boosterOdds`).then(setBoosterOdds);
  }, []);

  const stateVarsNeeded = [celebsClasses, packOdds, typeAmounts, boosterOdds];
  const typeTranslationsMap = {
    'SU': 'Suits',
    'C': 'Career',
    'SA': 'SA-',
    'COTM': 'CotM',
    'FNT': 'FAN',
    'GC': 'GoldCoins',
  };

  //Generate Pack
  useEffect(() => {
    if (stateVarsNeeded.some((value) => value === null)) return;

    if (pack.id !== null) {
      const packData = generatePack();
      fetch(`/api/portal/packs/submit`, 'POST', true, packData);
    }

    dispatch({ type: 'RESET_PACK' });
    setPackState('FINISHED');
  }, stateVarsNeeded);

  const generatePack = () => {
    const boosterCeleb = getBoosterCeleb();
    if (boosterCeleb === false) return;

    let result = {
      'T': -1 * pack.tokens,
      'GC': -1 * pack.gc,
      'pack': pack.name,
      'Booster': pack.boosters ? pack.boosters[0] : 'No Booster',
      'Booster2': pack.boosters ? pack.boosters[1] : 'No Booster',
      'Booster3': pack.boosters ? pack.boosters[2] : 'No Booster',
    };

    let boosted = false;
    for (let i = 0; i < pack.cards; i++) {
      let type = getType(boosted);
      let number = 0;
      if (i === 0 && boosterCeleb !== true) {
        if (!['Base', 'IF', 'SIF', 'XIF'].includes(type) && pack.cards > 1) {
          type = 'XIF';
          boosted = true;
        } else if (pack.cards === 1) { //For lottery pack with boosters, don't allow GC as draw
          while (type === 'GC') {
            type = getType(boosted);
          }
        }
        number = parseInt(boosterCeleb);
      } else {
        number = getNumber(type);
      }

      if (type in typeTranslationsMap) {
        type = typeTranslationsMap[type];
      }

      result[`C${i+1}Rank`] = type;
      result[`Card${i+1}`] = number;

      if (pack.chance_of_extra_booster_pct > 0) {
        let rnd = Math.random() * 100;
        if (rnd <= pack.chance_of_extra_booster_pct) {
          result[`C${pack.cards + i + 1}Rank`] = 'Booster';
          result[`Card${pack.cards + i + 1}`] = getRandomBooster();
        }
      }
    }

    return result;
  }

  const getBoosterCeleb = () => {
    if (!pack.boosters) return true;
    const boosters = pack.boosters.filter((booster) => booster != 'No Booster');
    if (boosters.length === 0) return true;

    const celebs = Object.keys(celebsClasses).filter((number) => {
      return boosters.every((booster) => celebsClasses[number].includes(booster));
    });
    if (celebs.length === 0) {
      setPackState('INVALID BOOSTERS');
      return false;
    }
    
    return _.sample(celebs);
  }

  const getType = (boosted) => {
    const gc = (pack.gc) + (boosted ? 3 : 0);
    const options = packOdds[gc];
    const rnd = Math.random() * 100;

    let maxTries = 2
    let type = null;

    outer:
    for (let i = 0; i < maxTries; i++) {
      let oddsSUM = 0.000;
      for (let option of options) {
        oddsSUM += parseFloat(option.percentage);
        if (rnd > oddsSUM) continue;
        
        type = _.sample(option.types);
        break outer;
      }
    }

    return type;
  }

  const getNumber = (type) => {
    if (type === 'GC') return Math.floor(Math.random() * 6) + 4; //5-10
    
    return Math.floor(Math.random() * typeAmounts[type]) + 1;
  }

  const getRandomBooster = () => {
    const rnd = Math.random() * 100;

    let oddsSUM = 0.000;
    for (let option of boosterOdds) {
      oddsSUM += parseFloat(option.percentage);
      if (rnd > oddsSUM) continue;
      
      return option.name;
    }

    return getRandomBooster();
  }

  let packInfo = null;
  switch (packState) {
    case 'LOADING':
      packInfo = <Loader active inline>Generating Pack</Loader>
      break;
    case 'INVALID BOOSTERS':
      packInfo = (
        <>
          <p>You have selected an invalid booster combination</p>
          <Link url='/portal/packs/addBoosters' text='Edit Boosters' />
        </>
      );
      break;
    case 'FINISHED':
      packInfo = (
        <p>
          To see what your Pack produced, check the Orders<br/>
          Tab on your User Hub.
        </p>
      );
      break;
  }

  return (
    <>
      {packInfo}

      <br/><br/>

      <Link url='/portal' text='Main Menu' />
    </>
  );
}

export default PacksConfirmation;