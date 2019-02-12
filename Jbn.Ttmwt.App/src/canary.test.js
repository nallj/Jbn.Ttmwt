import React from 'react';
import ReactDOM from 'react-dom';
//var chai = require('chai')
//  , expect = chai.expect
//  , should = chai.should();

import { expect } from 'chai';
import App from './App';
//var App = require('.');

describe('Canary test', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<App />);
    expect(root).toExist();
  });
});