import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Grid, Table } from 'semantic-ui-react';

import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';
import PicturesTable from '../Album/PicturesTable';

export default () => {
  const celeb = useSelector((state) => state.collection.celeb);
  const [allCelebs, setAllCelebs] = useState([]);
  const [celebCards, setCelebCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/celebs/list`).then(setAllCelebs);
    fetch(`/api/cards/celeb/${celeb}/${getUser().id}`).then(setCelebCards);
  }, [celeb]);

  let myCardsList = (celebCards || []).filter((card) => card.amount > 0);
  let otherCardsList = (celebCards || []).filter((card) => !card.amount);

  return (
    <>
      <h1>1Celeb</h1>
      <Grid style={{ minHeight: '1000px', minWidth: '1800px' }}>
        <Grid.Column style={{ width: '250px' }}>
          <Table celled>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell>Celeb</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className='border-left border-right border-bottom'>
                <Table.Cell className='green' style={{ height: '50px' }}>
                  <Dropdown
                    search
                    style={{ position: 'absolute', top: '65px', left: '25px', zIndex: '10' }}
                    value={celeb}
                    options={ allCelebs.map((celeb, idx, celebs) => { return { key: celeb.number, text: celeb.name, value: celeb.number }; }) }
                    onChange={ (e, { value }) => {
                      dispatch({ type: 'UPDATE_COLLECTION_CELEB', payload: value });
                    } } />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column style={{ width: 'fit-content' }}>
          <h3>Cards I have</h3>
          <PicturesTable cards={myCardsList} chunksLength={10} rowHeight='200px' imageWidth='120px' cellWidth='144px' showAmount></PicturesTable>

          <h3>Cards I don't have</h3>
          <PicturesTable cards={otherCardsList} chunksLength={10} rowHeight='200px' imageWidth='120px' cellWidth='144px'></PicturesTable>
        </Grid.Column>
      </Grid>
    </>
  );
}