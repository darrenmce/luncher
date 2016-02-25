import bunyan from 'bunyan';

import expressServer from './express-server.js';
import config from './config.js';

const log = bunyan.createLogger(config.server.log);

function unhandledExceptionHandler(err) {
  log.error(err, 'uncaught exception, aborting process');
  process.exit(134);
}

process.on('uncaughtException', unhandledExceptionHandler);
process.on('unhandledRejection', unhandledExceptionHandler);

process.env.NODE_ENV = process.env.NODE_ENV || config.env || 'development';

if (!process.env.server || (process.env.server === 'true' || process.env.server === 'yes')) {
  const server = expressServer(config, log);
  server.listen(config.server.port, function () {
    log.info(`${config.name} server listening on ${config.server.port}, in ${process.env.NODE_ENV} mode`);
  });
}