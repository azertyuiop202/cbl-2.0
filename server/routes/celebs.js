import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/bonus', auth, (req, res, next) => {
  const query = `SELECT number, name FROM celebs WHERE is_bonus = 1 ORDER BY number ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/exchange', auth, (req, res, next) => {
  const query = `SELECT number, name FROM celebs WHERE is_exchange = 1 AND is_cartoon = 0 ORDER BY number ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/exchange/all', auth, (req, res, next) => {
  const query = `SELECT number, name FROM celebs WHERE is_exchange = 1 ORDER BY is_cartoon DESC, number ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/list', auth, (req, res, next) => {
  const query = `SELECT number, name FROM celebs ORDER BY name ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/maxNumber', auth, (req, res, next) => {
  const query = `SELECT \`value\` FROM settings WHERE \`key\` = 'max_celeb_number'`;

  connection.query(query, (err, result) => {
    res.json(result[0].value);
  });
});

export default router;