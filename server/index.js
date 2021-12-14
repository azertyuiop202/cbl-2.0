import express from 'express';

import user from './routes/user.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api/user', user);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});