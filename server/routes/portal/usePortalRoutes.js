import starterPacks from './starterPacks.js';

export default (app) => {
  app.use('/api/portal/starterPacks', starterPacks);
}