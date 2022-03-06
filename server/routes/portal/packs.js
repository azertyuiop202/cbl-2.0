import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';

import postRequestToSheets from './postRequestToSheets.js';

const router = express.Router();

router.get('/', auth, (req, res, next) => {
  const query = `SELECT * FROM pack_options`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/:id', auth, (req, res, next) => {
  const query = `SELECT * FROM pack_options WHERE id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0] || null);
  });
});

router.get('/:id/rates', auth, (req, res, next) => {
  const query = `SELECT * FROM pack_rates WHERE pack_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => {
      return {
        ...acc,
        [row.gc]: [
          ...(row.gc in acc ? acc[row.gc] : []),
          { types: row.types.split(', '), percentage: row.percentage }
        ]
      };
    }, {}));
  });
});

router.post('/submit', auth, (req, res, next) => {
  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    'D': 'FALSE',
    ...req.body
  });

  postRequestToSheets(sendData, () => {
    res.json({ success: true });
  });
});

export default router;