const assert = require('assert');
const List = require('../src/list');

/* eslint prefer-arrow-callback: 2 */
/* global describe before beforeEach it */
describe('List', () => {
  let list;

  before('Create the list', () => {
    list = new List();
  });

  beforeEach('clear list', () => { list = new List(); });

  it('constructor check', () => {
    list = new List();
    assert.strictEqual(list.size(), 0);
    assert.strictEqual(list.compare([]), true);

    list = new List([1, 2, 3]);
    assert.strictEqual(list.size(), 3);
    assert.strictEqual(list.compare([1, 2, 3]), true);
    assert.strictEqual(list.compare([1, 3, 2]), false);
  });

  it('size() check', () => {
    assert.equal(list.size(), 0);
    list.pushBack(3);
    list.pushBack(3);
    list.pushBack(3);
    assert.equal(list.size(), 3);
    list.popBack();
    list.popBack();
    list.popBack();
    assert.equal(list.size(), 0);
  });

  it('empty() check', () => {
    assert.equal(list.empty(), true);
    list.pushBack(3);
    assert.equal(list.empty(), false);
    list.popBack();
    assert.equal(list.empty(), true);
  });

  it('front() check', () => {
    list.pushBack(3);
    assert.strictEqual(list.front(), 3);
    list.pushFront(4);
    assert.strictEqual(list.front(), 4);
    list.pushBack(5);
    assert.strictEqual(list.front(), 4);
  });

  it('back() check', () => {
    list.pushFront(3);
    assert.strictEqual(list.back(), 3);
    list.pushBack(4);
    assert.strictEqual(list.back(), 4);
    list.pushFront(5);
    assert.strictEqual(list.back(), 4);
  });

  it('begin() check', () => {
    assert.strictEqual(list.begin(), null);
    list.pushBack(3);
    assert.strictEqual(list.begin().getData(), 3);
    list.pushFront(4);
    assert.strictEqual(list.begin().getData(), 4);
    list.pushBack(5);
    assert.strictEqual(list.begin().getData(), 4);
  });

  it('end() check', () => {
    list.pushFront(3);
    assert.strictEqual(list.end().getPrev().getData(), 3);
    list.pushBack(4);
    assert.strictEqual(list.end().getPrev().getData(), 4);
    list.pushFront(5);
    assert.strictEqual(list.end().getPrev().getData(), 4);
  });

  it('clear() check', () => {
    list.pushFront(3);
    list.pushFront(5);
    list.pushFront(7);
    list.clear();
    assert.deepEqual(list, new List());
  });

  it('insert() check', () => {
    list.pushBack(3);
    list.pushBack(5);
    list.pushBack(7);

    let itr = list.begin();
    itr = itr.getNext();
    assert.notStrictEqual(list.insert(itr, 4), false);
    assert.strictEqual(itr.getData(), 5);

    itr = list.begin();
    assert.notStrictEqual(list.insert(itr, 2), false);
    assert.strictEqual(itr.getData(), 3);

    const iterator = list[Symbol.iterator]();
    let value = iterator.next();
    assert.strictEqual(value.value, 2);
    value = iterator.next();
    assert.strictEqual(value.value, 3);
    value = iterator.next();
    assert.strictEqual(value.value, 4);
    value = iterator.next();
    assert.strictEqual(value.value, 5);
    value = iterator.next();
    assert.strictEqual(value.value, 7);
  });

  it('erase() check', () => {
    list.pushBack(3);
    list.pushBack(5);
    list.pushBack(7);

    let itr = list.begin();
    itr = list.erase(itr);
    assert.notStrictEqual(itr, false);
    assert.strictEqual(itr.getData(), 5);

    itr = list.end();
    itr = itr.getPrev();
    itr = list.erase(itr);
    assert.notStrictEqual(itr, false);
    assert.strictEqual(itr, list.end());
    assert.strictEqual(list.size(), 1);

    itr = list.begin();
    itr = list.erase(itr);
    assert.notStrictEqual(itr, false);
    assert.deepEqual(list, new List());

    itr = list.begin();
    itr = list.erase(itr);
    assert.strictEqual(itr, false);
  });

  it('pushBack() check', () => {
    list.pushBack(3);
    list.pushBack(5);
    list.pushBack(7);
    assert.equal(list.size(), 3);

    const iterator = list[Symbol.iterator]();
    let pos = iterator.next();
    assert.equal(pos.value, 3);
    pos = iterator.next();
    assert.equal(pos.value, 5);
    pos = iterator.next();
    assert.equal(pos.value, 7);
  });

  it('pushFront() check', () => {
    list.pushFront(3);
    list.pushFront(5);
    list.pushFront(7);
    assert.equal(list.size(), 3);

    const iterator = list[Symbol.iterator]();
    let pos = iterator.next();
    assert.strictEqual(pos.value, 7);
    pos = iterator.next();
    assert.strictEqual(pos.value, 5);
    pos = iterator.next();
    assert.strictEqual(pos.value, 3);
  });

  it('popBack() check', () => {
    assert.strictEqual(list.popBack(), false);
    list.pushBack(3);
    list.pushBack(5);
    list.popBack();
    assert.strictEqual(list.size(), 1);
    assert.strictEqual(list.back(), 3);
    list.popBack();
    assert.deepEqual(list, new List());
  });

  it('popFront() check', () => {
    assert.strictEqual(list.popFront(), false);
    list.pushBack(3);
    list.pushBack(5);
    list.popFront();
    assert.strictEqual(list.size(), 1);
    assert.strictEqual(list.front(), 5);
    list.popFront();
    assert.deepEqual(list, new List());
  });

  it('compare() check', () => {
    list = new List([1, 3, 5]);
    const l2 = new List([1, 3, 5]);
    const l3 = new List([2, 3, 5]);
    const l4 = new List([1, 3, 6]);
    const l5 = new List([1, 3]);
    const l6 = new List([1, 3, 5, 7]);
    const l7 = [1, 3, 5, 7];
    assert.strictEqual(list.compare(l2), true);
    assert.strictEqual(list.compare(l3), false);
    assert.strictEqual(list.compare(l4), false);
    assert.strictEqual(list.compare(l5), false);
    assert.strictEqual(list.compare(l6), false);
    assert.strictEqual(list.compare(l7), false);
  });

  it('splice() check', () => {
    list = new List([1, 3, 5]);
    const list2 = new List([6, 7, 8]);
    list.splice(list.end(), list2);

    const cmp = [1, 3, 5, 6, 7, 8];
    assert.strictEqual(list.compare(cmp), true);
  });

  it('merge() check', () => {
    list = new List([1, 3, 5]);
    const list2 = new List([2, 4, 6]);
    list.merge(list2);

    const cmp = [1, 2, 3, 4, 5, 6];
    assert.strictEqual(list.compare(cmp), true);
  });

  it('reverse() check', () => {
    list = new List([1, 3, 5, 7, 9]);
    list.reverse();
    assert.strictEqual(list.compare([9, 7, 5, 3, 1]), true);
  });
});
