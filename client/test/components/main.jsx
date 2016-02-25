import {
  expect,
  findDOMNode,
  React,
  renderIntoDocument
} from '../helpers.js';

import Main from '../../components/main.jsx';

describe('main.jsx tests', () => {

  let node;

  function render() {
    node = renderIntoDocument(
      <Main />
    );
  }

  it('should render a hello world', () => {
    render();
    expect(findDOMNode(node).textContent).to.eq('Hello World');
  });

});