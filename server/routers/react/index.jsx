import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router } from 'express';

import Main, { dataSources as mainDataSources } from '../../../client/components/main.jsx';
import {getDataSources} from '../../lib/data-source.js';

const reactHandler = (req, res) => {
  getDataSources(mainDataSources, req.params, req.query).then((dataSources) => {
    const reactHtml = renderToString(<Main {...dataSources} />);

    return res.render('index', {
      title: 'Main',
      htmlContent: reactHtml,
      props: JSON.stringify(dataSources)
    });
  });

};

const reactRouter = new Router();

reactRouter.get('/', reactHandler);

export default reactRouter;