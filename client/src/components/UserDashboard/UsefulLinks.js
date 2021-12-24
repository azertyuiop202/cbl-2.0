import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import fetch from '../../utils/fetch';

const UsefulLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    fetch('/api/info/usefulLinks').then(setLinks);
  }

  return !links.length ? null : (
    <>
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Useful Links</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { links.map((link, idx, links) => {
            let classes = 'border-left border-right';
            if (idx + 1 === links.length) classes += ' border-bottom';

            return (
              <Table.Row key={link.index} className={classes}>
                <Table.Cell>
                  <a href={link.url} target="_blank">{link.title}</a>
                </Table.Cell>
              </Table.Row>
            );
          }) }
          
        </Table.Body>
      </Table>
    </>
  );
}

export default UsefulLinks;
