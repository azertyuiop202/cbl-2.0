import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';

import postRequestToSheets from './postRequestToSheets.js';

const router = express.Router();

router.get('/rates', auth, (req, res, next) => {
  const query = `SELECT id, name FROM exchange_rates`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/rates/:id', auth, (req, res, next) => {
  const query = `SELECT id, name, xp FROM exchange_rates WHERE id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0] || null);
  });
});

router.get('/redeemRates', auth, (req, res, next) => {
  const query = `SELECT rr.*, IF(COUNT(rrd.id) > 0, 1, 0) as has_details
    FROM redeem_rates rr
      LEFT JOIN redeem_rate_details rrd ON rrd.redeem_rate_id = rr.id
    GROUP BY rr.id`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/redeemRates/:id/details', auth, (req, res, next) => {
  const query = `SELECT *
    FROM redeem_rates rr
      LEFT JOIN redeem_rate_details rrd ON rrd.redeem_rate_id = rr.id
    WHERE rr.id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => {
      let redeemRateRow = { id: row.id, name: row.name, xp: row.xp };
      let redeemRateDetailsRow = { text: row.text, value: row.value, options_type: row.options_type, options: row.options };
      return Object.keys(acc).length === 0
        ? { ...redeemRateRow, details: [redeemRateDetailsRow] }
        : { ...acc, details: [ ...acc.details, redeemRateDetailsRow ]}
    }, {}));
  });
});

router.get('/redeemRates/:id', auth, (req, res, next) => {
  const query = `SELECT id, name, xp FROM redeem_rates WHERE id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0] || null);
  });
});

router.post('/submit', auth, (req, res, next) => {
  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    'D': 'FALSE',
    'pack': 'Exchange',
    'Booster': req.body.rate,
    'Booster2': req.body.celeb,
  });

  postRequestToSheets(sendData, () => {
    res.json({ success: true });
  });
});

router.post('/submitRedeem', auth, (req, res, next) => {
  const { xp, name, ...body } = req.body;

  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    'D': 'FALSE',
    'pack': 'Redeem',
    'Booster': xp,
    'Booster2': name,
    ...body
  });

  postRequestToSheets(sendData, () => {
    res.json({ success: true });
  });
});

export default router;