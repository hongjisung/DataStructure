const assert = require('assert');
const SetTree = require('../src/setTree');

/* global describe it beforeEach */
describe('Set Tree', () => {
  let setTree;

  beforeEach('Initiate set tree', () => { setTree = new SetTree(); });

  it.apply('', () => { 
    assert.strictEqual(setTree.size(), 0);
  });
});
