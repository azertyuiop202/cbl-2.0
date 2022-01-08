import express from 'express';

import connection from '../connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/specialVotes/:userId', auth, (req, res, next) => {
  const query = `
    SELECT matches.*, celebs.id as celeb_id, celebs.name, mv.celeb_id as voted_celeb_id
    FROM matches
      JOIN matches_celebs mc ON mc.match_id = matches.id
      JOIN celebs ON celebs.id = mc.celeb_id
      LEFT JOIN matches_votes mv ON mv.match_id = matches.id
    WHERE matches.active = 1 AND matches.special_vote = 1 AND (mv.user_id = ${req.params.userId} OR mv.id IS NULL)
    ORDER BY number ASC
  `;

  connection.query(query, (err, result) => {
    const matchObjects = result
      .reduce((matches, match) => {
        return { ...matches, [match.id]: [ ...(match.id in matches ? matches[match.id] : []), match ] };
      }, {});
    const matches = Object.entries(matchObjects).map(createMatchObject);
    res.json(matches);
  });
});

router.post('/vote/:userId', auth, (req, res, next) => {
  const { matchId, celebId } = req.body;

  let query = `SELECT id FROM matches_votes WHERE match_id = ${matchId} AND user_id = ${req.params.userId}`;
  connection.query(query, (err, result) => {
    if (result.length) {
      query = `UPDATE matches_votes SET celeb_id = ${celebId} WHERE match_id = ${matchId} AND user_id = ${req.params.userId}`;
    } else {
      query = `INSERT INTO matches_votes (match_id, user_id, celeb_id) VALUES (${matchId}, ${req.params.userId}, ${celebId})`;
    }

    connection.query(query, (err, result) => {
      res.json(!!result);
    });
  });
});

const createMatchObject = ([_, match]) => {
  return {
    id: match[0].id,
    date: match[0].date,
    type: match[0].type,
    celebs: match.map((matchCeleb) => { return { id: matchCeleb.celeb_id, name: matchCeleb.name } }),
    vote: match[0].voted_celeb_id || 0
  };
}

export default router;