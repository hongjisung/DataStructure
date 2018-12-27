const assert = require('assert');
const RedBlackTree = require('../src/redBlackTree');

/* global describe it beforeEach */
describe('Red Black Tree', () => {
  let redBlackTree;

  beforeEach('Initiate set tree', () => { redBlackTree = new RedBlackTree(); });

  it('constructor check', () => {
    assert.strictEqual(redBlackTree.size(), 0);

    let cmpTree = new RedBlackTree();
    cmpTree.insert(1, 6);
    cmpTree.insert(5, 3);
    cmpTree.insert(3, 10);
    cmpTree.insert(2, 15);
    cmpTree.insert(4, 1);
    redBlackTree = new RedBlackTree(cmpTree);
    assert.strictEqual(redBlackTree.compareKey([1, 2, 3, 4, 5]), false);
    assert.strictEqual(redBlackTree.compareKey([5, 4, 3, 2, 1]), true);
    assert.strictEqual(redBlackTree.compareValue([6, 15, 10, 1, 3]), false);
    assert.strictEqual(redBlackTree.compareValue([3, 1, 10, 15, 6]), true);

    redBlackTree.clear();
    assert.strictEqual(redBlackTree.compareKey([]), true);

    cmpTree = new RedBlackTree((n1, n2) => n1 > n2);
    cmpTree.insert(1, 6);
    cmpTree.insert(5, 3);
    cmpTree.insert(3, 10);
    cmpTree.insert(2, 15);
    cmpTree.insert(4, 1);
    redBlackTree = new RedBlackTree(cmpTree);
    assert.strictEqual(redBlackTree.compareKey([1, 2, 3, 4, 5]), true);
    assert.strictEqual(redBlackTree.compareKey([5, 4, 3, 2, 1]), false);
    assert.strictEqual(redBlackTree.compareValue([6, 15, 10, 1, 3]), true);
    assert.strictEqual(redBlackTree.compareValue([3, 1, 10, 15, 6]), false);
  });

  it('begin() check', () => {
    assert.strictEqual(redBlackTree.begin(), null);
    redBlackTree.insert(3, 5);
    assert.strictEqual(redBlackTree.begin().getKey(), 3);
    assert.strictEqual(redBlackTree.begin().getValue(), 5);
    redBlackTree.insert(2, 10);
    assert.strictEqual(redBlackTree.begin().getKey(), 3);
    assert.strictEqual(redBlackTree.begin().getValue(), 5);
    redBlackTree.insert(7, 3);
    assert.strictEqual(redBlackTree.begin().getKey(), 7);
    assert.strictEqual(redBlackTree.begin().getValue(), 3);
  });

  it('end() check', () => {
    let end = redBlackTree.end();
    assert.strictEqual(end.getKey(), null);
    assert.strictEqual(end.getValue(), null);
    assert.strictEqual(end.getPrev(), redBlackTree.begin());
    assert.strictEqual(end.getNext(), null);

    redBlackTree.insert(3, 1);
    redBlackTree.insert(2, 5);
    redBlackTree.insert(5, -10);

    end = redBlackTree.end();
    assert.strictEqual(end.getKey(), null);
    assert.strictEqual(end.getValue(), null);
    assert.strictEqual(end.getPrev().getKey(), 2);
    assert.strictEqual(end.getNext(), null);
  });

  it('[Symbol.iterator] check', () => {
    redBlackTree.insert(5, 8);
    redBlackTree.insert(2, 0);
    redBlackTree.insert(1, 10);
    redBlackTree.insert(4, 3);
    redBlackTree.insert(3, 7);

    const iterator = redBlackTree[Symbol.iterator]();
    let data = iterator.next();
    assert.strictEqual(data.value, [5, 8]);
    data = iterator.next();
    assert.strictEqual(data.value, [4, 3]);
    data = iterator.next();
    assert.strictEqual(data.value, [3, 7]);
    data = iterator.next();
    assert.strictEqual(data.value, [2, 0]);
    data = iterator.next();
    assert.strictEqual(data.value, [1, 10]);
  });

  it('empty() check', () => {
    assert.strictEqual(redBlackTree.empty(), true);
    redBlackTree.insert(3, 10);
    assert.strictEqual(redBlackTree.empty(), false);
    redBlackTree.erase(3);
    assert.strictEqual(redBlackTree.empty(), true);
  });

  it('size() check', () => {
    assert.strictEqual(redBlackTree.size(), 0);
    redBlackTree.insert(3, 10);
    redBlackTree.insert(3, 7);
    redBlackTree.insert(5, 3);
    assert.strictEqual(redBlackTree.size(), 3);
    redBlackTree.erase(3);
    assert.strictEqual(redBlackTree.size(), 1);
  });

  it('clear() check', () => {
    redBlackTree.insert(1, 4);
    redBlackTree.insert(1, 3);
    redBlackTree.insert(1, 5);
    redBlackTree.insert(3, 1);
    redBlackTree.clear();
    assert.strictEqual(redBlackTree, new RedBlackTree());
  });

  it('insert() check', () => {
    redBlackTree.insert(5, 4);
    redBlackTree.insert(3, 10);
    redBlackTree.insert(7, 6);
    assert.strictEqual(redBlackTree.size(), 3);
    redBlackTree.insert(5, 7);
    assert.strictEqual(redBlackTree.size(), 4);
    assert.strictEqual(redBlackTree.begin().getValue(), 6);
  });

  it('erase() check', () => {
    redBlackTree.insert(3, 7);
    redBlackTree.insert(3, 5);
    redBlackTree.insert(3, 10);
    redBlackTree.insert(3, 10);
    assert.strictEqual(redBlackTree.size(), 4);

    let node = redBlackTree.begin();
    node = node.getNext();
    node = redBlackTree.erase(node);
    assert.strictEqual(redBlackTree.size(), 3);
    node = node.getNext();
    node = redBlackTree.erase(node);
    assert.strictEqual(redBlackTree.size(), 2);
    assert.strictEqual(node.getNext(), false);
    assert.strictEqual(node, redBlackTree.end());

    redBlackTree.erase(3);
    assert.strictEqual(redBlackTree, new RedBlackTree());
    assert.strictEqual(redBlackTree.erase(3), false);
  });

  it('count() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(3, 20);
    redBlackTree.insert(3, 10);
    redBlackTree.insert(3, 13);
    assert.strictEqual(redBlackTree.count(3), 4);
    assert.strictEqual(redBlackTree.count(2), 0);
    redBlackTree.erase(3);
    assert.strictEqual(redBlackTree.count(3), 0);
  });

  it('find() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(2, 16);
    redBlackTree.insert(7, 13);
    redBlackTree.insert(3, 12);
    redBlackTree.insert(1, 10);
    assert.strictEqual(redBlackTree.find(3).getKey(), 3);
    assert.strictEqual(redBlackTree.find(7).getValue(), 13);
    assert.strictEqual(redBlackTree.find(6), redBlackTree.end());
  });

  it('contains() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(2, 16);
    redBlackTree.insert(7, 13);
    redBlackTree.insert(3, 12);
    redBlackTree.insert(1, 10);
    assert.strictEqual(redBlackTree.contains(3), true);
    assert.strictEqual(redBlackTree.contains(1), true);
    assert.strictEqual(redBlackTree.contains(2), false);
  });

  it('equalRange() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(2, 16);
    redBlackTree.insert(7, 13);
    redBlackTree.insert(3, 12);
    redBlackTree.insert(3, 10);
    const threeRange = redBlackTree.equalRange(3);
    let cnt = 0;
    for (let itr = threeRange[0]; itr !== threeRange[1]; itr = itr.getNext()) {
      assert.strictEqual(itr.getKey(), 3);
      cnt += 1;
    }
    assert.strictEqual(cnt, 3);

    const sevenRange = redBlackTree.equalRange(7);
    cnt = 0;
    for (let itr = sevenRange[0]; itr !== sevenRange[1]; itr = itr.getNext()) {
      assert.strictEqual(itr.getKey(), 7);
      cnt += 1;
    }
    assert.strictEqual(cnt, 1);
  });

  it('lowerBound() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(2, 16);
    redBlackTree.insert(7, 13);
    redBlackTree.insert(3, 12);
    redBlackTree.insert(1, 10);
    assert.strictEqual(redBlackTree.lowerBound(1).getKey(), 1);
    assert.strictEqual(redBlackTree.lowerBound(2).getKey(), 2);
    assert.strictEqual(redBlackTree.lowerBound(3).getKey(), 3);
    assert.strictEqual(redBlackTree.lowerBound(4).getKey(), 3);
    assert.strictEqual(redBlackTree.lowerBound(7).getKey(), 7);
    assert.strictEqual(redBlackTree.lowerBound(8).getKey(), 7);
    assert.strictEqual(redBlackTree.lowerBound(0), redBlackTree.end());
  });

  it('upperBound() check', () => {
    redBlackTree.insert(3, 10);
    redBlackTree.insert(2, 16);
    redBlackTree.insert(7, 13);
    redBlackTree.insert(3, 12);
    redBlackTree.insert(1, 10);
    assert.strictEqual(redBlackTree.upperBound(1), redBlackTree.end());
    assert.strictEqual(redBlackTree.upperBound(2).getKey(), 1);
    assert.strictEqual(redBlackTree.upperBound(3).getKey(), 2);
    assert.strictEqual(redBlackTree.upperBound(4).getKey(), 3);
    assert.strictEqual(redBlackTree.upperBound(7).getKey(), 3);
    assert.strictEqual(redBlackTree.upperBound(8).getKey(), 7);
  });

  it('keyComp() check', () => {
    assert.strictEqual(redBlackTree.keyComp(), (n1, n2) => n1 < n2);
    redBlackTree = new RedBlackTree((n1, n2) => n1 > n2);
    assert.strictEqual(redBlackTree.keyComp(), (n1, n2) => n1 > n2);
  });
});
