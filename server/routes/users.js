import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', auth, (req, res, next) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result[0]);
  });
});

router.get('/:id/totalCards', auth, (req, res, next) => {
  const query = `SELECT SUM(amount) as total FROM user_cards WHERE user_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    if (err || !result.length) return res.json(0);

    res.json(result[0].total);
  });
});

router.get('/:id/prizes', auth, (req, res, next) => {
  const query = `SELECT * FROM user_prizes WHERE user_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/:id/ranking', auth, (req, res, next) => {
  const query = `SELECT * FROM rankings WHERE user_id = ${req.params.id}`;

  connection.query(query, (err, result) => {
    res.json(result.reduce((acc, row) => { return { ...acc, [row.rank]: row.name } }, {}));
  });
})

router.post('/:id/ranking/:rank', auth, (req, res, next) => {
  const query = `INSERT INTO rankings (user_id, \`rank\`, name) VALUES (${req.params.id}, ${req.params.rank}, "${req.body.name}");`;

  connection.query(query, (err, result) => {
    res.json({success: true});
  });
})

router.put('/:id/ranking/:rank', auth, (req, res, next) => {
  const query = `UPDATE rankings SET name = "${req.body.name}" WHERE user_id = ${req.params.id} AND \`rank\` = ${req.params.rank};`;

  connection.query(query, (err, result) => {
    res.json({success: true});
  });
})

export default router;