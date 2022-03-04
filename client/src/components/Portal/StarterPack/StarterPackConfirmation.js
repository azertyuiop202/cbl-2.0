import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const StarterPackConfirmation = () => {
  const { id } = useParams();

  const [pack, setPack] = useState({});

  useEffect(() => {
    fetch(`/api/portal/starterPacks/${id}`).then(setPack);
  }, []);

  return (
    <>
      <p>{ `Congratulations, you have claimed your ${pack.name} Starter Pack!` }</p>

      <p>
        Please allow up to 12 hours for the cards and tokens from your Starter Pack<br/>
        to be delivered to your album.
      </p>

      <p>Welcome to the CBL Card Collectors!</p>

      <br/>

      <p>
        Notice:<br/>
        Please be advised that user support has moved exclusively to the CBL Discord and<br/>
        Reddit messages may not receive a response.<br/>
        The Discord link is in the sub's menu and the first page of your<br/>
        User Hub.
      </p>

      <Link src='/portal' text='Main Menu' />
    </>
  );
}

export default StarterPackConfirmation;