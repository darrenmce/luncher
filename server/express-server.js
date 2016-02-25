import http from 'http';
import path from 'path';

import compression from 'compression';
import express from 'express';
import bunyanExpress from 'express-bunyan-logger';

/* Routers */
import createHealthRouter from './routers/health';
import reactRouter from './routers/react/index.jsx';

const root = path.normalize(path.join(__dirname, '/..'));

export default (config, log) => {

  const app = express();
  const server = http.createServer(app);

  const env = app.get('env'); //set by ENV var

  /* Configure Express Server */

  app.use(compression());

  app.use('/static', express.static(path.join(root, 'client', 'build')));

  app.set('views', [root + '/client/views']);
  app.set('view engine', 'jade');

  app.use(bunyanExpress({
    logger: log,
    excludes: ['body', 'short-body', 'req-headers', 'res-headers', 'incoming'],
    format: ':res[statusCode] :method :url'
  }));

  /* App Routes */
  app.use('/health', createHealthRouter(config.name, config.version));
  app.use('/', reactRouter);

  return server;
}