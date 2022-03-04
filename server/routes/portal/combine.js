import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';
import postRequestToSheets from './postRequestToSheets.js';

const router = express.Router();

router.get('/options', auth, (req, res, next) => {
  const query = `SELECT id, name FROM combine_options`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/options/:id', auth, (req, res, next) => {
  const query = `SELECT *
    FROM combine_options
      JOIN combine_option_details ON combine_option_details.combine_option_id = combine_options.id
    WHERE combine_options.id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => {
      let combineOptionRow = { id: row.id, name: row.name, description: row.description, pack: row.pack, Booster: row.Booster };
      let combineOptionDetailsRow = { text: row.text, value: row.value, options_type: row.options_type, options: row.options };
      return Object.keys(acc).length === 0
        ? { ...combineOptionRow, details: [combineOptionDetailsRow] }
        : { ...acc, details: [ ...acc.details, combineOptionDetailsRow ]}
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