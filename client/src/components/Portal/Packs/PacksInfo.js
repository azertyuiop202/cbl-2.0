import React, { useEffect, useState } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';

import Center from '../UI/Center';
import Link from '../UI/Link';

import fetch from '../../../utils/fetch';
import Text from '../UI/Text';
import { getCelebNumber } from '../../../utils/celebUtils';

const PacksInfo = () => {
  const [bonusCelebs, setBonusCelebs] = useState([]);
  const [bonusWeek, setBonusWeek] = useState('');
  const [packOptions, setPackOptions] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState('Bonus Celebs');

  useEffect(() => {
    fetch('/api/settings/bonus_celebs_week').then(setBonusWeek);
    fetch('/api/celebs/bonus').then(setBonusCelebs);
    fetch('/api/portal/packs/').then(setPackOptions);
  }, []);

  let info = null;
  if (selectedInfo === 'Bonus Celebs') {
    info = (
      <>
        <p>
          <i>For the week of {bonusWeek}</i><br/>
          This week's Bonus Celebs are:
        </p>

        { bonusCelebs.map((celeb, idx, celebs) => <p key={idx}>{`${getCelebNumber(celeb)} - ${celeb.name}`}</p>) }

        <br/><br/>

        <p>
          If you pull a Base-SIF of the listed celebs, please DM u/CheckingBackLater<br/>
          to be entered into a random draw for a Raffle Ticket.
        </p>

        <p>If you pull an XIF, you will automatically earn a Raffle Ticket.</p>

        <p>Check out <a href='https://www.reddit.com/r/CelebBattleLeague/comments/ob2drv/important_update_on_raffle_tickets/' target='_blank'>this reddit post</a> for more info.</p>
      </>
    );
  } else {
    info = <Image src={packOptions[selectedInfo-1].rates_image} />
  }

  return (
    <>
      <Dropdown
        value={selectedInfo}
        selection
        options={ [ 'Bonus Celebs', ...Object.values(packOptions)].map((info, idx, infos) => {
          return {
            key: idx,
            text: idx === 0 ? info : `${info.name} Pack Drop Rates`,
            value: idx === 0 ? info : idx,
          };
        }) }
        onChange={ (e, { value }) => { setSelectedInfo(value); } } />

      <br/><br/>

      {info}

      <Link url='/portal/packs' text='Back' />
    </>
  );
}

export default PacksInfo;