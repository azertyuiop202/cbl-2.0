import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, (req, res, next) => {
  const query = `
    SELECT celebs.name, cards.type, cards.link, tradeslist.*
    FROM tradeslist
      JOIN cards ON tradeslist.card_id = cards.id
      JOIN celebs ON celebs.id = cards.celeb_id
    WHERE tradeslist.user_id = ${req.params.userId}
  `;

  connection.query(query, (err, tradeslist) => {
    res.json(tradeslist);
  });
});

export default router;