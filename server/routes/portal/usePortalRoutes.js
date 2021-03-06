import betting from './betting.js';
import combine from './combine.js';
import exchange from './exchange.js';
import packs from './packs.js';
import slots from './slots.js';
import starterPacks from './starterPacks.js';
import trivia from './trivia.js';

export default (app) => {
  app.use('/api/portal/betting', betting);
  app.use('/api/portal/combine', combine);
  app.use('/api/portal/exchange', exchange);
  app.use('/api/portal/packs', packs);
  app.use('/api/portal/slots', slots);
  app.use('/api/portal/starterPacks', starterPacks);
  app.use('/api/portal/trivia', trivia);
}