import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', auth, (req, res, next) => {
  const query = `
    SELECT orders.*, osa.type, osa.value, cards.link
    FROM orders
      JOIN orders_spent_acquired osa ON osa.order_id = orders.id
      LEFT JOIN cards ON cards.id = osa.value
    WHERE orders.user_id = ${req.params.userId}
  `;

  connection.query(query, (err, result) => {
    const ordersObject = result
      .reduce((orders, order) => {
        return { ...orders, [order.id]: [ ...(order.id in orders ? orders[order.id] : []), order ] };
      }, {});
    const orders = Object.entries(ordersObject).map(createOrderObject);
    res.json(orders);
  });
});

const createOrderObject = ([_, orderRows]) => {
  const basicOrderFields = (({ id, order_id, timestamp, tokens, gc, description, errors }) =>
    ({ id, order_id, timestamp, tokens, gc, description, errors }))(orderRows[0]);
  const order = { ...basicOrderFields, spentAcquired: [], boosters: [] };

  orderRows.forEach((orderRow) => {
    switch (orderRow.type) {
      case 'card':
        order.spentAcquired.push({ type: 'card', id: orderRow.value, link: orderRow.link });
        break;
      case 'acquired':
        order.spentAcquired.push({ type: 'text', value: orderRow.value });
        break;
      case 'booster':
      case 'exp_used':
      case 'exp_reward':
      case 'exchange_type':
      case 'exchange_value':
      case 'combine_type':
      case 'combine_number':
        order.boosters.push(orderRow.value);
        break;
      default:
        break;
    }

    return order;
  });

  return order;
}

export default router;