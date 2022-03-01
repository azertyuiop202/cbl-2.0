import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Dropdown, Grid, Table } from 'semantic-ui-react';

import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';
import InfoTable from '../UI/Table/InfoTable';

const TopXX = (props) => {
  const amount = 25;

  const [ranking, setRanking] = useState({});
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    fetch(`/api/celebs/list`).then((celebs) => {
      setCelebs(celebs);
      let celebNames = celebs.map((celeb) => celeb.name);

      fetch(`/api/users/${getUser().id}/ranking`).then((ranking) => {
        setRanking(ranking);

        setCelebs([
          { name: '' },
          ...celebs,
          ...Object.values(ranking).filter(celeb => !_.includes(celebNames, celeb)).reduce((acc, celeb) => { return [ ...acc, { name: celeb} ] }, [])
        ]);
      });
    });
  }, []);

  const updateRanking = (rank, name) => {
    if (rank in ranking) {
      fetch(`/api/users/${getUser().id}/ranking/${rank}`, 'PUT', true, {name}).catch(console.log);
    } else {
      fetch(`/api/users/${getUser().id}/ranking/${rank}`, 'POST', true, {name}).catch(console.log);
    }

    setRanking({ ...ranking, [rank]: name });
  }

  return (
    <>
      <h1>Top {amount}</h1>

      <Grid>
        <Grid.Column style={{ width: '500px' }}>
          <Table celled>
            <Table.Header>
              <Table.Row className='border-top border-left border-right'>
                <Table.HeaderCell colSpan='2'>Top {amount}</Table.HeaderCell>
              </Table.Row>
              <Table.Row className='border-left border-right'>
                <Table.HeaderCell style={{ width: '100px' }}>Ranking</Table.HeaderCell>
                <Table.HeaderCell>Celebrity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { Array.from(Array(amount).keys()).map((idx, _, arr) => {
                let classes = 'border-left border-right';
                if (idx === arr.length-1) classes += ' border-bottom';

                const rank = idx + 1;

                return (
                  <Table.Row key={idx} className={classes}>
                    <Table.Cell>{rank}</Table.Cell>
                    <Table.Cell className='green'>
                      <Dropdown
                        search
                        style={{ position: 'absolute', top: `${80 + idx*29}px`, left: '125px', zIndex: '10' }}
                        allowAdditions
                        onAddItem={(e, {value}) => { setCelebs([ ...celebs, { name: value } ]) }}
                        value={ ranking[rank] || '' }
                        options={ celebs.map((celeb, idx, celebs) => { return { key: idx, text: celeb.name, value: celeb.name }; }) }
                        onChange={ (e, { value }) => { updateRanking(rank, value); } } />
                    </Table.Cell>
                  </Table.Row>
                )
              }) }
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column style={{ width: '250px' }}>
          <div style={{ height: '100px' }} />
          <InfoTable text='Certain events can pay out prizes based upon your Top 25 celebs'/>
          <InfoTable text='You should also make sure to keep your Trade and Wishlist sheets up to date,
            since these are searchable for other users, and could also be used for events in the future.'/>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default TopXX;