import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, (req, res, next) => {
  const query = `
    SELECT cards.*, celebs.number, celebs.name, user_cards.amount
    FROM cards
      JOIN celebs ON celebs.id = cards.celeb_id
      JOIN card_types ON card_types.id = cards.type
      LEFT JOIN user_cards ON user_cards.card_id = cards.id
    ORDER BY celebs.number, card_types.index
  `;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/cardOfTheWeek', auth, (req, res, next) => {
  const query = `
    SELECT celebs.name, cards.type, cards.make, cards.link
    FROM cards
      JOIN info ON info.value = cards.id
      JOIN celebs ON celebs.id = cards.celeb_id
    WHERE info.\`key\` = 'card of the week'
  `;

  connection.query(query, (err, result) => {
    res.json(result[0]);
  });
});

router.get('/collection/:userId', auth, (req, res, next) => {
  const query = `
    SELECT cards.*, celebs.number, celebs.name, user_cards.amount
    FROM cards
      JOIN celebs ON celebs.id = cards.celeb_id
      JOIN user_cards ON user_cards.card_id = cards.id
      JOIN card_types ON card_types.id = cards.type
    WHERE user_cards.user_id = ${req.params.userId}
    ORDER BY celebs.name, card_types.index
  `;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/celeb/:celebNumber/:userId', auth, (req, res, next) => {
  const query = `
    SELECT cards.*, celebs.number, celebs.name, user_cards.amount
    FROM cards
      JOIN celebs ON celebs.id = cards.celeb_id
      JOIN card_types ON card_types.id = cards.type
      LEFT JOIN user_cards ON user_cards.card_id = cards.id AND user_cards.user_id = ${req.params.userId}
    WHERE celebs.number = ${req.params.celebNumber}
    ORDER BY card_types.index
  `;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/type/:typeId/:userId', auth, (req, res, next) => {
  const query = `
    SELECT cards.*, celebs.number, celebs.name, user_cards.amount
    FROM cards
      JOIN celebs ON celebs.id = cards.celeb_id
      JOIN card_types ON card_types.id = cards.type
      LEFT JOIN user_cards ON user_cards.card_id = cards.id AND user_cards.user_id = ${req.params.userId}
    WHERE card_types.id = "${req.params.typeId}"
    ORDER BY celebs.name
  `;

  connection.query(query, (err, result) => {
    res.json(result);
  });
});

router.get('/types', auth, (req, res, next) => {
  const query = `SELECT id, \`index\` FROM card_types ORDER BY \`index\``;

  connection.query(query, (err, result) => {
    res.json(result);
  })
});

export default router;