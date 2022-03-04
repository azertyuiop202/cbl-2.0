import React, { useEffect, useState } from 'react';

import Link from '../UI/Link';

import { getCelebNumber } from '../../../utils/celebUtils';
import fetch from '../../../utils/fetch';

const Exchange = () => {
  const [exchangeCelebs, setExchangeCelebs] = useState([]);

  useEffect(() => {
    fetch('/api/celebs/exchange').then(setExchangeCelebs);
  }, []);

  return (
    <>
      <Link url='/portal/exchange/instructions' text='Instructions' />

      <p>This week's Celebrities are...</p>
      <strong>Any Cartoon Card</strong>
      { exchangeCelebs.map((celeb, idx) => (
        <div key={idx} style={{ margin: '3px' }}>
          <strong>{ getCelebNumber(celeb) } - {celeb.name}</strong>
        </div>
      )) }

      <br/>

      <Link url='/portal/exchange/exchangeCards' text='Exchange Cards' />

      <Link url='/portal/exchange/redeem' text='Redeem Points' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default Exchange;