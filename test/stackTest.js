const assert = require('assert');
const Stack = require('../src/stack.js');

/* global describe beforeEach it */
describe('Stack', () => {
  let stack;

  beforeEach('Create the stack', () => { stack = new Stack(); });

  it('constructor test', () => {
    stack = new Stack();
    assert.strictEqual(stack.size(), 0);
    stack = new Stack([3, 4, 5]);
    const s2 = new Stack();
    s2.push(3);
    s2.push(4);
    s2.push(5);
    assert.strictEqual(stack.compare(s2), true);
  });

  it('top() test', () => {
    assert.strictEqual(stack.top(), false);
    stack.push(3);
    assert.strictEqual(stack.top(), 3);
    stack.pop(3);
    assert.strictEqual(stack.top(), false);
  });

  it('empty() test', () => {
    assert.strictEqual(stack.empty(), true);
    stack.push(3);
    assert.strictEqual(stack.empty(), false);
    stack.pop();
    assert.strictEqual(stack.empty(), true);
  });

  it('size() test', () => {
    assert.strictEqual(stack.size(), 0);
    stack.push(3);
    assert.strictEqual(stack.size(), 1);
    stack.push(5);
    assert.strictEqual(stack.size(), 2);
    stack.pop();
    assert.strictEqual(stack.size(), 1);
    stack.pop();
    assert.strictEqual(stack.size(), 0);
  });

  it('push() test', () => {
    stack.push(3);
    assert.strictEqual(stack.top(), 3);
    stack.push(4);
    assert.strictEqual(stack.top(), 4);
  });

  it('pop() test', () => {
    assert.strictEqual(stack.pop(), false);
    stack.push(3);
    stack.push(4);
    assert.strictEqual(stack.pop(), true);
    assert.strictEqual(stack.pop(), true);
    assert.strictEqual(stack.pop(), false);
  });

  it('compare() test', () => {
    stack.push(3);
    stack.push(4);
    stack.push(5);

    const s2 = new Stack();
    s2.push(3);
    assert.strictEqual(stack.compare(s2), false);
    s2.push(4);
    assert.strictEqual(stack.compare(s2), false);
    s2.push(5);
    assert.strictEqual(stack.compare(s2), true);
    s2.push(6);
    assert.strictEqual(stack.compare(s2), false);
    s2.pop();
    s2.pop();
    s2.push(6);
    assert.strictEqual(stack.compare(s2), false);
  });
});
