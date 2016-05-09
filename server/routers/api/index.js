import { Router } from 'express';
import { helloWorld } from '../../lib/data';
const apiRouter = new Router();

apiRouter.get('/helloWorld', (req, res, next) => {
  delete req.query.skipServerBit; //this should not affect the api
  helloWorld(req.params, req.query).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(500, err.message);
  });
});

export default apiRouter;
