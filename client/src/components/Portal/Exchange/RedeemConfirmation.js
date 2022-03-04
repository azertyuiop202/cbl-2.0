import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const RedeemConfirmation = () => {
  const { id } = useParams();

  const [rate, setRate] = useState({});

  useEffect(() => {
    fetch(`/api/portal/exchange/redeemRates/${id}`).then(setRate);
  }, []);

  console.log(rate);

  return (
    <>
      <p>{ `You have redeemed (a) ${rate.name} for ${rate.xp} Points.` }</p>

      <Link url='/portal/exchange/redeem' text='Redeem More' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default RedeemConfirmation;