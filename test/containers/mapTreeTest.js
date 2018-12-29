const assert = require('assert');
const MapTree = require('../../src/containers/mapTree');

/* global describe it beforeEach */
describe('Map Tree', () => {
  let mapTree;

  beforeEach('Initiate map tree', () => { mapTree = new MapTree(); });

  it('constructor check', () => {
    assert.strictEqual(mapTree.size(), 0);

    mapTree = new MapTree((n1, n2) => n1 > n2);
    mapTree.insert(3, 2);
    mapTree.insert(5, 2);
    mapTree.insert(4, 2);
    mapTree.insert(2, 2);
    mapTree.insert(1, 2);
    assert.deepEqual([[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], [...mapTree]);

    const st = new MapTree();
    st.insert(3, 2);
    st.insert(4, 2);
    st.insert(5, 2);
    st.insert(2, 2);
    st.insert(1, 2);

    mapTree = new MapTree(st);
    assert.deepEqual([[5, 2], [4, 2], [3, 2], [2, 2], [1, 2]], [...mapTree]);
  });

  it('[Symbol.iterator] check', () => {
    mapTree.insert(3, 7);
    mapTree.insert(5, 2);
    mapTree.insert(2, 8);
    mapTree.insert(4, mapTree.end());
    mapTree.insert(1, 'abc');
    const iterator = mapTree[Symbol.iterator]();
    let data = iterator.next();
    assert.strictEqual(data.value[0], 5);
    assert.strictEqual(data.value[1], 2);
    data = iterator.next();
    assert.strictEqual(data.value[0], 4);
    assert.strictEqual(data.value[1], mapTree.end());
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
    assert.strictEqual(mapTree.size(), 0);
    mapTree.insert(3, 2);
    mapTree.insert(4, 2);
    mapTree.insert(5, 2);
    assert.strictEqual(mapTree.size(), 3);
    mapTree.insert(3, 2);
    mapTree.insert(3, 2);
    assert.strictEqual(mapTree.size(), 3);
    mapTree.insert(4, 2);
    assert.strictEqual(mapTree.size(), 3);
    mapTree.insert(1, 2);
    assert.strictEqual(mapTree.size(), 4);
  });

  it('insert() check', () => {
    assert.strictEqual(mapTree.insert(3, 2), true);
    assert.strictEqual(mapTree.insert(4, 2), true);
    assert.strictEqual(mapTree.insert(1, 2), true);
    assert.strictEqual(mapTree.insert(3, 2), false);
    assert.strictEqual(mapTree.insert(1, 2), false);
    assert.strictEqual(mapTree.insert(5, 2), true);
  });

  it('erase() check', () => {
    assert.strictEqual(mapTree.erase(3), false);
    mapTree.insert(3, 2);
    mapTree.insert(3, 2);
    mapTree.insert(3, 2);
    assert.strictEqual(mapTree.erase(3), mapTree.end());
    assert.strictEqual(mapTree.size(), 0);
    assert.strictEqual(mapTree.erase(3), false);
  });

  it('assign() check', () => {
    assert.strictEqual(mapTree.assign(3, 'abc'), false);
    mapTree.insert(3, 4);
    assert.strictEqual(mapTree.assign(3, 'abc'), true);
    assert.strictEqual(mapTree.find(3).getValue(), 'abc');
    mapTree.erase(3);
    assert.strictEqual(mapTree.assign(3, -1), false);
  });

  it('insertOrAssign() check', () => {
    mapTree.insertOrAssign(3, 'ab');
    assert.strictEqual(mapTree.find(3).getValue(), 'ab');
    mapTree.insertOrAssign(3, 7);
    assert.strictEqual(mapTree.find(3).getValue(), 7);
  });

  it('count() check', () => {
    assert.strictEqual(mapTree.count(3), 0);
    mapTree.insert(3, 2);
    mapTree.insert(3, 2);
    assert.strictEqual(mapTree.count(3), 1);
    mapTree.insert(4, 2);
    mapTree.insert(6, 2);
    assert.strictEqual(mapTree.count(6), 1);
    mapTree.insert(1, 2);
    mapTree.insert(6, 2);
    assert.strictEqual(mapTree.count(1), 1);
    assert.strictEqual(mapTree.count(2), 0);
  });

  it('find() check', () => {
    assert.strictEqual(mapTree.find(3), mapTree.end());
    mapTree.insert(3, 2);
    mapTree.insert(3, 2);
    mapTree.insert(4, 2);
    assert.strictEqual(mapTree.find(4).getKey(), 4);
    mapTree.insert(6, 2);
    mapTree.insert(1, 2);
    mapTree.insert(6, 2);
    assert.strictEqual(mapTree.find(6).getKey(), 6);
    assert.strictEqual(mapTree.find(3).getKey(), 3);
  });

  it('lowerBound() check', () => {
    mapTree.insert(3, 2);
    mapTree.insert(7, 2);
    mapTree.insert(-3, 2);
    mapTree.insert(4, 2);
    mapTree.insert(1, 2);
    let node = mapTree.lowerBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = mapTree.lowerBound(3);
    assert.strictEqual(node.getKey(), 3);
    node = mapTree.lowerBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = mapTree.lowerBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = mapTree.lowerBound(1);
    assert.strictEqual(node.getKey(), 1);
  });

  it('upperBound() check', () => {
    mapTree.insert(3, 2);
    mapTree.insert(7, 2);
    mapTree.insert(-3, 2);
    mapTree.insert(4, 2);
    mapTree.insert(1, 2);
    let node = mapTree.upperBound(5);
    assert.strictEqual(node.getKey(), 4);
    node = mapTree.upperBound(3);
    assert.strictEqual(node.getKey(), 1);
    node = mapTree.upperBound(8);
    assert.strictEqual(node.getKey(), 7);
    node = mapTree.upperBound(-4);
    assert.strictEqual(node.getColor(), null);
    node = mapTree.upperBound(1);
    assert.strictEqual(node.getKey(), -3);
  });
});
