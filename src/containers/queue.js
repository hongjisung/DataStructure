/*
issue
# circular queue

class
  Queue

method
  // private method
  _sizeup

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

/**
 * @classdesc Class representing queue.<br>
 * Circular queue.<br>
 * Use array as container.
 * @version v1.0
 */
class Queue {
  /**
   * Get none or iterable object and make queue.
   * Can get Deque type object also.
   * @constructor
   * @param {null|Object} data - Iterable object
   */
  constructor(data = null) {
    /**
     * container of elements.
     * @type {Array}
     * @private
     */
    this._elements = new Array(2);
    /**
     * the number of elements.
     * @type {number}
     * @private
     */
    this._size = 0;
    /**
     * the size of Array.
     * @type {number}
     * @private
     */
    this._maxSize = 2;
    /**
     * the index of first element.
     * null if queue is empty.
     * @type {null|number}
     * @private
     */
    this._begin = null;
    /**
     * the index of last element.
     * null if queue is empty.
     * @type {null|number}
     * @private
     */
    this._end = null;

    // for deep copy, get Queue as data
    if (data instanceof Queue) {
      let i = data._begin;
      for (; i !== data._end; i = (i + 1) % data._maxSize) {
        this.push(data._elements[i]);
      }
      this.push(data._elements[i]);
    }

    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.push(val));
    }
  }

  // private method
  /**
   * When the container is full, doubled up the container.
   * @private
   */
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
  /**
   * Get the first element of queue.
   * @return {false|*} - the first element of queue. if queue is empty, return false.
   */
  front() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._begin];
  }

  /**
   * Get the last element of queue.
   * @return {*} - the last element of queue.
   */
  back() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._end];
  }

  // capacity
  /**
   * Make sure the queue is empty.
   * @return {boolean} true if queue is empty.
   */
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  /**
   * Get the number of element in queue.
   * @return {number} the number of elements.
   */
  size() {
    return this._size;
  }

  // modifiers
  /**
   * Initalize the queue
   */
  clear() {
    this._elements = new Array(2);
    this._size = 0;
    this._maxSize = 2;
    this._begin = null;
    this._end = null;
  }

  /**
   * Insert new data to queue.
   * @param {*} data - the element of queue.
   */
  push(data) {
    if (this._size === 0) {
      this._elements[0] = data;
      this._begin = 0;
      this._end = 0;
      this._size += 1;
    } else {
      if (this._size === this._maxSize) {
        this._sizeup();
      }
      this._end = (this._end + 1) % this._maxSize;
      this._elements[this._end] = data;
      this._size += 1;
    }
  }

  /**
   * remove a data of queue.
   * @return {boolean} If queue is empty, return false.
   */
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
  /**
   * Compare with other queue
   * @param {Queue} otherQueue - Queue object.
   * @return {boolean} Make sure two queues are same.
   */
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
