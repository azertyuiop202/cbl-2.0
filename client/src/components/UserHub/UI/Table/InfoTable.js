import React from 'react';
import { Table } from 'semantic-ui-react';

const InfoTable = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row className='border-top border-left border-right border-bottom'>
        <Table.HeaderCell>
          {props.text}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  </Table>
);

export default InfoTable;