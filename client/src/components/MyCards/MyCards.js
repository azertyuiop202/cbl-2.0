import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import MyCardsFilters from './MyCardsFilters';
import MyCardsList from './MyCardsList';

import fetch from '../../utils/fetch';
import { addOrRemove } from '../../utils/listUtils';
import getUser from '../../utils/getUser';

const MyCards = () => {
  const [cards, setCards] = useState(null);
  const [sort, setSort] = useState({ field: 'number', order: 'asc' });
  const [filter, setFilter] = useState({ show: true, types: [] });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    fetch(`/api/cards/collection/${getUser().id}`).then(setCards);
  }

  const toggleFilter = (name) => {
    if (name === 'show/hide') setFilter({ ...filter, show: !filter.show });
    else setFilter({ ...filter, types: addOrRemove(filter.types, name) });
  }

  let cardsList = null;
  if (cards) {
    cardsList = cards.filter((card) => {
      if (filter.types.length === 0) return true;
      return !filter.show ^ filter.types.includes(card.type);
    }).sort((card1, card2) => {
      const order = sort.order === 'desc' ? -1 : 1;
      if (card1[sort.field] < card2[sort.field]) return -1 * order;
      if (card1[sort.field] > card2[sort.field]) return 1 * order;

      return (card1.celeb > card2.celeb ? 1 : -1) * order;
    });
  }
  
  return (
    <>
      <h1>My Cards</h1>
      <Grid centered>
        <Grid.Column style={{ width: '80%' }}>
          <MyCardsList cards={cardsList}/>
        </Grid.Column>
        <Grid.Column style={{ width: '20%' }}>
          <MyCardsFilters sort={sort} updateSort={setSort} filter={filter} toggleFilter={toggleFilter} />
        </Grid.Column>
      </Grid>
    </>
  );
}

export default MyCards;
