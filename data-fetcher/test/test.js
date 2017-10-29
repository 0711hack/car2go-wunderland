const assert = require('assert');
const index = require('../index.js');

describe('Testsuite', () => {
  'use strict';
  
  describe('filterLocations', () => {
    it('empty array', () => {
      assert.deepEqual([], index.filterLocations([]));
    });
    it('filter one', () => {
      assert.deepEqual([{x: 100, y: 100}], index.filterLocations([{x: 100, y: 100}, {x: 2000, y: 2000}]));
    });
  });
  describe('areDuplicate', () => {
    it('same', () => {
      assert.equal(true, index.areDuplicate({x: 50, y: 100}, {x: 50, y: 100}));
    });
    it('not', () => {
      assert.equal(false, index.areDuplicate({x: 50, y: 100}, {x: 50, y: 1000}));
    });
    it('not, reverse', () => {
      assert.equal(false, index.areDuplicate({x: 50, y: 1000}, {x: 50, y: 100}));
    });
    it('in', () => {
      assert.equal(true, index.areDuplicate({x: 50, y: 100}, {x: 50, y: 200}));
    });
    it('in, reverse', () => {
      assert.equal(true, index.areDuplicate({x: 50, y: 200}, {x: 50, y: 100}));
    });
  });
  describe('removeDuplicates', () => {
    it('empty list', () => {
      assert.deepEqual([], index.removeDuplicates([]));
    });
    it('single item', () => {
      assert.deepEqual([{id: 'id1', x: 50, y: 100}], index.removeDuplicates([{id: 'id1', x: 50, y: 100}]));
    });
    it('two exact same items', () => {
      assert.deepEqual([{id: 'id2', x: 50, y: 100}], index.removeDuplicates([{id: 'id1', x: 50, y: 100}, {id: 'id2', x: 50, y: 100}]));
    });
    it('two same items', () => {
      assert.deepEqual([{id: 'id2', x: 50, y: 200}], index.removeDuplicates([{id: 'id1', x: 50, y: 100}, {id: 'id2', x: 50, y: 200}]));
    });
    it('two same items and a third', () => {
      assert.deepEqual([{id: 'id2', x: 50, y: 200}, {id: 'id3', x: 500, y: 1000}], index.removeDuplicates([{id: 'id1', x: 50, y: 100}, {id: 'id2', x: 50, y: 200}, {id: 'id3', x: 500, y: 1000}]));
    });
  });
});