import React, { useEffect, useState } from 'react';
import { Dropdown, Table } from 'semantic-ui-react';

import { formatDate } from '../../utils/datetime';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

export default () => {
  const [matches, setMatches] = useState(null);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    fetch(`/api/matches/specialVotes/${getUser().id}`).then((matches) => {
      setMatches(matches);

      const votes = {};
      matches.forEach((match) => {
        if (match.vote) {
          votes[match.id] = match.vote;
        }
      });
      setVotes(votes);
    });
  }, []);

  const maxCelebs = !matches ? 0 : matches.reduce((acc, match) => Math.max(acc, match.celebs.length), 0);

  const updateVote = (matchId, celebId) => {
    setVotes({ ...votes, [matchId]: celebId });

    fetch(`/api/matches/vote/${getUser().id}`, 'POST', true, { matchId, celebId });
  }

  return (
    <>
      <h1>Special Vote</h1>

      <Table celled style={{ width: '75%' }}>
        <Table.Header>
          <Table.Row className='border-top border-left border-right border-bottom'>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            { Array.from(Array(maxCelebs).keys()).map((idx) => {
              return <Table.HeaderCell key={idx}>Celeb { String.fromCharCode(65 + idx) }</Table.HeaderCell>;
            }) }
            <Table.HeaderCell>Your Vote</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { (matches && matches.length) ? (
            matches.map((match, idx, matches) => {
              let classes = 'border-left border-right';
              if (idx === matches.length - 1) classes += ' border-bottom';

              return (
                <Table.Row key={idx} className={classes}>
                  <Table.Cell>{ formatDate(match.date) }</Table.Cell>
                  <Table.Cell>{match.type}</Table.Cell>
                  { Array.from(Array(maxCelebs).keys()).map((idx) => {
                    return <Table.Cell key={idx}>{ match.celebs[idx].name }</Table.Cell>;
                  }) }
                  <Table.Cell>
                    <Dropdown
                      style={{ position: 'absolute', marginLeft: '-75px', marginTop: '-10px', zIndex: '10' }}
                      value={ votes[match.id] || match.celebs[0].id }
                      options={ match.celebs.map((celeb, idx, celebs) => {
                        return { key: idx, value: celeb.id, text: celeb.name };
                      }) }
                      onChange={ (e, { value }) => { updateVote(match.id, value); } } />
                  </Table.Cell>
                </Table.Row>
              );
            })
          ): (
            matches !== null ? (
              <Table.Row className='border-left border-right border-bottom'>
                <Table.Cell colSpan={ 3 + maxCelebs }>There are currently not matches to vote on</Table.Cell>
              </Table.Row>
            ): null
          ) }
        </Table.Body>
      </Table>
    </>
  );
}