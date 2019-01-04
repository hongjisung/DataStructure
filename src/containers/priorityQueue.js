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

/**
 * @classdesc Class representing priority queue.<br>
 * Use Array as container.
 * @version v1.0
 */
class PriorityQueue {
  /**
   * Create a prioirty queue.
   * @param {function} compare - inequality function, compare two element and return true or false.
   * @param {PriorityQueue} otherPriorityQueue - priority queue for deep copy.
   */
  constructor(compare = (n1, n2) => n1 < n2, otherPriorityQueue = null) {
    /**
     * inequality of elements
     * @member {function}
     * @private
     */
    if (typeof compare !== 'function') {
      this._compare = (n1, n2) => n1 < n2;
    } else {
      this._compare = compare;
    }
    /**
     * array of elements
     * @type {Array}
     * @private
     */
    this._elements = new Array(3);
    /**
     * the number of elements
     * @type {number}
     * @private
     */
    this._size = 0;
    /**
     * the size of array
     * @type {number}
     * @private
     */
    this._maxSize = 3;

    if (otherPriorityQueue instanceof PriorityQueue) {
      this._compare = otherPriorityQueue._compare;
      this._size = otherPriorityQueue._size;
      this._maxSize = otherPriorityQueue._maxSize;
      this._elements = new Array(this._maxSize);
      for (let i = 0; i < otherPriorityQueue._size; i += 1) {
        this._elements[i] = otherPriorityQueue._elements[i];
      }
    }
  }

  // private function
  /**
   * when array become full, doubled up array
   * @private
   */
  _sizeup() {
    const newContainer = new Array(this._maxSize * 2);
    for (let i = 0; i < this._size; i += 1) {
      newContainer[i] = this._elements[i];
    }
    this._elements = newContainer;
    this._maxSize = this._maxSize * 2;
  }

  // element access
  /**
   * Get the compare function of priority queue.
   * @return {function} compare function
   */
  compareFunction() {
    return this._compare;
  }

  /**
   * Get the top element of priority queue.
   * @return {boolean|*} false if the priority queue is empty else top element.
   */
  top() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[0];
  }

  // capacity
  /**
   * Make sure the priority queue is empty.
   * @return {boolean} let know the priority queue is empty.
   */
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  /**
   * Get the number of elements
   * @return {number} the number of elements
   */
  size() {
    return this._size;
  }

  // modifiers
  /**
   * Push new data into priority queue.
   * @param {*} data - the element of priority queue.
   */
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
  }

  /**
   * pop the top element of priority queue.
   * @returns {boolean} check well eliminated.
   */
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
