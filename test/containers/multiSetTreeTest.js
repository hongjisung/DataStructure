const assert = require('assert');
const MultiSetTree = require('../../src/containers/multiSetTree');

/* global describe it beforeEach */
describe('Multi Set Tree', () => {
  let multiSetTree;

  beforeEach('Initiate Multi set tree', () => { multiSetTree = new MultiSetTree(); });

  it('constructor check', () => {
    assert.strictEqual(multiSetTree.size(), 0);

    multiSetTree = new MultiSetTree((n1, n2) => n1 > n2);
    multiSetTree.insert(3);
    multiSetTree.insert(5);
    multiSetTree.insert(3);
    multiSetTree.insert(2);
    multiSetTree.insert(1);
    assert.deepEqual([1, 2, 3, 3, 5], [...multiSetTree]);

    const st = new MultiSetTree();
    st.insert(3);
    st.insert(5);
    st.insert(3);
    st.insert(2);
    st.insert(1);

    multiSetTree = new MultiSetTree(st);
    assert.deepEqual([5, 3, 3, 2, 1], [...multiSetTree]);
  });

  it('[Symbol.iterator] check', () => {
    multiSetTree.insert(3);
    multiSetTree.insert(5);
    multiSetTree.insert(2);
    multiSetTree.insert(3);
    multiSetTree.insert(1);
    const iterator = multiSetTree[Symbol.iterator]();
    let data = iterator.next();
    assert.strictEqual(data.value, 5);
    data = iterator.next();
    assert.strictEqual(data.value, 3);
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
    assert.strictEqual(multiSetTree.size(), 0);
    multiSetTree.insert(3);
    multiSetTree.insert(4);
    multiSetTree.insert(5);
    assert.strictEqual(multiSetTree.size(), 3);
    multiSetTree.insert(3);
    multiSetTree.insert(3);
    assert.strictEqual(multiSetTree.size(), 5);
    multiSetTree.insert(4);
    assert.strictEqual(multiSetTree.size(), 6);
    multiSetTree.insert(1);
    assert.strictEqual(multiSetTree.size(), 7);
  });

  it('insert() check', () => {
    assert.strictEqual(multiSetTree.insert(3), true);
    assert.strictEqual(multiSetTree.insert(4), true);
    assert.strictEqual(multiSetTree.insert(1), true);
    assert.strictEqual(multiSetTree.insert(3), true);
    assert.strictEqual(multiSetTree.insert(1), true);
    assert.strictEqual(multiSetTree.insert(5), true);
  });

  it('erase() check', () => {
    assert.strictEqual(multiSetTree.erase(3), false);
    multiSetTree.insert(3);
    multiSetTree.insert(3);
    multiSetTree.insert(3);
    assert.strictEqual(multiSetTree.erase(3), multiSetTree.end());
    assert.strictEqual(multiSetTree.size(), 0);
    assert.strictEqual(multiSetTree.erase(3), false);
  });

  it('count() check', () => {
    assert.strictEqual(multiSetTree.count(3), 0);
    multiSetTree.insert(3);
    multiSetTree.insert(3);
    assert.strictEqual(multiSetTree.count(3), 2);
    multiSetTree.insert(4);
    multiSetTree.insert(6);
    assert.strictEqual(multiSetTree.count(6), 1);
    multiSetTree.insert(1);
    multiSetTree.insert(6);
    assert.strictEqual(multiSetTree.count(1), 1);
    assert.strictEqual(multiSetTree.count(2), 0);
  });

  it('find() check', () => {
    assert.strictEqual(multiSetTree.find(3), multiSetTree.end());
    multiSetTree.insert(3);
    multiSetTree.insert(3);
    multiSetTree.insert(4);
    assert.strictEqual(multiSetTree.find(4).getKey(), 4);
    multiSetTree.insert(6);
    multiSetTree.insert(1);
    multiSetTree.insert(6);
    assert.strictEqual(multiSetTree.find(6).getKey(), 6);
    assert.strictEqual(multiSetTree.find(3).getKey(), 3);
  });

  it('lowerBound() check', () => {
    multiSetTree.insert(3);
    multiSetTree.insert(7);
    multiSetTree.insert(-3);
    multiSetTree.insert(4);
    multiSetTree.insert(3);
    multiSetTree.insert(1);
    let node = multiSetTree.lowerBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = multiSetTree.lowerBound(3);
    assert.strictEqual(node.getKey(), 3);
    node = multiSetTree.lowerBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = multiSetTree.lowerBound(-4);
    assert.strictEqual(node, multiSetTree.end());
    node = multiSetTree.lowerBound(1);
    assert.strictEqual(node.getKey(), 1);
  });

  it('upperBound() check', () => {
    multiSetTree.insert(3);
    multiSetTree.insert(7);
    multiSetTree.insert(-3);
    multiSetTree.insert(4);
    multiSetTree.insert(3);
    multiSetTree.insert(1);
    let node = multiSetTree.upperBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = multiSetTree.upperBound(3);
    assert.strictEqual(node.getKey(), 1);
    node = multiSetTree.upperBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = multiSetTree.upperBound(-4);
    assert.strictEqual(node, multiSetTree.end());
    node = multiSetTree.upperBound(1);
    assert.strictEqual(node.getKey(), -3);
  });
});
