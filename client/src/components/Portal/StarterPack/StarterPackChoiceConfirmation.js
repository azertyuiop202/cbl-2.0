import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import Button from '../UI/Button';
import Center from '../UI/Center';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const StarterPackChoiceConfirmation = () => {
  const { id } = useParams();

  const [pack, setPack] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/portal/starterPacks/${id}`).then(setPack);
  }, []);

  const submitChoice = () => {
    fetch(`/api/portal/starterPacks/submitChoice`, 'POST', true, { name: pack.name }).then();

    navigate(`/portal/${id}/confirmation`);
  }

  return (
    <>
      <p>{ `You selected the ${pack.name} Starter Pack.` }</p>

      <Center>
        <Image src={pack.cover} />
      </Center>

      <Button callback={submitChoice} text='Confirm' />

      <Link url='/portal/starterPack' text='Back' />
    </>
  );
}

export default StarterPackChoiceConfirmation;