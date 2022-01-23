import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Grid, Table } from 'semantic-ui-react';

import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';
import PicturesTable from '../Album/PicturesTable';

export default () => {
  const type = useSelector((state) => state.collection.type);
  const [allTypes, setAllTypes] = useState([]);
  const [typeCards, setTypeCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/cards/types`).then(setAllTypes);
    fetch(`/api/cards/type/${type}/${getUser().id}`).then(setTypeCards);
  }, [type]);

  let myCardsList = (typeCards || []).filter((card) => card.amount > 0);
  let otherCardsList = (typeCards || []).filter((card) => !card.amount);

  return (
    <>
      <h1>1Type</h1>
      <Grid style={{ minHeight: '1000px', minWidth: '1800px' }}>
        <Grid.Column style={{ width: '150px' }}>
          <Table celled>
            <Table.Header>
              <Table.Row className='border-top border-left border-right border-bottom'>
                <Table.HeaderCell>Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className='border-left border-right border-bottom'>
                <Table.Cell style={{ height: '50px', backgroundColor: '#B6D7A8' }}>
                  <Dropdown
                    search
                    style={{ position: 'absolute', top: '65px', left: '25px', zIndex: '10' }}
                    value={type}
                    options={ allTypes.map((type, idx, types) => { return { key: type.index, text: type.id, value: type.id }; }) }
                    onChange={ (e, { value }) => {
                      dispatch({ type: 'UPDATE_COLLECTION_TYPE', payload: value });
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