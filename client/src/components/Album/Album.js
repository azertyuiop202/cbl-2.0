import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Image, Table } from 'semantic-ui-react';

import { filterAndSortCards } from '../../utils/cardUtils';
import fetch from '../../utils/fetch';
import getUser from '../../utils/getUser';

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
  if (cards && cards.length) {
    cardsList = _.chunk(cardsList, 9);
  }

  return (
    <>
      <h1>Album</h1>
      { (cards === null) ? null : (
        !cards.length ? <h3>You currently don't have any cards, buy a pack to receive some</h3> : (
          <Table celled fixed>
            <Table.Body>
              { cardsList.map((row, idx, cards) => {
                // let classes = 'border-left border-right';
                // if (idx + 1 === cards.length) classes += ' border-bottom';

                return (
                  <Table.Row key={idx} style={{ height: '250px' }}>
                    { row.map((card, idx2, row) => (
                      <Table.Cell key={idx2} className='dark'>
                        <a href={card.link} target='_blank'>
                          <Image src={card.link} style={{ width: '165px' }} />
                        </a>
                      </Table.Cell>
                    )) }
                    { row.length === 9 ? null : (
                      Array.from(Array(9 - row.length).keys()).map((idx2) => (
                        <Table.Cell key={idx2} className='dark'></Table.Cell>
                      ))
                    ) }
                  </Table.Row>
                );
              }) }
            </Table.Body>
          </Table>
        )
      ) }
    </>
  );
}