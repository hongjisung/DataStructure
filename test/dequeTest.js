const assert = require('assert');
const Deque = require('../src/deque');

/* global describe it beforeEach */
describe('Deque', () => {
  let deque = new Deque();

  beforeEach('Initiate deque', () => { deque = new Deque(); });

  it('constructor() test', () => {
    assert.strictEqual(deque.size(), 0);
    deque = new Deque([1, 2, 3]);
    assert.strictEqual(deque.size(), 3);
    const d2 = new Deque();
    d2.pushBack(2);
    d2.pushFront(1);
    d2.pushBack(3);
    assert.strictEqual(deque.compare(d2), true);
  });

  it('front() test', () => {
    assert.strictEqual(deque.front(), false);
    deque.pushBack(3);
    assert.strictEqual(deque.front(), 3);
    deque.pushFront(2);
    assert.strictEqual(deque.front(), 2);
    deque.pushBack(4);
    assert.strictEqual(deque.front(), 2);
  });

  it('back() test', () => {
    assert.strictEqual(deque.back(), false);
    deque.pushBack(3);
    assert.strictEqual(deque.back(), 3);
    deque.pushFront(2);
    assert.strictEqual(deque.back(), 3);
    deque.pushBack(4);
    assert.strictEqual(deque.back(), 4);
  });

  it('empty() test', () => {
    assert.strictEqual(deque.empty(), true);
    deque.pushBack(3);
    assert.strictEqual(deque.empty(), false);
    deque.popBack(3);
    assert.strictEqual(deque.empty(), true);
    deque = new Deque([1, 2, 3]);
    assert.strictEqual(deque.empty(), false);
  });

  it('size() test', () => {
    assert.strictEqual(deque.size(), 0);
    deque.pushBack(1);
    deque.pushBack(1);
    deque.pushBack(1);
    deque.pushBack(1);
    assert.strictEqual(deque.size(), 4);
    deque = new Deque([1, 2, 3, 4, 5]);
    assert.strictEqual(deque.size(), 5);
  });

  it('clear() test', () => {
    deque.clear();
    assert.strictEqual(deque.size(), 0);
    assert.strictEqual(deque.front(), false);
    assert.strictEqual(deque.back(), false);
    deque = new Deque([1, 2, 3, 4, 5]);
    deque.clear();
    assert.strictEqual(deque.size(), 0);
    assert.strictEqual(deque.front(), false);
    assert.strictEqual(deque.back(), false);
  });

  it('pushBack() test', () => {
    deque.pushBack(1);
    assert.strictEqual(deque.size(), 1);
    assert.strictEqual(deque.front(), 1);
    assert.strictEqual(deque.back(), 1);
    deque.pushBack(2);
    assert.strictEqual(deque.size(), 2);
    assert.strictEqual(deque.front(), 1);
    assert.strictEqual(deque.back(), 2);
    deque = new Deque([3, 4, 5, 6]);
    deque.pushBack(7);
    assert.strictEqual(deque.size(), 5);
    assert.strictEqual(deque.front(), 3);
    assert.strictEqual(deque.back(), 7);
  });

  it('pushFront() test', () => {
    deque.pushFront(1);
    assert.strictEqual(deque.size(), 1);
    assert.strictEqual(deque.front(), 1);
    assert.strictEqual(deque.back(), 1);
    deque.pushFront(2);
    assert.strictEqual(deque.size(), 2);
    assert.strictEqual(deque.front(), 2);
    assert.strictEqual(deque.back(), 1);
    deque = new Deque([3, 4, 5, 6]);
    deque.pushFront(7);
    assert.strictEqual(deque.size(), 5);
    assert.strictEqual(deque.front(), 7);
    assert.strictEqual(deque.back(), 6);
  });

  it('popBack() test', () => {
    assert.strictEqual(deque.popBack(), false);
    deque.pushBack(3);
    deque.pushBack(3);
    deque.pushBack(3);
    assert.strictEqual(deque.popBack(), true);
    assert.strictEqual(deque.popBack(), true);
    assert.strictEqual(deque.popBack(), true);
    assert.strictEqual(deque.popBack(), false);
    deque = new Deque([3]);
    assert.strictEqual(deque.popBack(), true);
    assert.strictEqual(deque.popBack(), false);
  });

  it('popFront() test', () => {
    assert.strictEqual(deque.popFront(), false);
    deque.pushFront(3);
    deque.pushFront(3);
    deque.pushFront(3);
    assert.strictEqual(deque.popFront(), true);
    assert.strictEqual(deque.popFront(), true);
    assert.strictEqual(deque.popFront(), true);
    assert.strictEqual(deque.popFront(), false);
    deque = new Deque([3]);
    assert.strictEqual(deque.popFront(), true);
    assert.strictEqual(deque.popFront(), false);
  });

  it('compare() test', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    const d2 = new Deque([1]);
    const d3 = new Deque([1, 2, 3]);
    const d4 = new Deque([1, 2, 3, 4, 5]);
    const d5 = new Deque([1, 2, 4]);
    assert.strictEqual(deque.compare(d2), false);
    assert.strictEqual(deque.compare(d3), true);
    assert.strictEqual(deque.compare(d4), false);
    assert.strictEqual(deque.compare(d5), false);
  });
});
