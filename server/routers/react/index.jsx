import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router } from 'express';

import Main from '../../../client/components/main.jsx';

const reactHandler = (req, res) => {
  const reactHtml = renderToString(<Main />);

  return res.render('index', {
    title: 'Main',
    htmlContent: reactHtml,
    props: '{}'
  });
};

const reactRouter = new Router();

reactRouter.get('/', reactHandler);

export default reactRouter;