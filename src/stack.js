/*
class:
  Stack

method:
  // element access
  top

  // capacity
  empty
  size


  // modifiers
  push
  pop

  // operation
  compare
*/

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true }] */
class Stack {
  constructor(data = null) {
    this._elements = [];
    this._size = 0;

    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.push(val));
    }
  }

  // element access
  top() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._size - 1];
  }

  // capacity
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  size() {
    return this._size;
  }

  // modifiers
  push(data) {
    this._elements.push(data);
    this._size += 1;
  }

  pop() {
    if (this._size === 0) {
      return false;
    }
    this._elements.pop();
    this._size -= 1;
    return true;
  }

  // operations
  compare(otherStack) {
    if (!(otherStack instanceof Stack)) {
      return false;
    }
    if (this._size !== otherStack.size()) {
      return false;
    }
    for (let i = this._size - 1; i > 0; i -= 1) {
      if (this._elements[i] !== otherStack.top()) {
        return false;
      }
      otherStack.pop();
    }
    return true;
  }
}

module.exports = Stack;


