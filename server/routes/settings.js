import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:setting', auth, (req, res, next) => {
  const query = `SELECT \`value\` FROM settings WHERE \`key\` = '${req.params.setting}'`;

  connection.query(query, (err, result) => {
    res.json(result[0].value);
  });
});

export default router;