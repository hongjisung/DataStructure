/*
compare function
  basic : (n1, n2) => n1 < n2
    larger thing first come out
  input :  two parameter
  output : bool

class:
  PriorityQueue

method:
  constructor
    parameter : compare function

  // private method
  _sizeup

  // element access
  compareFunction
  top

  // capacity
  empty
  size

  // modifiers
  push
  pop
*/

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true}] */
class PriorityQueue {
  constructor(compare = (n1, n2) => n1 < n2) {
    this._compare = compare;
    this._elements = new Array(3);
    this._size = 0;
    this._maxSize = 3;
  }

  // private function
  _sizeup() {
    const newContainer = new Array(this._maxSize * 2);
    for (let i = 0; i < this._size; i += 1) {
      newContainer[i] = this._elements[i];
    }
    this._elements = newContainer;
    this._maxSize = this._maxSize * 2;
  }

  // element access
  compareFunction() {
    return this._compare;
  }

  top() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[0];
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
    if (this._size === this._maxSize) {
      this._sizeup();
    }

    // add element the end of array
    this._elements[this._size] = data;
    this._size += 1;
    let idx = this._size;

    // bottom up the element by compare function
    while (idx > 1) {
      const upidx = Math.floor(idx / 2);
      if (!this._compare(this._elements[upidx - 1], this._elements[idx - 1])) {
        break;
      }
      const temp = this._elements[upidx - 1];
      this._elements[upidx - 1] = this._elements[idx - 1];
      this._elements[idx - 1] = temp;
      idx = upidx;
    }

    return true;
  }

  pop() {
    if (this._size === 0) {
      return false;
    }
    // change front and end elements
    const temp = this._elements[0];
    this._elements[0] = this._elements[this._size - 1];
    this._elements[this._size - 1] = temp;

    // size down
    this._size -= 1;

    // top-down operation with exchanged element by compare function
    let idx = 1;
    while (idx <= this._size) {
      const leftchildidx = idx * 2;
      const rightchildidx = idx * 2 + 1;
      if (leftchildidx > this._size) {
        break;
      }

      // no rightchild or leftchild is compared good than rightchild
      if (rightchildidx > this._size
        || this._compare(this._elements[rightchildidx - 1], this._elements[leftchildidx - 1])) {
        if (!this._compare(this._elements[idx - 1], this._elements[leftchildidx - 1])) {
          break;
        }
        const ttemp = this._elements[idx - 1];
        this._elements[idx - 1] = this._elements[leftchildidx - 1];
        this._elements[leftchildidx - 1] = ttemp;
        idx = leftchildidx;
      } else {
        // rightchild is compared good than leftchild
        if (!this._compare(this._elements[idx - 1], this._elements[rightchildidx - 1])) {
          break;
        }
        const ttemp = this._elements[idx - 1];
        this._elements[idx - 1] = this._elements[rightchildidx - 1];
        this._elements[rightchildidx - 1] = ttemp;
        idx = rightchildidx;
      }
    }
    return true;
  }
}

module.exports = PriorityQueue;
