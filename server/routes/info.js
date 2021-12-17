import express from 'express';

import connection from '../connection.js';

const router = express.Router();

router.get('/:usefulLinks', (req, res, next) => {
  const query = `SELECT * FROM useful_links`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

export default router;