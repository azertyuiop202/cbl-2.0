import betting from './betting.js';
import combine from './combine.js';
import exchange from './exchange.js';
import starterPacks from './starterPacks.js';

export default (app) => {
  app.use('/api/portal/betting', betting);
  app.use('/api/portal/combine', combine);
  app.use('/api/portal/exchange', exchange);
  app.use('/api/portal/starterPacks', starterPacks);
}