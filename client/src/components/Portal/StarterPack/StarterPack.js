import React, { useEffect, useState } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';

import Center from '../UI/Center';
import Link from '../UI/Link';
import Title from '../UI/Title';

import fetch from '../../../utils/fetch';

const StarterPack = () => {
  const [selectedPack, setSelectedPack] = useState(0);
  const [packOptions, setPackOptions] = useState({});

  useEffect(() => {
    fetch('/api/portal/starterPacks').then((packs) => {
      setPackOptions(packs);

      setSelectedPack(parseInt(Object.keys(packs)[0]));
    });
  }, []);

  const packDetails = packOptions[selectedPack] || {};

  return (
    <>
      <Title>
        You have a choice between three Starter Packs listed below.<br/>
        Each pack comes with 300 tokens.<br/>
        Use the dropdown menu to view your choices, but know that you can only pick one.<br/>
        Choose wisely!
      </Title>
      <Title>Click on the Pack to view its contents.</Title>

      <Center>
        <Dropdown
          value={selectedPack}
          selection
          options={ Object.values(packOptions).map((pack, idx, packs) => { return { key: idx, text: pack['name'], value: idx }; }) }
          onChange={ (e, { value }) => { setSelectedPack(value); } } />
      </Center>
        
      <br/>

      <Center>
        <Image
          src={ packDetails['cover'] }
          as='a'
          href={ `/portal/starterPack/${packDetails['id']}` }/>
      </Center>

      <br/>

      <i>{packDetails['description']}</i>

      <Link url={ `/portal/starterPack/${packDetails.id}/confirm` } text={ `Choose ${packDetails.name}` } />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default StarterPack;