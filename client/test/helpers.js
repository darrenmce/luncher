import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, createRenderer, Simulate,
  findRenderedDOMComponentWithClass as findComponentWithClass,
  scryRenderedDOMComponentsWithClass as findComponentsWithClass,
  findRenderedDOMComponentWithTag as findComponentWithTag,
  scryRenderedDOMComponentsWithTag as findComponentsWithTag,
  findRenderedComponentWithType as findComponentWithType,
  scryRenderedComponentsWithType as findComponentsWithType
} from 'react-addons-test-utils';

let { assert, expect } = chai;

chai.should();
chai.use(sinonChai);

const shallowRender = (Element, props) => {
  const renderer = createRenderer();
  renderer.render(React.createElement(Element, props));
  return renderer.getRenderOutput();
};

export {
  React,
  chai,
  sinon,
  sinonChai,
  assert,
  expect,
  findDOMNode,
  renderIntoDocument,
  findComponentWithClass,
  findComponentsWithClass,
  findComponentWithTag,
  findComponentsWithTag,
  findComponentWithType,
  findComponentsWithType,
  Simulate,
  createRenderer,
  shallowRender
};