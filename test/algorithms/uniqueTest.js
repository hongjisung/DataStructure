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
});
