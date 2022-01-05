import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { getCelebNumber } from '../../utils/celebUtils';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

export default () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`/api/cards`).then(setCards);
  }, []);

  return (
    <>
      <h1>CardList</h1>
        
      <Table celled style={{ fontSize: '12px' }}>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell style={{ width: '6%' }}>DB No</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '19%' }}>Link</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '19%' }}>Celeb Name</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Card Type</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '8%' }}>{getUser().username}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Face</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Chest</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Legs</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Rear</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Ability</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Desire</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '6%' }}>Total Stats</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { cards.map((card, idx, cards) => {
            let classes = 'border-left border-right';
            if (idx + 1 === cards.length) classes += ' border-bottom';

            return (
              <Table.Row key={idx} className={classes}>
                <Table.Cell>{getCelebNumber(card)}</Table.Cell>
                <Table.Cell><a href={card.link} target='_blank'>{card.link}</a></Table.Cell>
                <Table.Cell>{card.name}</Table.Cell>
                <Table.Cell>{card.type}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#FFE599' }}>{card.amount}</Table.Cell>
                <Table.Cell>{card.face}</Table.Cell>
                <Table.Cell>{card.chest}</Table.Cell>
                <Table.Cell>{card.legs}</Table.Cell>
                <Table.Cell>{card.rear}</Table.Cell>
                <Table.Cell>{card.ability}</Table.Cell>
                <Table.Cell>{card.desire}</Table.Cell>
                <Table.Cell>{card.total}</Table.Cell>
              </Table.Row>
            );
          }) }
        </Table.Body>
      </Table>
    </>
  );
}
