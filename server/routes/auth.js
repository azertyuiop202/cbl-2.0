import bcrypt from 'bcryptjs';
import config from 'config';
import express from 'express';
import jwt from 'jsonwebtoken';

import connection from '../connection.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  const query = `SELECT id, username, password FROM users WHERE username = '${username}'`;
  connection.query(query, (err, users) => {
    if (err || !users.length) return res.status(400).json({ msg: 'Invalid Credentials'});

    const user = users[0];
    if (password !== user.password) return res.status(400).json({ msg: 'Invalid Credentials'});
    // bcrypt.compare(password, user.password).then((isMatch) => {
    //   if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials'});

    jwt.sign(
      { id: user.id },
      config.get('jwtSecret'),
      {}, //No expiration
      (err, token) => {
        if (err) throw err;
        const resUser = (({ password, ...o }) => o)(user);
        return res.json({ token, user: resUser });
      }
    );
    // });
  });
});

export default router;