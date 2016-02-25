import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate,
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
  Simulate
};