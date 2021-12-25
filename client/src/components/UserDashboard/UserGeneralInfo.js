import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { formatDate, formatDateTime } from '../../utils/datetime';

import ReloadButton from '../UI/Button/ReloadButton';

import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

const UserGeneralInfo = () => {
  const [user, setUser] = useState(null);
  const [totalCards, setTotalCards] = useState(null);
  const [prizes, setPrizes]= useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch(`/api/users/${getUser().id}`).then((user) => {
      setUser({...user, lastUpdate: new Date()});
    });

    fetch(`/api/users/${getUser().id}/totalCards`).then(setTotalCards);

    fetch(`/api/users/${getUser().id}/prizes`).then(setPrizes);
  }

  if (user === null || totalCards === null || prizes === null) return null;

  const prizesText = prizes.map((prize) => {
    return prize.prize + (prize.exp_date ? ` (Expires ${formatDate(prize.exp_date)})` : '');
  }).join("\n");

  return (
    <>
      <Table celled fixed>
        <Table.Header>
          <Table.Row className='border-top border-left border-right'>
            <Table.HeaderCell>Total Cards</Table.HeaderCell>
            <Table.HeaderCell>Tokens</Table.HeaderCell>
            <Table.HeaderCell>Gold Coins</Table.HeaderCell>
            <Table.HeaderCell>Exchange Points</Table.HeaderCell>
            <Table.HeaderCell>Raffle Tickets</Table.HeaderCell>
            <Table.HeaderCell>Weekly Lotto</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row className='border-bottom border-left border-right'>
            <Table.Cell id='user-total-cards'>{totalCards}</Table.Cell>
            <Table.Cell id='user-tokens'>{user.tokens}</Table.Cell>
            <Table.Cell id='user-gc'>{user.gc}</Table.Cell>
            <Table.Cell id='user-exp'>{user.exp}</Table.Cell>
            <Table.Cell id='user-rt'>{user.rt}</Table.Cell>
            <Table.Cell id='user-lt'>{user.lt}</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Header>
          <Table.Row className='border-left border-right'>
            <Table.HeaderCell colSpan='4'>Outstanding Prizes...</Table.HeaderCell>
            <Table.HeaderCell>Update your info</Table.HeaderCell>
            <Table.HeaderCell>Last Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row className='border-bottom border-left border-right'>
            <Table.Cell colSpan='4'>{prizesText}</Table.Cell>
            <Table.Cell><ReloadButton onClick={() => fetchUserData()}/></Table.Cell>
            <Table.Cell>{formatDateTime(user.lastUpdate)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default UserGeneralInfo;
