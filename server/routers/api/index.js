import { Router } from 'express';

const apiRouter = new Router();

apiRouter.get('/heading', (req, res) => {
  res.send({text: 'Hello World'});
});

apiRouter.get('/heading2', (req, res) => {
  res.send({text: 'Hello World2'});
});

export default apiRouter;
