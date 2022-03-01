import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import fetch from '../../../utils/fetch.js';
import getUser from '../../../utils/getUser.js';

export default () => {
  const [tradeslist, setTradeslist] = useState([]);

  useEffect(() => {
    fetch(`/api/tradeslist/${getUser().id}`).then(setTradeslist);
  }, []);

  return (
    <>
      <h1>Trade</h1>

      <Table celled>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell style={{ width: '20%' }}>Celeb</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }}>Card Type</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '25%' }}>Link</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '35%' }}>Trade For...</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }}>Tradeability (1-5)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { tradeslist.map((tradeRow, idx, tradeslist) => {
            let classes = 'border-left border-right';
            if (idx === tradeslist.length - 1) classes += ' border-bottom';

            return (
              <Table.Row key={idx} className={classes}>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{tradeRow.name}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{tradeRow.type}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#FFF2CC' }}><a href={tradeRow.link} target='_blank'>{tradeRow.link}</a></Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{tradeRow.comment || ''}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{tradeRow.tradeability || ''}</Table.Cell>
              </Table.Row>
            )
          }) }
        </Table.Body>
      </Table>
    </>
  );
}