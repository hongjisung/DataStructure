const assert = require('assert');
const SetTree = require('../src/setTree');

/* global describe it beforeEach */
describe('Set Tree', () => {
  let setTree;

  beforeEach('Initiate set tree', () => { setTree = new SetTree(); });

  it('constructor check', () => {
    assert.strictEqual(setTree.size(), 0);

    setTree = new SetTree((n1, n2) => n1 > n2);
    setTree.insert(3);
    setTree.insert(5);
    setTree.insert(4);
    setTree.insert(2);
    setTree.insert(1);
    assert.deepEqual([1, 2, 3, 4, 5], [...setTree]);

    const st = new SetTree();
    st.insert(3);
    st.insert(4);
    st.insert(5);
    st.insert(2);
    st.insert(1);

    setTree = new SetTree(st);
    assert.deepEqual([5, 4, 3, 2, 1], [...setTree]);
  });

  it('[Symbol.iterator] check', () => {
    setTree.insert(3);
    setTree.insert(5);
    setTree.insert(2);
    setTree.insert(4);
    setTree.insert(1);
    const iterator = setTree[Symbol.iterator]();
    let data = iterator.next();
    assert.strictEqual(data.value, 5);
    data = iterator.next();
    assert.strictEqual(data.value, 4);
    data = iterator.next();
    assert.strictEqual(data.value, 3);
    data = iterator.next();
    assert.strictEqual(data.value, 2);
    data = iterator.next();
    assert.strictEqual(data.value, 1);
    data = iterator.next();
    assert.strictEqual(data.value, undefined);
  });

  it('size() check', () => {
    assert.strictEqual(setTree.size(), 0);
    setTree.insert(3);
    setTree.insert(4);
    setTree.insert(5);
    assert.strictEqual(setTree.size(), 3);
    setTree.insert(3);
    setTree.insert(3);
    assert.strictEqual(setTree.size(), 3);
    setTree.insert(4);
    assert.strictEqual(setTree.size(), 3);
    setTree.insert(1);
    assert.strictEqual(setTree.size(), 4);
  });

  it('insert() check', () => {
    assert.strictEqual(setTree.insert(3), true);
    assert.strictEqual(setTree.insert(4), true);
    assert.strictEqual(setTree.insert(1), true);
    assert.strictEqual(setTree.insert(3), false);
    assert.strictEqual(setTree.insert(1), false);
    assert.strictEqual(setTree.insert(5), true);
  });

  it('erase() check', () => {
    assert.strictEqual(setTree.erase(3), false);
    setTree.insert(3);
    setTree.insert(3);
    setTree.insert(3);
    assert.strictEqual(setTree.erase(3), setTree.end());
    assert.strictEqual(setTree.size(), 0);
    assert.strictEqual(setTree.erase(3), false);
  });

  it('count() check', () => {
    assert.strictEqual(setTree.count(3), 0);
    setTree.insert(3);
    setTree.insert(3);
    assert.strictEqual(setTree.count(3), 1);
    setTree.insert(4);
    setTree.insert(6);
    assert.strictEqual(setTree.count(6), 1);
    setTree.insert(1);
    setTree.insert(6);
    assert.strictEqual(setTree.count(1), 1);
    assert.strictEqual(setTree.count(2), 0);
  });

  it('find() check', () => {
    assert.strictEqual(setTree.find(3), setTree.end());
    setTree.insert(3);
    setTree.insert(3);
    setTree.insert(4);
    assert.strictEqual(setTree.find(4).getKey(), 4);
    setTree.insert(6);
    setTree.insert(1);
    setTree.insert(6);
    assert.strictEqual(setTree.find(6).getKey(), 6);
    assert.strictEqual(setTree.find(3).getKey(), 3);
  });

  it('lowerBound() check', () => {
    setTree.insert(3);
    setTree.insert(7);
    setTree.insert(-3);
    setTree.insert(4);
    setTree.insert(1);
    let node = setTree.lowerBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = setTree.lowerBound(3);
    assert.strictEqual(node.getKey(), 3);
    node = setTree.lowerBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = setTree.lowerBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = setTree.lowerBound(1);
    assert.strictEqual(node.getKey(), 1);
  });

  it('upperBound() check', () => {
    setTree.insert(3);
    setTree.insert(7);
    setTree.insert(-3);
    setTree.insert(4);
    setTree.insert(1);
    let node = setTree.upperBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = setTree.upperBound(3);
    assert.strictEqual(node.getKey(), 1);
    node = setTree.upperBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = setTree.upperBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = setTree.upperBound(1);
    assert.strictEqual(node.getKey(), -3);
  });
});
