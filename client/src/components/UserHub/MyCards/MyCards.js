import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import MyCardsFilters from './MyCardsFilters';
import MyCardsList from './MyCardsList';

import { filterAndSortCards } from '../../../utils/cardUtils';
import fetch from '../../../utils/fetch';
import getUser from '../../../utils/getUser';
import { addOrRemove } from '../../../utils/listUtils';

const MyCards = () => {
  const sort = useSelector((state) => state.cards.collectionSort);
  const filter = useSelector((state) => state.cards.collectionFilters);
  const dispatch = useDispatch();

  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    fetch(`/api/cards/collection/${getUser().id}`).then(setCards);
  }

  const toggleFilter = (name) => {
    if (name === 'show/hide') {
      dispatch(
        { type: 'UPDATE_FILTER', payload: { ...filter, show: !filter.show } }
      );
    } else {
      dispatch(
        { type: 'UPDATE_FILTER', payload: { ...filter, types: addOrRemove(filter.types, name) } }
      );
    }
  }

  let cardsList = filterAndSortCards(cards, filter, sort);
  
  return (
    <>
      <h1>My Cards</h1>
      <Grid centered>
        <Grid.Column style={{ width: '80%' }}>
          <MyCardsList cards={cardsList}/>
        </Grid.Column>
        <Grid.Column style={{ width: '20%' }}>
          <MyCardsFilters
            sort={sort} updateSort={ (sort) => dispatch({ type: 'UPDATE_SORT', payload: sort }) }
            filter={filter} toggleFilter={toggleFilter} />
        </Grid.Column>
      </Grid>
    </>
  );
}

export default MyCards;
