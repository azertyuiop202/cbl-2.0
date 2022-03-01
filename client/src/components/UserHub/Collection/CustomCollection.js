import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Grid, Table } from 'semantic-ui-react';

import PicturesTable from '../Album/PicturesTable';

import { convertListToMap } from '../../../utils/cardUtils';
import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';

export default () => {
  const collectionId = useSelector((state) => state.collection.activeCollection);
  const [userCollections, setUserCollections] = useState([]);
  const [cards, setCards] = useState([]);
  const [allCelebs, setAllCelebs] = useState([]);
  const [allCards, setAllCards] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/celebs/list`).then(setAllCelebs);

    //Needs to be finished before collection cards are fetched
    //That should not be a problem since that happens after all cards are fetched
    fetch(`/api/collections/user/${getUser().id}`).then((userCollections) => {
      setUserCollections(userCollections);
      updateActiveCollection(userCollections.length > 0 ? userCollections[0].id : 0);
    });
    
    fetch(`/api/cards/${getUser().id}`).then((cardsList) => {
      setAllCards(convertListToMap(cardsList));
    });
  }, []);

  useEffect(() => {
    if (Object.keys(allCards).length === 0) return;

    fetch(`/api/collections/${collectionId}`).then((collectionCards) => {
      setCards(collectionCards.length === 0 ? [allCards[1]['Base'][1]] : collectionCards.map((cardId) => allCards[cardId]));
    });
  }, [allCards, collectionId]);

  const updateActiveCollection = (id) => {
    dispatch({ type: 'UPDATE_ACTIVE_COLLECTION', payload: id });
  }

  const updateCards = (cards) => {
    setCards(cards);

    fetch(`/api/collections/${collectionId}/cards`, 'put', true, cards.map((card) => card.id));
  }

  const updateCollection = (row, celeb, type = 'Base', make = 1) => {
    const newList = [...cards];
    newList[row] = allCards
      [celeb || (cards[row]?.celeb_id || '1')]
      [type || (cards[row]?.type || 'Base')]
      [make || (cards[row]?.make || '1')];

      updateCards(newList);
  }

  const addRow = () => {
    updateCards([ ...cards, allCards[1]['Base'][1] ]);
  }

  const removeRow = (idx) => {
    const newList = [...cards];
    newList.splice(idx, 1);
    updateCards(newList);
  }

  const myCardsList = (cards || []).filter((card) => card !== null && card.amount > 0);
  const otherCardsList = (cards || []).filter((card) => card !== null && !card.amount);

  return (
    <>
      <h1>Collection</h1>
      <Grid style={{ minHeight: '1000px', minWidth: '1800px' }}>
        <Grid.Column style={{ width: '500px' }}>
          Collection: <span/>
          <Dropdown
            // style={{ position: 'absolute', top: `${60 + 50*idx}px`, left: '95px', zIndex: '10' }}
            value={collectionId}
            options={
              userCollections.length === 0
                ? [{ text: 'Default Collection', value: 0 }]
                : userCollections.map((collection, idx, collections) => { return { key: idx, text: collection.name, value: collection.id }; }) }
            onChange={ (e, { value }) => { updateActiveCollection(value); } } />
          <Table celled>
            <Table.Header>
              <Table.Row className='border-top border-left border-right'>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell style={{ width: '50%' }}>Celeb</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '25%' }}>Type</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '25%' }}>Make</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { cards.map((card, idx, cards) => (
                <Table.Row key={idx} className='border-left border-right border-bottom' style={{ height: '50px' }}>
                  <Table.Cell className='green'>
                    <Button negative size='mini' onClick={ () => removeRow(idx) }>X</Button>
                  </Table.Cell>
                  <Table.Cell className='green'>
                    <Dropdown
                      search
                      style={{ position: 'absolute', top: `${95 + 50*idx}px`, left: '95px', zIndex: '10' }}
                      value={card ? card.celeb_id : 1}
                      options={ allCelebs.map((celeb, idx, celebs) => { return { key: celeb.number, text: celeb.name, value: celeb.number }; }) }
                      onChange={ (e, { value }) => { updateCollection(idx, value); } } />
                  </Table.Cell>
                  <Table.Cell className='green'>
                    { Object.keys(allCards).length === 0 ? null : (
                      <Dropdown
                        style={{ position: 'absolute', top: `${95 + 50*idx}px`, left: '285px', zIndex: '10' }}
                        value={card ? card.type : 'Base'}
                        options={ Object.keys(allCards[card ? card.celeb_id : 1]).map((type, idx, types) => { return { key: idx, text: type, value: type }; }) }
                        onChange={ (e, { value }) => { updateCollection(idx, null, value); } } />
                    ) }
                  </Table.Cell>
                  <Table.Cell className='green'>
                    { Object.keys(allCards).length === 0 ? null : (
                      <Dropdown
                        style={{ position: 'absolute', top: `${95 + 50*idx}px`, left: '390px', zIndex: '10' }}
                        value={card ? (''+card.make) : '1'}
                        options={ Object.keys(allCards[card ? card.celeb_id : 1][card ? card.type : 'Base']).map((make, idx, makes) => { return { key: idx, text: make, value: make }; }) }
                        onChange={ (e, { value }) => { updateCollection(idx, null, null, value); } } />
                    ) }
                  </Table.Cell>
                </Table.Row>
              )) }
              <Table.Row className='border-left border-right border-bottom' style={{ height: '50px' }}>
                <Table.Cell className='green' colSpan='4'>
                  <Button primary floated='left' onClick={addRow}>Add Row</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column style={{ width: 'fit-content' }}>
          <h3>Cards I have</h3>
          <PicturesTable cards={myCardsList} chunksLength={9} rowHeight='175px' imageWidth='110px' cellWidth='130px' showAmount></PicturesTable>

          <h3>Cards I don't have</h3>
          <PicturesTable cards={otherCardsList} chunksLength={9} rowHeight='175px' imageWidth='110px' cellWidth='130px'></PicturesTable>
        </Grid.Column>
      </Grid>
    </>
  );
}