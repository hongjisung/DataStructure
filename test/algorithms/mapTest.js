const assert = require('assert');
const std = require('../../src');

/* global describe it */
describe('map test', () => {
  it('list map test', () => {
    const list = new std.List();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      list.pushBack(i);
    }

    std.map(list, val => val * 1000);
    let check = 0;
    for (let node = list.begin(); node !== list.end(); node = node.getNext()) {
      assert.strictEqual(node.getData(), check * 1000);
      check += 1;
    }
  });

  it('mapTree map test', () => {
    const mapTree = new std.MapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      const val = Math.floor(Math.random() * limit * 10);
      mapTree.insert(val, val);
    }

    std.map(mapTree, val => val * 1000);
    for (let node = mapTree.begin(); node !== mapTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getValue(), node.getKey() * 1000);
    }
  });

  it('mutiMapTree map test', () => {
    const multiMapTree = new std.MultiMapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      const val = Math.floor(Math.random() * limit * 10);
      multiMapTree.insert(val, val);
    }

    std.map(multiMapTree, val => val * 1000);
    for (let node = multiMapTree.begin(); node !== multiMapTree.end(); node = node.getNext()) {
      assert.strictEqual(node.getValue(), node.getKey() * 1000);
    }
  });
});
