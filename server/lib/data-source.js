import * as dataLibs from './data';
import Promise from 'bluebird';

function getDataSources(dataSources, params, query) {
  const results = {};

  dataSources.forEach((dataSource) => {
    const {source} = dataSource;
    if (source) {
      results[source] = dataSource.defaultData;
      if (typeof dataLibs[source] === 'function') {
        results[source] = dataLibs[source](params, query).catch(() => null);
      }
    }
  });

  return Promise.props(results);
}

export {getDataSources};