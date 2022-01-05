import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import auth from './routes/auth.js';
import cards from './routes/cards.js';
import celebs from './routes/celebs.js';
import info from './routes/info.js';
import orders from './routes/orders.js';
import slots from './routes/slots.js';
import tradeslist from './routes/tradeslist.js';
import triviaAnswers from './routes/triviaAnswers.js';
import users from './routes/users.js';
import wishlist from './routes/wishlist.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/celebs', celebs);
app.use('/api/info', info);
app.use('/api/orders', orders);
app.use('/api/slots', slots);
app.use('/api/tradeslist', tradeslist);
app.use('/api/triviaAnswers', triviaAnswers);
app.use('/api/users', users);
app.use('/api/wishlist', wishlist);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});