import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import Center from '../UI/Center';
import Title from '../UI/Title';

import fetch from '../../../utils/fetch';
import Link from '../UI/Link';

const Combine = () => {
  const [combineOptions, setCombineOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    fetch('/api/portal/combine/options').then(setCombineOptions);
  }, []);

  const combineDetails = combineOptions[selectedOption] || {};

  return (
    <>
      <p>
        This is where you can combine duplicate<br/>
        cards into cards of a higher tier.
      </p>
      <Title>What type of cards would you like to combine?</Title>

      <Center>
        <Dropdown
          value={selectedOption}
          selection
          options={ Object.values(combineOptions).map((option, idx, options) => { return { key: idx, text: option['name'], value: idx }; }) }
          onChange={ (e, { value }) => { setSelectedOption  (value); } } />
      </Center>

      <br/>

      <p>
        Please be advised that currently only Base-SIF combinations will be<br/>
        processed automatically.<br/>
        Manual combinations may take a while. Please contact a mod/vol<br/>
        directly if this takes more than 24 hours.
      </p>
        
      <Link url={ `/portal/combine/${combineDetails.id}` } text='Continue' />
      <Link url='/portal' text='Back' />
    </>
  );
}

export default Combine;