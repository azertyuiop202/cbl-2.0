import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { getCelebNumber } from '../../utils/celebUtils';

const BonusCelebs = () => {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = () => {
    fetch('/api/celebs/bonus').then((res) => res.json()).then(setCelebs);
  }

  return (
    <>
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Bonus Celebs</Table.HeaderCell>
          </Table.Row>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell className='sub-header'>
              Pulling a Bonus Celeb XIF gives you a Raffle Ticket, while pulling a Base-SIF puts you in a draw for one. <br/>
              Message u/fazzle1 on Reddit or Discord if you pull a Bonus Celeb.
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

export default BonusCelebs;
