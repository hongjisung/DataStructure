const assert = require('assert');
const Queue = require('../../src/containers/queue');

/* global describe beforeEach it */
describe('Queue', () => {
  let queue = new Queue();

  beforeEach('Create the queue', () => { queue = new Queue(); });

  it('constructor() test', () => {
    queue = new Queue();
    assert.strictEqual(queue.size(), 0);
    queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.size(), 3);
    const q2 = new Queue();
    q2.push(1);
    q2.push(2);
    q2.push(3);
    assert.strictEqual(queue.compare(q2), true);
  });

  it('front() test', () => {
    assert.strictEqual(queue.front(), false);
    queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.front(), 1);
    queue.pop();
    assert.strictEqual(queue.front(), 2);
    queue.pop();
    queue.pop();
    assert.strictEqual(queue.front(), false);
  });

  it('back() test', () => {
    assert.strictEqual(queue.back(), false);
    queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.back(), 3);
    queue.pop();
    assert.strictEqual(queue.back(), 3);
    queue.pop();
    queue.pop();
    assert.strictEqual(queue.back(), false);
  });

  it('empty() test', () => {
    assert.strictEqual(queue.empty(), true);
    queue.push(3);
    assert.strictEqual(queue.empty(), false);
    queue.pop();
    assert.strictEqual(queue.empty(), true);
    queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.empty(), false);
  });

  it('size() test', () => {
    assert.strictEqual(queue.size(), 0);
    queue.push(1);
    queue.push(2);
    assert.strictEqual(queue.size(), 2);
    queue.pop();
    queue.pop();
    assert.strictEqual(queue.size(), 0);
    queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.size(), 3);
  });

  it('clear() test', () => {
    queue = new Queue([1, 2, 3, 4, 5]);
    queue.clear();
    assert.deepEqual(queue, new Queue());
  });

  it('push() test', () => {
    queue.push(1);
    assert.strictEqual(queue.front(), 1);
    assert.strictEqual(queue.back(), 1);
    queue.push(2);
    assert.strictEqual(queue.front(), 1);
    assert.strictEqual(queue.back(), 2);
    queue.pop();
    queue.push(3);
    assert.strictEqual(queue.front(), 2);
    assert.strictEqual(queue.back(), 3);
  });

  it('pop() test', () => {
    assert.strictEqual(queue.pop(), false);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.pop();
    assert.strictEqual(queue.front(), 2);
    queue.pop();
    assert.strictEqual(queue.front(), 3);
    queue.pop();
    assert.strictEqual(queue.front(), false);
    assert.strictEqual(queue.pop(), false);
  });

  it('compare() test', () => {
    queue = new Queue([1, 2, 3]);
    const q2 = new Queue([1]);
    const q3 = new Queue([1, 2, 3, 4, 5]);
    const q4 = new Queue([1, 2, 4]);
    const q5 = new Queue([4, 1, 2, 3]);
    q5.pop();
    assert.strictEqual(queue.compare(q2), false);
    assert.strictEqual(queue.compare(q3), false);
    assert.strictEqual(queue.compare(q4), false);
    assert.strictEqual(queue.compare(q5), true);
  });

  it('iterate check', () => {
    queue = new Queue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let i = 1;
    while (!queue.empty()) {
      assert.strictEqual(queue.front(), i);
      queue.pop();
      i += 1;
    }
  });


  it('iterate2 check', () => {
    queue = new Queue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    queue.pop();
    queue.pop();
    queue.pop();
    queue.push(11);
    queue.push(12);
    queue.push(13);
    queue.push(14);
    let i = 4;
    while (!queue.empty()) {
      assert.strictEqual(queue.front(), i);
      queue.pop();
      i += 1;
    }
  });

  it('copy() test', () => {
    queue = new Queue([1, 2, 3, 4, 5]);
    const q2 = queue.copy();
    q2.push(6);
    q2.push(7);
    q2.push(8);
    assert.strictEqual(q2.size(), 8);
    assert.strictEqual(queue.size(), 5);
    q2.pop();
    assert.strictEqual(q2.front(), 2);
    assert.strictEqual(q2.back(), 8);
    assert.strictEqual(queue.front(), 1);
    assert.strictEqual(queue.back(), 5);
  });
});
