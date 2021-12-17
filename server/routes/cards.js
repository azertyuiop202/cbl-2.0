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

export default router;