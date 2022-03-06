import axios from 'axios';
import express from 'express';

import connection from '../../connection.js';
import { auth } from '../../middleware/auth.js';

const router = express.Router();

router.post('/submit', auth, (req, res, next) => {
  var sendData = JSON.stringify({
    'Username': req.user.username,
    'PIN': req.user.pin,
    ...req.body
  });

  const query = `SELECT \`value\` FROM settings WHERE \`key\` = 'slots_sheet_url'`;

  connection.query(query, (err, url) => {
    axios.post(url[0].value, sendData).then(() => {
      res.json({ success: true });
    });
  });
});

export default router;