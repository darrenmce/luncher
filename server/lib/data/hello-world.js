import Promise from 'bluebird';

function helloWorld(params, query) {
  if (query.skipServerBit) {
    return Promise.reject(new Error('skip server bit on'));
  }
  return Promise.resolve({ text: 'Hello World' });
}

export default helloWorld;