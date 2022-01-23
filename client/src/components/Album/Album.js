import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import { filterAndSortCards } from '../../utils/cardUtils';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';
import PicturesTable from './PicturesTable';

export default () => {
  const sort = useSelector((state) => state.cards.collectionSort);
  const filter = useSelector((state) => state.cards.collectionFilters);

  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    fetch(`/api/cards/collection/${getUser().id}`).then(setCards);
  }

  let cardsList = filterAndSortCards(cards, filter, sort);

  return (
    <>
      <h1>Album</h1>
      { (cards === null) ? null : (
        !cards.length ? <h3>You currently don't have any cards, buy a pack to receive some</h3> : (
          <PicturesTable cards={cardsList} chunksLength={9} rowHeight='250px' imageWidth='165px'></PicturesTable>
        )
      ) }
    </>
  );
}