import combine from './combine.js';
import starterPacks from './starterPacks.js';

export default (app) => {
  app.use('/api/portal/combine', combine);
  app.use('/api/portal/starterPacks', starterPacks);
}