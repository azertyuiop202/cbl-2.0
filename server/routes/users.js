import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', auth, (req, res, next) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0]);
  });
});

router.get('/:id/totalCards', (req, res, next) => {
  const query = `SELECT SUM(amount) as total FROM user_cards WHERE user_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0].total || 0);
  });
});

router.get('/:id/prizes', (req, res, next) => {
  const query = `SELECT * FROM user_prizes WHERE user_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

export default router;