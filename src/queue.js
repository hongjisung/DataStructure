/*
issue
# circular queue

class
  Queue

method
  // element access
  front
  back
  // capacity
  empty
  size
  // modifiers
  clear
  push
  pop
  // operation
  compare
*/

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true }] */
class Queue {
  constructor(data = null) {
    this._elements = new Array(2);
    this._size = 0;
    this._maxSize = 2;
    this._begin = null;
    this._end = null;

    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.push(val));
    }
  }

  // private method
  _sizeup() {
    const newcontainer = new Array(this._maxSize * 2);
    let newidx = 0;
    for (let i = this._begin; i !== this._end; i = (i + 1) % this._maxSize) {
      newcontainer[newidx] = this._elements[i];
      newidx += 1;
    }
    newcontainer[newidx] = this._elements[this._end];
    this._elements = newcontainer;
    this._maxSize *= 2;
    this._begin = 0;
    this._end = newidx;
  }

  // element access
  front() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._begin];
  }

  back() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._end];
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
  clear() {
    this._elements = new Array(2);
    this._size = 0;
    this._maxSize = 2;
    this._begin = null;
    this._end = null;
  }

  push(data) {
    if (this._size === 0) {
      this._elements[0] = data;
      this._begin = 0;
      this._end = 0;
      this._size += 1;
      return true;
    }

    if (this._size === this._maxSize) {
      this._sizeup();
    }
    this._end = (this._end + 1) % this._maxSize;
    this._elements[this._end] = data;
    this._size += 1;
    return true;
  }

  pop() {
    if (this._size === 0) {
      return false;
    }
    if (this._size === 1) {
      this.clear();
      return true;
    }

    this._begin = (this._begin + 1) % this._maxSize;
    this._size -= 1;
    return true;
  }

  // operations
  compare(otherQueue) {
    if (!(otherQueue instanceof Queue)) {
      return false;
    }
    if (this._size !== otherQueue.size()) {
      return false;
    }
    let i = this._begin;
    for (; i !== this._end; i = (i + 1) % this._maxSize) {
      if (this._elements[i] !== otherQueue.front()) {
        return false;
      }
      otherQueue.pop();
    }
    if (this._elements[i] !== otherQueue.front()) {
      return false;
    }
    return true;
  }
}

module.exports = Queue;
