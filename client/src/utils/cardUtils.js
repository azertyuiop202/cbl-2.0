export const filterAndSortCards = (cards, filter, sort) => {
  let cardsList = null;
  if (cards) {
    cardsList = cards.filter((card) => {
      if (filter.types.length === 0) return true;
      return !filter.show ^ filter.types.includes(card.type);
    }).sort((card1, card2) => {
      const order = sort.order === 'desc' ? -1 : 1;
      if (card1[sort.field] < card2[sort.field]) return -1 * order;
      if (card1[sort.field] > card2[sort.field]) return 1 * order;

      return card1.celeb > card2.celeb ? -1 : 1;
    });
  }
  
  return cardsList;
}

export const convertListToMap = (cards) => cards.reduce((cards, card) => {
  return {
    ...cards,
    [card.celeb_id]: !(card.celeb_id in cards) ? { [card.type]: { [card.make]: card } } : {
      ...cards[card.celeb_id],
      [card.type]: !(card.type in cards[card.celeb_id]) ? { [card.make]: card } : {
        ...cards[card.celeb_id][card.type],
        [card.make]: card
      }
    },
    [card.id]: card
  };
}, {})

export const getHeatmapStyle = (amount) => {
  if (amount < 1) return { backgroundColor: '#FFF2CC' };
  if (amount < 2) return { backgroundColor: '#F4CCCC' };
  if (amount < 3) return { backgroundColor: '#EA9999' };
  if (amount < 4) return { backgroundColor: '#E06666' };
  return { color: 'white', backgroundColor: '#CC0000' };
}