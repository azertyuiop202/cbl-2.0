import React from 'react';
import { Table } from 'semantic-ui-react';

import { getCelebNumber } from '../../utils/celebUtils';

const OrdersSidebar = (props) => {
  return (
    <>
      { !props.exchangeCelebs.length ? null : (
        <Table celled fixed>
          <Table.Header>
            <Table.Row className='border-top border-left border-right'>
              <Table.HeaderCell>Exchange Celebs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { props.exchangeCelebs.map((celeb, idx, links) => {
              let classes = 'border-left border-right';
              if (idx + 1 === links.length) classes += ' border-bottom';

              return (
                <Table.Row key={idx} className={classes}>
                  <Table.Cell style={{ backgroundColor: '#B4A7D6' }}>
                    {getCelebNumber(celeb)}-A-
                  </Table.Cell>
                </Table.Row>
              );
            }) }
          </Table.Body>
        </Table>
      ) }

      { !props.bonusCelebs.length ? null : (
        <Table celled fixed>
          <Table.Header>
            <Table.Row className='border-top border-left border-right'>
              <Table.HeaderCell>Bonus Celebs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { props.bonusCelebs.map((celeb, idx, links) => {
              let classes = 'border-left border-right';
              if (idx + 1 === links.length) classes += ' border-bottom';

              return (
                <Table.Row key={idx} className={classes}>
                  <Table.Cell style={{ backgroundColor: '#A4C2F4' }}>
                    {getCelebNumber(celeb)}-A-
                  </Table.Cell>
                </Table.Row>
              );
            }) }
          </Table.Body>
        </Table>
      ) }
    </>
  );
}

export default OrdersSidebar;
