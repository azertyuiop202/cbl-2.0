import React, { useEffect, useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

export default () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch(`/api/slots/${getUser().id}`).then(setSlots);
  }, []);

  return (
    <>
      <h1>Slots</h1>

      <Table celled>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell style={{ width: '15%' }}>Timestamp</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }} colSpan='2'>Game</Table.HeaderCell>
            <Table.HeaderCell colSpan='5'>Prizes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { slots.map((slotsRow, idx, slots) => {
            let classes = 'border-left border-right';
            if (idx === slots.length - 1) classes += ' border-bottom';

            const gameColor = slotsRow.prizes.length ? '#D9EAD3' : '#F4CCCC';

            return (
              <Table.Row key={idx} className={classes}>
                <Table.Cell>{slotsRow.timestamp}</Table.Cell>
                <Table.Cell style={{ backgroundColor: gameColor }}>Slots</Table.Cell>
                <Table.Cell style={{ backgroundColor: gameColor }}>{slotsRow.prizes.length ? 'won' : 'Lost'}</Table.Cell>
                { Array.from(Array(5).keys()).map((idx) => (
                  <Table.Cell key={idx} style={{ width: '15%' }}>{slotsRow.prizes[idx] || ''}</Table.Cell>
                )) }
              </Table.Row>
            )
          }) }
        </Table.Body>
      </Table>
    </>
  );
}