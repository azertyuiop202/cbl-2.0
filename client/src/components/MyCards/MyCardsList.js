import React from 'react';
import { Table } from 'semantic-ui-react';
import { getCelebNumber } from '../../utils/celebUtils';

const MyCardsList = (props) => {
  return !props.cards.length ? null : (
    <Table celled fixed style={{ fontSize: '12px' }}>
      <Table.Header>
        <Table.Row className='border-top border-left border-right border-bottom'>
          <Table.HeaderCell style={{ width: '50px' }}>DB No.</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '200px' }}>Link</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '150px' }}>Celeb</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '50px' }}>Card Type</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '50px' }}>Quantity</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Face</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Chest</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Legs</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Rear</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Ability</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Desire</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Total</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '50px' }}>In Trade?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { props.cards.map((card, idx, cards) => {
          let classes = 'border-left border-right';
          if (idx + 1 === cards.length) classes += ' border-bottom';

          return (
            <Table.Row key={idx} className={classes}>
              <Table.Cell>{getCelebNumber(card)}</Table.Cell>
              <Table.Cell><a href={card.link} target='_blank'>{card.link}</a></Table.Cell>
              <Table.Cell>{card.name}</Table.Cell>
              <Table.Cell>{card.type}</Table.Cell>
              <Table.Cell>{card.amount}</Table.Cell>
              <Table.Cell>{card.face}</Table.Cell>
              <Table.Cell>{card.chest}</Table.Cell>
              <Table.Cell>{card.legs}</Table.Cell>
              <Table.Cell>{card.rear}</Table.Cell>
              <Table.Cell>{card.ability}</Table.Cell>
              <Table.Cell>{card.desire}</Table.Cell>
              <Table.Cell>{card.total}</Table.Cell>
              <Table.Cell>no</Table.Cell>
            </Table.Row>
          );
        }) }
      </Table.Body>
    </Table>
  );
}

export default MyCardsList;
