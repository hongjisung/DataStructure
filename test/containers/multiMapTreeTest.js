const assert = require('assert');
const MultiMapTree = require('../../src/containers/multiMapTree');

/* global describe it beforeEach */
describe('Multi Map Tree', () => {
  let multiMapTree;

  beforeEach('Initiate Multi map tree', () => { multiMapTree = new MultiMapTree(); });

  it('constructor check', () => {
    assert.strictEqual(multiMapTree.size(), 0);

    multiMapTree = new MultiMapTree((n1, n2) => n1 > n2);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(5, 2);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(2, 2);
    multiMapTree.insert(1, 2);
    assert.deepEqual([[1, 2], [2, 2], [3, 2], [3, 2], [5, 2]], [...multiMapTree]);

    const st = new MultiMapTree();
    st.insert(3, 2);
    st.insert(3, 2);
    st.insert(5, 2);
    st.insert(2, 2);
    st.insert(1, 2);

    multiMapTree = new MultiMapTree(st);
    assert.deepEqual([[5, 2], [3, 2], [3, 2], [2, 2], [1, 2]], [...multiMapTree]);
  });

  it('[Symbol.iterator] check', () => {
    multiMapTree.insert(3, 7);
    multiMapTree.insert(5, 2);
    multiMapTree.insert(2, 8);
    multiMapTree.insert(4, multiMapTree.end());
    multiMapTree.insert(1, 'abc');
    const iterator = multiMapTree[Symbol.iterator]();
    let data = iterator.next();
    assert.strictEqual(data.value[0], 5);
    assert.strictEqual(data.value[1], 2);
    data = iterator.next();
    assert.strictEqual(data.value[0], 4);
    assert.strictEqual(data.value[1], multiMapTree.end());
    data = iterator.next();
    assert.strictEqual(data.value[0], 3);
    assert.strictEqual(data.value[1], 7);
    data = iterator.next();
    assert.strictEqual(data.value[0], 2);
    assert.strictEqual(data.value[1], 8);
    data = iterator.next();
    assert.strictEqual(data.value[0], 1);
    assert.strictEqual(data.value[1], 'abc');
    data = iterator.next();
    assert.strictEqual(data.value, undefined);
  });

  it('size() check', () => {
    assert.strictEqual(multiMapTree.size(), 0);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(4, 2);
    multiMapTree.insert(5, 2);
    assert.strictEqual(multiMapTree.size(), 3);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(3, 2);
    assert.strictEqual(multiMapTree.size(), 5);
    multiMapTree.insert(4, 2);
    assert.strictEqual(multiMapTree.size(), 6);
    multiMapTree.insert(1, 2);
    assert.strictEqual(multiMapTree.size(), 7);
  });

  it('insert() check', () => {
    assert.strictEqual(multiMapTree.insert(3, 2), true);
    assert.strictEqual(multiMapTree.insert(4, 2), true);
    assert.strictEqual(multiMapTree.insert(1, 2), true);
    assert.strictEqual(multiMapTree.insert(3, 2), true);
    assert.strictEqual(multiMapTree.insert(1, 2), true);
    assert.strictEqual(multiMapTree.insert(5, 2), true);
  });

  it('erase() check', () => {
    assert.strictEqual(multiMapTree.erase(3), false);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(3, 'abc');
    multiMapTree.insert(3, [7, 4, 1]);
    assert.strictEqual(multiMapTree.erase(3), multiMapTree.end());
    assert.strictEqual(multiMapTree.size(), 0);
    assert.strictEqual(multiMapTree.erase(3), false);
  });

  it('assign() check', () => {
    assert.strictEqual(multiMapTree.assign(3, 'abc'), false);
    multiMapTree.insert(3, 4);
    assert.strictEqual(multiMapTree.assign(3, 'abc'), true);
    assert.strictEqual(multiMapTree.find(3).getValue(), 'abc');
    multiMapTree.insert(3, 6);
    multiMapTree.insert(3, [1, 5]);
    assert.strictEqual(multiMapTree.assign(3, 'all changed'), true);
    const range = multiMapTree.equalRange(3);
    for (let itr = range[0]; itr !== range[1]; itr = itr.getNext()) {
      assert.strictEqual(itr.getValue(), 'all changed');
    }
    multiMapTree.erase(3);
    assert.strictEqual(multiMapTree.assign(3, -1), false);
  });

  it('insertOrAssign() check', () => {
    multiMapTree.insertOrAssign(3, 'ab');
    assert.strictEqual(multiMapTree.find(3).getValue(), 'ab');
    multiMapTree.insertOrAssign(3, 7);
    assert.strictEqual(multiMapTree.find(3).getValue(), 7);
  });

  it('count() check', () => {
    assert.strictEqual(multiMapTree.count(3), 0);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(3, 2);
    assert.strictEqual(multiMapTree.count(3), 2);
    multiMapTree.insert(4, 2);
    multiMapTree.insert(6, 2);
    assert.strictEqual(multiMapTree.count(6), 1);
    multiMapTree.insert(1, 2);
    multiMapTree.insert(6, 2);
    assert.strictEqual(multiMapTree.count(1), 1);
    assert.strictEqual(multiMapTree.count(2), 0);
  });

  it('find() check', () => {
    assert.strictEqual(multiMapTree.find(3), multiMapTree.end());
    multiMapTree.insert(3, 2);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(4, 2);
    assert.strictEqual(multiMapTree.find(4).getKey(), 4);
    multiMapTree.insert(6, 2);
    multiMapTree.insert(1, 2);
    multiMapTree.insert(6, 2);
    assert.strictEqual(multiMapTree.find(6).getKey(), 6);
    assert.strictEqual(multiMapTree.find(3).getKey(), 3);
  });

  it('lowerBound() check', () => {
    multiMapTree.insert(3, 2);
    multiMapTree.insert(7, 2);
    multiMapTree.insert(-3, 2);
    multiMapTree.insert(4, 2);
    multiMapTree.insert(1, 2);
    let node = multiMapTree.lowerBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = multiMapTree.lowerBound(3);
    assert.strictEqual(node.getKey(), 3);
    node = multiMapTree.lowerBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = multiMapTree.lowerBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = multiMapTree.lowerBound(1);
    assert.strictEqual(node.getKey(), 1);
  });

  it('upperBound() check', () => {
    multiMapTree.insert(3, 2);
    multiMapTree.insert(7, 2);
    multiMapTree.insert(-3, 2);
    multiMapTree.insert(3, 2);
    multiMapTree.insert(4, 2);
    multiMapTree.insert(1, 2);
    let node = multiMapTree.upperBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = multiMapTree.upperBound(3);
    assert.strictEqual(node.getKey(), 1);
    node = multiMapTree.upperBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = multiMapTree.upperBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = multiMapTree.upperBound(1);
    assert.strictEqual(node.getKey(), -3);
  });
});
