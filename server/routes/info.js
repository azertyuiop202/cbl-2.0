import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/usefulLinks', auth, (req, res, next) => {
  const query = `SELECT * FROM useful_links ORDER BY \`index\` ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/feed', auth, (req, res, next) => {
  const query = `SELECT * FROM feed ORDER BY \`index\` ASC`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

export default router;