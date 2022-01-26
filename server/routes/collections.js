import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/user/:userId', auth, (req, res, next) => {
  const query = `SELECT * FROM collections WHERE user_id = ${req.params.userId}`;

  connection.query(query, (err, result) => {
    res.json(result);
  })
});

router.get('/:collectionId', auth, (req, res, next) => {
  const query = `
    SELECT cc.card_id
    FROM collection_cards cc
      JOIN collections c ON c.id = cc.collection_id
    WHERE c.id = ${req.params.collectionId}`;

  connection.query(query, (err, result) => {
    res.json(result.map((card) => card.card_id));
  });
});

router.put('/:collectionId/cards', auth, (req, res, next) => {
  console.log(req.body);
  let query = `DELETE FROM collection_cards WHERE collection_id = ${req.params.collectionId}`;

  connection.query(query, (err, result) => {
    const values = req.body.map((card) => `(${req.params.collectionId}, "${card}")`);
    query = `INSERT INTO collection_cards (collection_id, card_id) VALUES ${values.join(', ')}`;
    console.log(values);
    console.log(query);

    connection.query(query, (err, result) => {
      console.log(err, result);
      res.json({success: true});
    });
  });
});

export default router;