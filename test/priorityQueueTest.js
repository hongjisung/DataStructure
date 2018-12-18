const assert = require('assert');
const PriorityQueue = require('../src/priorityQueue');

/* global describe beforeEach it */
describe('Priority Queue', () => {
  let priorityQueue;

  beforeEach('Create priority queue', () => { priorityQueue = new PriorityQueue(); });

  it('constructor() check', () => {
    // check basic compare function
    priorityQueue = new PriorityQueue();
    assert.strictEqual(priorityQueue.size(), 0);
    priorityQueue.push(3);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.top(), 5);
    priorityQueue.push(2);
    assert.strictEqual(priorityQueue.top(), 5);

    // check compare function
    priorityQueue = new PriorityQueue((n1, n2) => n1 > n2);
    priorityQueue.push(3);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.top(), 3);
    priorityQueue.push(2);
    assert.strictEqual(priorityQueue.top(), 2);
  });

  it('compareFunction() check', () => {
    let cmpfunc = priorityQueue.compareFunction();
    assert.strictEqual(cmpfunc(1, 3), true);
    assert.strictEqual(cmpfunc(5, 3), false);
    assert.strictEqual(cmpfunc(-5, 3), true);

    priorityQueue = new PriorityQueue((n1, n2) => n1 > n2);
    cmpfunc = priorityQueue.compareFunction();
    assert.strictEqual(cmpfunc(1, 3), false);
    assert.strictEqual(cmpfunc(5, 3), true);
    assert.strictEqual(cmpfunc(-5, 3), false);
  });

  it('top() check', () => {
    assert.strictEqual(priorityQueue.top(), false);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.top(), 5);
    priorityQueue.push(3);
    assert.strictEqual(priorityQueue.top(), 5);
    priorityQueue.push(7);
    assert.strictEqual(priorityQueue.top(), 7);
    priorityQueue.push(4);
    assert.strictEqual(priorityQueue.top(), 7);
    priorityQueue.push(15);
    assert.strictEqual(priorityQueue.top(), 15);
    priorityQueue.push(-10);
    assert.strictEqual(priorityQueue.top(), 15);
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.top(), 7);
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.top(), 5);
  });

  it('empty() check', () => {
    assert.strictEqual(priorityQueue.empty(), true);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.empty(), false);
    priorityQueue.push(4);
    priorityQueue.push(7);
    priorityQueue.pop();
    priorityQueue.pop();
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.empty(), true);
  });

  it('size() check', () => {
    assert.strictEqual(priorityQueue.size(), 0);
    priorityQueue.push(5);
    priorityQueue.push(5);
    priorityQueue.push(5);
    priorityQueue.push(5);
    priorityQueue.push(5);
    priorityQueue.push(5);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.size(), 7);
    priorityQueue.pop();
    priorityQueue.pop();
    priorityQueue.pop();
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.size(), 3);
    priorityQueue.pop();
    priorityQueue.pop();
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.size(), 0);
  });

  it('push() check', () => {
    priorityQueue.push(3);
    assert.strictEqual(priorityQueue.size(), 1);
    assert.strictEqual(priorityQueue.top(), 3);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.size(), 2);
    assert.strictEqual(priorityQueue.top(), 5);
    priorityQueue.push(5);
    assert.strictEqual(priorityQueue.size(), 3);
    assert.strictEqual(priorityQueue.top(), 5);
    priorityQueue.push(1);
    assert.strictEqual(priorityQueue.size(), 4);
    assert.strictEqual(priorityQueue.top(), 5);
  });

  it('pop() check', () => {
    assert.strictEqual(priorityQueue.pop(), false);
    priorityQueue.push(3);
    priorityQueue.push(3);
    priorityQueue.push(3);
    priorityQueue.push(3);
    assert.strictEqual(priorityQueue.pop(), true);
    priorityQueue.pop();
    priorityQueue.pop();
    assert.strictEqual(priorityQueue.pop(), true);
    assert.strictEqual(priorityQueue.pop(), false);
  });

  it('general test', () => {
    const arr = [1, 5, 7, 6, 9, 3, 2, 8, 4];
    const decreasing = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const increasing = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.forEach(val => priorityQueue.push(val));
    let idx = 0;
    while (!priorityQueue.empty()) {
      assert.strictEqual(priorityQueue.top(), decreasing[idx]);
      priorityQueue.pop();
      idx += 1;
    }

    priorityQueue = new PriorityQueue((n1, n2) => n1 > n2);
    arr.forEach(val => priorityQueue.push(val));
    idx = 0;
    while (!priorityQueue.empty()) {
      assert.strictEqual(priorityQueue.top(), increasing[idx]);
      priorityQueue.pop();
      idx += 1;
    }
  });

  it('large data test', () => {
    const increasing = [];
    const decreasing = [];
    for (let i = 1; i <= 1000000; i += 1) {
      increasing.push(i);
      decreasing.push(1000001 - i);
    }

    increasing.forEach(val => priorityQueue.push(val));
    let idx = 0;
    while (!priorityQueue.empty()) {
      assert.strictEqual(priorityQueue.top(), decreasing[idx]);
      priorityQueue.pop();
      idx += 1;
    }
  });
});
