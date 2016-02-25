import { Router } from 'express';

const healthCheckData = (appName, appVersion) => ({
  pid: process.pid,
  memory: process.memoryUsage(),
  uptime: process.uptime(),
  name: appName,
  version: appVersion,
  nodeVersion: process.version,
  timestamp: new Date().toISOString()
});

export default (appName, appVersion) => {
  const healthRouter = new Router();
  healthRouter.get('/', (req, res) => {
    res.send(healthCheckData(appName, appVersion))
  });
  return healthRouter;
};