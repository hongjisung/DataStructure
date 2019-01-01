const assert = require('assert');
const std = require('../../src');

/* global describe it */
describe('unique test', () => {
  it('list test', () => {
    const list = new std.List();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      list.pushBack(Math.floor(Math.random() * 10));
    }
    std.unique(list);
    const dict = {};
    for (let node = list.begin(); node !== list.end(); node = node.getNext()) {
      assert.strictEqual(dict[node.getData()], undefined);
      dict[node.getData()] = true;
    }
  });

  it('MultiSetTree removeCondition test', () => {
    const multiSetTree = new std.MultiSetTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiSetTree.insert(Math.floor(Math.random() * 10));
    }

    std.unique(multiSetTree);

    const dict = {};
    for (let node = multiSetTree.begin(); node !== multiSetTree.end(); node = node.getNext()) {
      assert.strictEqual(dict[node.getKey()], undefined);
      dict[node.getKey()] = true;
    }
  });

  it('mutiMapTree removeCondition test', () => {
    const multiMapTree = new std.MultiMapTree();
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      multiMapTree.insert(Math.floor(Math.random() * 10), i);
    }

    std.unique(multiMapTree);

    const dict = {};
    for (let node = multiMapTree.begin(); node !== multiMapTree.end(); node = node.getNext()) {
      assert.strictEqual(dict[node.getKey()], undefined);
      dict[node.getKey()] = true;
    }
  });
});
