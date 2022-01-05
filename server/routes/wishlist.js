import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, (req, res, next) => {
  const query = `
    SELECT celebs.name, cards.type, cards.make, wishlist.*
    FROM wishlist
      JOIN cards ON wishlist.card_id = cards.id
      JOIN celebs ON celebs.id = cards.celeb_id
    WHERE wishlist.user_id = ${req.params.userId}
  `;

  connection.query(query, (err, wishlist) => {
    res.json(wishlist);
  });
});

export default router;