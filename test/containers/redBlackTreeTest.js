const assert = require('assert');
const RedBlackTree = require('../../src/containers/redBlackTree');

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
    let itr = cmpTree.begin();
    assert.strictEqual(itr.getKey(), 5);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 4);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 3);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 2);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 1);

    redBlackTree.clear();

    cmpTree = new RedBlackTree((n1, n2) => n1 > n2);
    cmpTree.insert(1, 6);
    cmpTree.insert(5, 3);
    cmpTree.insert(3, 10);
    cmpTree.insert(2, 15);
    cmpTree.insert(4, 1);
    redBlackTree = new RedBlackTree(cmpTree);
    itr = cmpTree.begin();
    assert.strictEqual(itr.getKey(), 1);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 2);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 3);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 4);
    itr = itr.getNext();
    assert.strictEqual(itr.getKey(), 5);
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
    assert.strictEqual(end.getNext(), false);

    redBlackTree.insert(3, 1);
    redBlackTree.insert(2, 5);
    redBlackTree.insert(5, -10);

    end = redBlackTree.end();
    assert.strictEqual(end.getKey(), null);
    assert.strictEqual(end.getValue(), null);
    assert.strictEqual(end.getPrev().getKey(), 2);
    assert.strictEqual(end.getNext(), false);
  });

  it('[Symbol.iterator] check', () => {
    redBlackTree.insert(5, 8);
    redBlackTree.insert(2, 0);
    redBlackTree.insert(1, 10);
    redBlackTree.insert(4, 3);
    redBlackTree.insert(3, 7);

    const iterator = redBlackTree[Symbol.iterator]();
    let data = iterator.next();
    assert.deepEqual(data.value, [5, 8]);
    data = iterator.next();
    assert.deepEqual(data.value, [4, 3]);
    data = iterator.next();
    assert.deepEqual(data.value, [3, 7]);
    data = iterator.next();
    assert.deepEqual(data.value, [2, 0]);
    data = iterator.next();
    assert.deepEqual(data.value, [1, 10]);
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
    assert.strictEqual(redBlackTree.begin(), null);
    assert.strictEqual(redBlackTree.size(), 0);
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
    assert.strictEqual(redBlackTree.begin(), null);
    assert.strictEqual(redBlackTree.size(), 0);
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
    assert.strictEqual(redBlackTree.contains(7), true);
    assert.strictEqual(redBlackTree.contains(4), false);
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
    let cmpf1 = redBlackTree.keyComp();
    let cmpf2 = (n1, n2) => n1 < n2;
    assert.equal(cmpf1(1, 3), cmpf2(1, 3));
    assert.equal(cmpf1(8, 4), cmpf2(8, 4));
    assert.equal(cmpf1(0, 0), cmpf2(0, 0));

    redBlackTree = new RedBlackTree((n1, n2) => n1 > n2);
    cmpf1 = redBlackTree.keyComp();
    cmpf2 = (n1, n2) => n1 > n2;
    assert.equal(cmpf1(1, 3), cmpf2(1, 3));
    assert.equal(cmpf1(8, 4), cmpf2(8, 4));
    assert.equal(cmpf1(0, 0), cmpf2(0, 0));
  });


  // red black tree condition test
  it('Condition 1 check', () => {
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = redBlackTree.begin(); i !== redBlackTree.end(); i = i.getNext()) {
      if (i.getColor() !== 'red' && i.getColor() !== 'black') {
        assert.strictEqual(1, 0);
      }
    }
  });

  it('Condition 2 check', () => {
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    assert.strictEqual(redBlackTree._root.getColor(), 'black');
  });

  it('Condition 3 check', () => {
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = redBlackTree.begin(); i !== redBlackTree.end(); i = i.getNext()) {
      if (i.getLeftChild().getLeftChild() === null) {
        assert.strictEqual(i.getLeftChild().getColor(), 'black');
      }
      if (i.getRightChild().getLeftChild() === null) {
        assert.strictEqual(i.getRightChild().getColor(), 'black');
      }
    }
  });

  it('Condition 4 check', () => {
    const limit = 1000;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = redBlackTree.begin(); i !== redBlackTree.end(); i = i.getNext()) {
      if (i.getColor() === 'red') {
        assert.strictEqual(i.getLeftChild().getColor(), 'black');
        assert.strictEqual(i.getRightChild().getColor(), 'black');
      }
    }
  });

  it('Condition 5 check', () => {
    const limit = 1000;
    let blackcnt = null;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = redBlackTree.begin(); i !== redBlackTree.end(); i = i.getNext()) {
      if (i.getLeftChild().getLeftChild() === null) {
        let parentblackcnt = 0;
        let parent = i;
        while (parent !== null) {
          if (parent.getColor() === 'black') {
            parentblackcnt += 1;
          }
          parent = parent.getParent();
        }

        if (blackcnt === null) {
          blackcnt = parentblackcnt;
        } else {
          assert.strictEqual(blackcnt, parentblackcnt);
        }
      }
      if (i.getRightChild().getLeftChild() === null) {
        let parentblackcnt = 0;
        let parent = i;
        while (parent !== null) {
          if (parent.getColor() === 'black') {
            parentblackcnt += 1;
          }
          parent = parent.getParent();
        }

        if (blackcnt === null) {
          blackcnt = parentblackcnt;
        } else {
          assert.strictEqual(blackcnt, parentblackcnt);
        }
      }
    }
  });

  // check efficiency
  it('500000 data test', () => {
    const limit = 500000;
    for (let i = 0; i < limit; i += 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = 0; i < limit; i += 1) {
      assert.strictEqual(redBlackTree.contains(i, i), true);
    }
    for (let i = 0; i < limit; i += 1) {
      assert.notStrictEqual(redBlackTree.erase(i), false);
    }

    for (let i = limit; i >= 0; i -= 1) {
      redBlackTree.insert(i, i);
    }
    for (let i = limit; i >= 0; i -= 1) {
      assert.strictEqual(redBlackTree.contains(i, i), true);
    }
    for (let i = limit; i >= 0; i -= 1) {
      assert.notStrictEqual(redBlackTree.erase(i), false);
    }
  });

  it('Insert time check 25000', () => {
    const limit = 25000;
    for (let i = 0; i < limit; i += 1) {
      const data = Math.floor(Math.random() * limit);
      redBlackTree.insert(data, data);
    }
  });

  it('Insert time check 50000', () => {
    const limit = 50000;
    for (let i = 0; i < limit; i += 1) {
      const data = Math.floor(Math.random() * limit);
      redBlackTree.insert(data, data);
    }
  });

  it('Insert time check 100000', () => {
    const limit = 100000;
    for (let i = 0; i < limit; i += 1) {
      const data = Math.floor(Math.random() * limit);
      redBlackTree.insert(data, data);
    }
  });

  it('Insert time check 200000', () => {
    const limit = 200000;
    for (let i = 0; i < limit; i += 1) {
      const data = Math.floor(Math.random() * limit);
      redBlackTree.insert(data, data);
    }
  });

  it('Insert time check 1000000', () => {
    const limit = 1000000;
    for (let i = 0; i < limit; i += 1) {
      const data = Math.floor(Math.random() * limit);
      redBlackTree.insert(data, data);
    }
  });
});
