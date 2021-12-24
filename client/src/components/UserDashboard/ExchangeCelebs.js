import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { getCelebNumber } from '../../utils/celebUtils';

import fetch from '../../utils/fetch';

const ExchangeCelebs = () => {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = () => {
    fetch('/api/celebs/exchange').then(setCelebs);
  }

  return !celebs.length ? null : (
    <>
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Weekly Exchange Celebs</Table.HeaderCell>
          </Table.Row>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell className='sub-header'>
              Cards Base-XIF of Weekly Exchange Celebs can be exchanged in the CBL Portal for Exchange Points.
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { celebs.map((celeb, idx, links) => {
            let classes = 'border-left border-right';
            if (idx + 1 === links.length) classes += ' border-bottom';

            return (
              <Table.Row key={idx} className={classes}>
                <Table.Cell>{getCelebNumber(celeb)} - {celeb.name}</Table.Cell>
              </Table.Row>
            );
          }) }
          
        </Table.Body>
      </Table>
    </>
  );
}

export default ExchangeCelebs;
