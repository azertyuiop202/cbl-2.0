import axios from 'axios';
import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';
import postRequestToSheets from './postRequestToSheets.js';

const router = express.Router();

router.get('/', auth, (req, res, next) => {
  const query = `SELECT * FROM starter_packs`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/:userId/isAvailable', auth, (req, res, next) => {
  const query = `SELECT has_redeemed_starter_pack FROM users WHERE id = ${req.params.userId}`;

  connection.query(query, (err, result) => {
    res.json(!result[0].has_redeemed_starter_pack);
  });
});

router.get('/:id', auth, (req, res, next) => {
  const query = `SELECT starter_packs.*, cards.link
    FROM starter_packs
      JOIN starter_packs_cards ON starter_packs_cards.starter_pack_id = starter_packs.id
      JOIN cards ON cards.id = starter_packs_cards.card_id
    WHERE starter_packs.id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => {
      return Object.keys(acc).length === 0
        ? { ...row, links: [row.link] }
        : { ...acc, links: [ ...acc.links, row.link ]}
    }, {}));
  });
});

router.post('/submitChoice', auth, (req, res, next) => {
  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    'pack': 'StarterPack', 
    'D': 'manual',
    'Booster': req.body.name,
  });
    
  postRequestToSheets(sendData, () => {
    res.json({ success: true });
  });
});

export default router;