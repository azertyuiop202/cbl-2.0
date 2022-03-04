import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import Center from '../UI/Center';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';
import Button from '../UI/Button';

const RedeemXP = () => {
  const [redeemRates, setRedeemRates] = useState([]);
  const [selectedRate, setSelectedRates] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/portal/exchange/redeemRates').then(setRedeemRates);
  }, []);

  const submitRedeem = () => {
    const rate = redeemRates[selectedRate];
    const postData = { xp: rate['xp'], name: rate['name'] };

    if (rate.has_details) {
      navigate(`/portal/exchange/redeemDetails/${rate.id}`);
    } else {
      fetch(`/api/portal/exchange/submitRedeem`, 'POST', true, postData).then();
      
      navigate(`/portal/exchange/redeemConfirmation/${rate.id}`);
    }
  }

  return (
    <>
      <Center>
        <Image src='https://i.ibb.co/xsTLg2R/Exchange-Table-8-31-21.png' />
      </Center>

      <br/><br/>

      <p>How many Points would you like to redeem?</p>
      
      <Dropdown
        value={selectedRate}
        selection
        options={ redeemRates.map((rate, idx, rates) => { return { key: idx, text: `${rate['xp']} - ${rate['name']}`, value: idx }; }) }
        onChange={ (e, { value }) => { setSelectedRates(value); } } />

      <Button callback={submitRedeem} text='Continue' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default RedeemXP;