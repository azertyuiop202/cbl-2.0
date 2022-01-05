import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, (req, res, next) => {
  const query = `
    SELECT slots.*, slots_prizes.prize, cards.link
    FROM slots
      LEFT JOIN slots_prizes ON slots_prizes.slots_id = slots.id
      LEFT JOIN cards ON cards.id = slots_prizes.prize
    WHERE slots.user_id = ${req.params.userId}
  `;

  connection.query(query, (err, result) => {
    const slotsObjects = result
      .reduce((slots, slotsRow) => {
        return { ...slots, [slotsRow.id]: [ ...(slotsRow.id in slots ? slots[slotsRow.id] : []), slotsRow ] };
      }, {});
    const slots = Object.entries(slotsObjects).map(createSlotsObject);
    res.json(slots);
  });
});

const createSlotsObject = ([_, slotsRows]) => {
  return {
    id: slotsRows[0].id,
    timestamp: slotsRows[0].timestamp,
    prizes: slotsRows[0].prize ? slotsRows.map((slotsRow) => slotsRow.prize) : []
  };
}

export default router;