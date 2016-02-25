import rc from 'rc';
import { stdSerializers } from 'bunyan';
import {
  name as appName,
  version as appVersion } from '../package.json';

export default rc(appName, {
  name: appName,
  version: appVersion,
  env: 'development',
  server: {
    forceSSL: 'false',
    trustProxies: 0,
    port: 8080,
    defaultLanguage: 'en',
    log: {
      name: appName,
      level: 'debug',
      serializers: {
        req: stdSerializers.req,
        res: stdSerializers.res
      }
    }
  }
});