import express from 'express';

import connection from '../connection.js';

const router = express.Router();

router.get('/cardOfTheWeek', (req, res, next) => {
  const query = `
    SELECT celebs.name, cards.type, cards.make, cards.link
    FROM cards
      JOIN info ON info.value = cards.id
      JOIN celebs ON celebs.id = cards.celeb_id
    WHERE info.\`key\` = 'card of the week'
  `;

  connection.query(query, (err, result) => {
    res.json(result[0]);
  });
});

router.get('/collection/:userId', (req, res, next) => {
  const query = `
    SELECT cards.*, celebs.number, celebs.name, user_cards.amount
    FROM cards
      JOIN celebs ON celebs.id = cards.celeb_id
      JOIN user_cards ON user_cards.card_id = cards.id
    WHERE user_cards.user_id = ${req.params.userId}
  `;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/types', (req, res, next) => {
  const query = `SELECT id, \`index\` FROM card_types ORDER BY \`index\``;

  connection.query(query, (err, result) => {
    res.json(result);
  })
});

export default router;