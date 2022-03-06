import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const ExchangeConfirmation = () => {
  const { id } = useParams();

  const [rate, setRate] = useState({});

  useEffect(() => {
    fetch(`/api/portal/exchange/rates/${id}`).then(setRate);
  }, []);

  return (
    <>
      <p>{ `You have exchanged a ${rate.name} Card and have gained ${rate.xp} Points.` }</p>

      <Link url='/portal/exchange/exchangeCards' text='Exchange More Cards' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default ExchangeConfirmation;