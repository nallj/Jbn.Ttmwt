var React = require('react');
import ReactDOM from 'react-dom';
//var TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
//var chai = require('chai')
//  , expect = chai.expect
//  , should = chai.should();
import { expect } from 'chai';
var Root = require('../root'); //my root-test lives in components/__tests__/, so this is how I require in my components.

describe('Canary test', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<Root />);
    expect(root).toExist();
  });
});