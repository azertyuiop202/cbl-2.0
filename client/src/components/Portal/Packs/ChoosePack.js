import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import Center from '../UI/Center';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';
import Text from '../UI/Text';

const ChoosePack = () => {
  const [packOptions, setPackOptions] = useState({});
  const [selectedPack, setSelectedPack] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/portal/packs/').then(setPackOptions);
  }, []);

  const packDetails = packOptions[selectedPack] || {};

  const choosePack = () => {
    dispatch({ type: 'UPDATE_PACK', payload: packDetails });

    navigate('/portal/packs/addGC');
  }

  return (
    <>
      <p>
        You will have the chance to add Gold Coins or Booster Cards<br/>
        to your order after choosing your pack.
      </p>

      <p>
        Use the drop-down menu to switch between Packs,<br/>
        then tap on the Pack to purchase it.
      </p>

      <Link url='/portal/packs/info' text='Bonus Celebs & Drop Rates' />

      <Dropdown
        value={selectedPack}
        selection
        options={ Object.values(packOptions).map((pack, idx, packs) => {
          return { key: idx, text: pack.name, value: idx };
        }) }
        onChange={ (e, { value }) => { setSelectedPack(value); } } />

      <br/><br/>

      <Center>
        <Image
          style={{ cursor: 'pointer' }}
          src={packDetails.cover}
          as='a'
          href={void(0)}
          onClick={choosePack} />
      </Center>

      <Text>{packDetails.description}</Text>

      <Link url='/portal' text='Back' />
    </>
  );
}

export default ChoosePack;