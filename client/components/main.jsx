import React, { Component } from 'react';
import { addDataSources } from './higher-order/data-source.jsx';

function Main({heading, heading2}) {
  return (
    <div>
      <h1>{heading.text}</h1>
      <h2>{heading2.text}</h2>
    </div>
  );
}

export default addDataSources([
  { source: 'heading2', defaultData: { text: 'default2' } },
  { source: 'heading', defaultData: { text: 'default' } }
], Main);

export { Main };