import React from 'react';
import { render } from 'react-dom';
import Main from './main.jsx';

render(
  (
    <Main {...window.props} />
  ),
  document.getElementById('main')
);