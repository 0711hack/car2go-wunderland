const assert = require('assert');
const wonderland = require('../lib/wonderland.js');

describe('Testsuite', () => {
  'use strict';
  
  describe('array_diff', () => {
    it('current = target, 1 element', () => {
      const current = [{"id":"NH-5","x":1808.0629202796795,"y":1527.3962819882568}];
      assert.deepEqual(wonderland.array_diff(current, current), []);
      assert.deepEqual(wonderland.array_diff(current, current), []);
    });
  });
});