import {
  expect,
  findDOMNode,
  React,
  shallowRender
} from '../helpers.js';

import { Main } from '../../components/main.jsx';

describe('main.jsx tests', () => {

  it('should render a hello world and goodbye world', () => {
    const output = shallowRender(Main, {
      heading: { text: 'Hello World' },
      heading2: { text: 'Goodbye World' }
    });

    expect(output.type).to.eql('div');

    expect(output.props.children).to.have.length(2);

    const h1 = output.props.children[0];
    const h2 = output.props.children[1];

    expect(h1.type).to.eql('h1');
    expect(h1.props.children).to.eq('Hello World');
    expect(h2.type).to.eql('h2');
    expect(h2.props.children).to.eq('Goodbye World');
  });

});