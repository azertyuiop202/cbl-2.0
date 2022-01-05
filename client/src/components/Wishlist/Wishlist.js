import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import fetch from '../../utils/fetch.js';
import getUser from '../../utils/getUser.js';

export default () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`/api/wishlist/${getUser().id}`).then(setWishlist);
  }, []);

  return (
    <>
      <h1>Wishlist</h1>

      <Table celled>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell style={{ width: '20%' }}>Celeb</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }}>Card Type</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }}>Make / Version</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '50%' }}>In Exchange For...</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '10%' }}>Desirability (1-5)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { wishlist.map((wishlistRow, idx, wishlist) => {
            let classes = 'border-left border-right';
            if (idx === wishlist.length - 1) classes += ' border-bottom';

            return (
              <Table.Row key={idx} className={classes}>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{wishlistRow.name}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{wishlistRow.type}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{wishlistRow.make}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{wishlistRow.comment || ''}</Table.Cell>
                <Table.Cell style={{ backgroundColor: '#D9EAD3' }}>{wishlistRow.desirability || ''}</Table.Cell>
              </Table.Row>
            )
          }) }
        </Table.Body>
      </Table>
    </>
  );
}