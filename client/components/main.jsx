import React, { Component } from 'react';
import { addDataSources } from './higher-order/data-source.jsx';

const dataSources = [
  { source: 'helloWorld', defaultData: { text: 'not loaded!' } }
];

function Main({helloWorld}) {
  return (
    <div>
      <h1>{helloWorld.text}</h1>
    </div>
  );
}

export default addDataSources(dataSources, Main);
export { Main };
export { dataSources };