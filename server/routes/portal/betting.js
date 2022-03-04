import axios from 'axios';
import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';

const router = express.Router();

router.get('/title', auth, (req, res, next) => {
  const query = `SELECT \`value\` FROM settings WHERE \`key\` = 'betting_title'`;

  connection.query(query, (err, result) => {
    res.json(result[0].value);
  });
});

router.get('/matches', auth, (req, res, next) => {
  const query = `SELECT * FROM betting_matches`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => {
      return {
        ...acc,
        [row.league]: [
          ...(row.league in acc ? acc[row.league] : []),
          row
        ]
      };
    }, {}));
  });
});

router.post('/submit', auth, (req, res, next) => {
  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    ...req.body
  });

  console.log(sendData);

  const query = `SELECT \`value\` FROM settings WHERE \`key\` = 'betting_sheet_url'`;

  connection.query(query, (err, url) => {
    axios.post(url[0].value, sendData).then(() => {
      res.json({ success: true });
    });
  });
});

export default router;