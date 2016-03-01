import bunyan from 'bunyan';
import supertest from 'supertest';
import config from '../config.js';
import createExpressServer from '../express-server.js';

describe('web server tests', () => {

  let server;

  before(() => {
    const log = bunyan.createLogger({ name: 'test', level: 'fatal' });
    config.server.port = 13131; //to not conflict with a running app!
    server = createExpressServer(config, log);
  });

  after(() => {
    server.close();
  });

  describe('/health', () => {
    it('should respond with process information', (done) => {
      supertest(server)
        .get('/health')
        .expect('content-type', /application\/json/)
        .expect(200, /luncher/, done);
    });
  });

  describe('/', () => {
    it('should respond with html content', (done) => {
      supertest(server)
        .get('/')
        .expect(200, /<html/, done);
    });
  });

});