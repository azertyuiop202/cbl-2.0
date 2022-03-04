import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import Center from '../UI/Center';
import Link from '../UI/Link';

import { getCelebNumber } from '../../../utils/celebUtils';
import fetch from '../../../utils/fetch';
import Button from '../UI/Button';

const ExchangeCards = () => {
  const [exchangeCelebs, setExchangeCelebs] = useState([]);
  const [selectedCeleb, setSelectedCeleb] = useState(0);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedRate, setSelectedRates] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/celebs/exchange/all').then(setExchangeCelebs);
    fetch('/api/portal/exchange/rates').then(setExchangeRates);
  }, []);

  const submitExchange = () => {
    const celeb = exchangeCelebs[selectedCeleb];
    const rate = exchangeRates[selectedRate];
    const postData = { celeb: `${getCelebNumber(celeb)} - ${celeb['name']}`, rate: rate['name'] };

    fetch(`/api/portal/exchange/submit`, 'POST', true, postData).then();
    
    navigate(`/portal/exchange/confirmation/${rate.id}`);
  }

  return (
    <>
      <Center>
        <Image src='https://i.imgur.com/LFnqBb3_d.webp?maxwidth=760&fidelity=grand' />
      </Center>

      <br/><br/>

      <p>Which Celeb are you exchanging?</p>
      
      <Dropdown
        value={selectedCeleb}
        selection
        options={ exchangeCelebs.map((celeb, idx, celebs) => {
          return { key: idx, text: `${getCelebNumber(celeb)} - ${celeb['name']}`, value: idx };
        }) }
        onChange={ (e, { value }) => { setSelectedCeleb(value); } } />

      <br/><br/>

      <Dropdown
        value={selectedRate}
        selection
        options={ exchangeRates.map((rate, idx, rates) => { return { key: idx, text: rate['name'], value: idx }; }) }
        onChange={ (e, { value }) => { setSelectedRates(value); } } />

      <Button callback={submitExchange} text='Confirm Exchange' />

      <Link url='/portal/exchange' text='Back' />
    </>
  );
}

export default ExchangeCards;