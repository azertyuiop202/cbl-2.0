import express from 'express';

import connection from '../connection.js';

const router = express.Router();

router.get('/bonus', (req, res, next) => {
  const query = `SELECT number, name FROM celebs WHERE is_bonus = 1 ORDER BY number ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/exchange', (req, res, next) => {
  const query = `SELECT number, name FROM celebs WHERE is_exchange = 1 ORDER BY number ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

export default router;