import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, (req, res, next) => {
  const query = `SELECT * FROM trivia_answers WHERE user_id = ${req.params.userId} AND active = 1`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/:userId/payouts', auth, (req, res, next) => {
  const query = `SELECT * FROM trivia_payouts WHERE user_id = ${req.params.userId} AND active = 1`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

export default router;