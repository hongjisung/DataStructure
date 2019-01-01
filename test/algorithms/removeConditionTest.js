const assert = require('assert');
const std = require('../../src');

/* global describe it */
describe('removeCondition test', () => {
  it('list removeCondition test', () => {
    const list = new std.List();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      list.pushBack(Math.floor(Math.random() * limit * 10));
    }
    std.removeCondition(list, data => data < limit * 5);
    for (let node = list.begin(); node !== list.end(); node = node.getNext()) {
      assert.strictEqual(node.getData() >= 5000, true);
    }
  });

  it('setTree removeCondition test', () => {
    const setTree = new std.SetTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      setTree.insert(Math.floor(Math.random() * limit * 10));
    }
    std.removeCondition(setTree, data => data < limit * 5);
    for (let node = setTree.begin(); node !== setTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getKey() >= 5000, true);
    }
    std.removeCondition(setTree, data => data >= limit * 5);
    assert.strictEqual(setTree.size(), 0);
    assert.strictEqual(setTree.begin(), null);
  });

  it('MultiSetTree removeCondition test', () => {
    const multiSetTree = new std.MultiSetTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiSetTree.insert(Math.floor(Math.random() * limit * 10));
    }
    std.removeCondition(multiSetTree, data => data < limit * 5);
    for (let node = multiSetTree.begin(); node !== multiSetTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getKey() >= 5000, true);
    }
    std.removeCondition(multiSetTree, data => data >= limit * 5);
    assert.strictEqual(multiSetTree.size(), 0);
    assert.strictEqual(multiSetTree.begin(), null);
  });

  it('mapTree removeCondition test', () => {
    const mapTree = new std.MapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      mapTree.insert(Math.floor(Math.random() * limit * 10), i);
    }
    std.removeCondition(mapTree, data => data < limit * 5);
    for (let node = mapTree.begin(); node !== mapTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getKey() >= 5000, true);
    }
  });

  it('mutiMapTree removeCondition test', () => {
    const multiMapTree = new std.MultiMapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiMapTree.insert(Math.floor(Math.random() * limit * 10), i);
    }
    std.removeCondition(multiMapTree, data => data < limit * 5);
    for (let node = multiMapTree.begin(); node !== multiMapTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getKey() >= 5000, true);
    }
  });
});
