const assert = require('assert');
const std = require('../../src');

/* global describe it */
describe('findNodes test', () => {
  const keys = [1, 5, 10, 50, 100, 500, 0];
  it('list findNodes test', () => {
    const list = new std.List();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      list.pushBack(Math.floor(Math.random() * limit));
    }

    const found = std.findNodes(list, keys);
    found.forEach((val) => {
      assert.strictEqual(keys.includes(val.getData()), true);
    });
  });

  it('setTree findNodes test', () => {
    const setTree = new std.SetTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      setTree.insert(Math.floor(Math.random() * limit));
    }

    const found = std.findNodes(setTree, keys);
    found.forEach((val) => {
      assert.strictEqual(keys.includes(val.getKey()), true);
    });
  });

  it('MultiSetTree removeCondition test', () => {
    const multiSetTree = new std.MultiSetTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiSetTree.insert(Math.floor(Math.random() * limit));
    }

    const found = std.findNodes(multiSetTree, keys);
    found.forEach((val) => {
      assert.strictEqual(keys.includes(val.getKey()), true);
    });
  });

  it('mapTree findNodes test', () => {
    const mapTree = new std.MapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      mapTree.insert(Math.floor(Math.random() * limit), i);
    }

    const found = std.findNodes(mapTree, keys);
    found.forEach((val) => {
      assert.strictEqual(keys.includes(val.getKey()), true);
    });
  });

  it('mutiMapTree removeCondition test', () => {
    const multiMapTree = new std.MultiMapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiMapTree.insert(Math.floor(Math.random() * limit * 10), i);
    }

    const found = std.findNodes(multiMapTree, keys);
    found.forEach((val) => {
      assert.strictEqual(keys.includes(val.getKey()), true);
    });
  });
});
