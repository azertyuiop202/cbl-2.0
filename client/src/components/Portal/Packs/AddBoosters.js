import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import Button from '../UI/Button';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';

const AddBoosters = () => {
  const pack = useSelector((state) => state.portal.pack);

  const boostersOptions = [
    'No Booster', 'Singer', 'Model', 'Athlete', 'Fictional', 'Porn', 'Marvel', 'DC', 'Bond',
    'Sci-Fi', "Victoria's Secret", 'Game of Thrones', 'Sitcom', 'Redhead', 'Disney', 'GBR',
  ];

  const getCurrentBooster = (idx) => {
    if (!pack.boosters) return 0;

    return boostersOptions.indexOf(pack.boosters[idx]);
  }

  const [booster1, setBooster1] = useState(getCurrentBooster(0));
  const [booster2, setBooster2] = useState(getCurrentBooster(1));
  const [booster3, setBooster3] = useState(getCurrentBooster(2));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/portal/packs/${pack.id}`).then((packDetails) => {
      if (!packDetails.allow_boosters) {
        navigate('/portal/packs/confirmation');
      }
    });
  }, []);

  const setBooster = (idx, value) => {
    const values = [booster1, booster2, booster3];
    const setters = [setBooster1, setBooster2, setBooster3];

    values[idx] = value;

    let duplicates = values.reduce((acc, value, idx, values) => {
      return (value !== 0 && values.indexOf(value) !== idx) ? [ ...acc, value ] : acc;
    }, []);
    if (duplicates.length > 0) return;

    setters[idx](value);
  }

  const submit = () => {
    const boosters = [booster1, booster2, booster3].map((booster) => boostersOptions[booster]);
    
    dispatch({ type: 'UPDATE_PACK', payload: { boosters } });

    navigate('/portal/packs/confirmation');
  }

  return (
    <>
      <p>
        If you would like to add any Booster Cards to your<br/>
        order, increasing the chances of receiving those types of cards,<br/>
        select the Boosters you'd like to spend below.
      </p>

      <strong>
        Packs will be invalidated if you use a Booster that<br/>
        you don't actually own!
      </strong>

      <br/><br/><br/><br/>

      <Dropdown
        value={booster1}
        selection
        options={ boostersOptions.map((option, idx, options) => {
          return { key: idx, text: option, value: idx };
        }) }
        onChange={ (e, { value }) => { setBooster(0, value) } } />

      <br/><br/>

      <Dropdown
        value={booster2}
        selection
        options={ boostersOptions.map((option, idx, options) => {
          return { key: idx, text: option, value: idx };
        }) }
        onChange={ (e, { value }) => { setBooster(1, value) } } />

      <br/><br/>

      <Dropdown
        value={booster3}
        selection
        options={ boostersOptions.map((option, idx, options) => {
          return { key: idx, text: option, value: idx };
        }) }
        onChange={ (e, { value }) => { setBooster(2, value) } } />

      <Button callback={submit} text='Continue' />

      <Link url='/portal' text='Back' />
    </>
  );
}

export default AddBoosters;