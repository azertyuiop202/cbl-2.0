import React from 'react';
import { Table } from 'semantic-ui-react';

import { formatDateTime } from '../../../utils/datetime';

export default (props) => {
  if (props.orders === null) return null;

  return (
    <Table celled fixed style={{ fontSize: '12px' }}>
      <Table.Header>
        <Table.Row className='border-top border-left border-right border-bottom'>
          <Table.HeaderCell style={{ width: '50px' }}>Timestamp</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '20px' }}>Tokens</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '20px' }}>GC</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '35px' }}>Description</Table.HeaderCell>
          <Table.HeaderCell colSpan='3' style={{ width: '120px' }}>Spent / Acquired</Table.HeaderCell>
          <Table.HeaderCell colSpan='3' style={{ width: '150px' }}>Used Boosters  (and other output)</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '100px' }}>Details and errors (if any)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { props.orders.map((order, idx, orders) => {
          let classes = 'border-left border-right';
          if (idx + 1 === orders.length) classes += ' border-bottom';

          const isBonusCeleb = order.spentAcquired.some((card) => {
            if (card.type !== 'card') return false;
            return props.bonusCelebPrefixes.some((bonusCeleb) => card.id.includes(bonusCeleb));
          });
          const isExchangeCeleb = order.spentAcquired.some((card) => {
            if (card.type !== 'card') return false;
            return props.exchangeCelebPrefixes.some((exchangeCeleb) => card.id.includes(exchangeCeleb));
          });
          
          if (isBonusCeleb) {
            classes += ' row-bonus';
          } else if (isExchangeCeleb) {
            classes += ' row-exchange'
          }

          return (
            <Table.Row key={idx} className={classes}>
              <Table.Cell>{formatDateTime(order.timestamp)}</Table.Cell>
              <Table.Cell>{order.tokens}</Table.Cell>
              <Table.Cell>{order.gc}</Table.Cell>
              <Table.Cell>{order.description}</Table.Cell>
              { Array.from(Array(3).keys()).map((idx) => {
                return (
                  <Table.Cell key={idx}>
                    {(() => {
                      if (order.spentAcquired.length <= idx) return '-';

                      const card = order.spentAcquired[idx];
                      if (card.type === 'card') {
                        return <a href={card.link} target='_blank'>{card.id}</a>;
                      } else {
                        return card.value;
                      }
                    })()}
                  </Table.Cell>
                )
              }) }
              { Array.from(Array(3).keys()).map((idx) => {
                return (
                  <Table.Cell key={idx}>
                    {(() => {
                      if (order.boosters.length <= idx) {
                        if (['combine', 'exchange', 'redeem'].includes(order.description)) return '';
                        return <div style={{ color: 'lightgrey' }}>No Booster</div>;
                      }
      
                      return order.boosters[idx];
                    })()}
                  </Table.Cell>
                );
              }) }
              <Table.Cell>{order.error}</Table.Cell>
            </Table.Row>
          );
        }) }
      </Table.Body>
    </Table>
  );
}