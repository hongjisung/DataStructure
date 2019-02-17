/*
Extends queue and add necessary methods

class:
  deque
Extends:
  queue
method:
  // super
    ///private
    _sizeup

    ///public
    front
    back
    empty
    size
    clear

  // modifier
  pushBack
  pushFront
  popBack
  PopFront

  // overriding
  push -> private
  pop -> private
  compare

  //
  toString
*/

const Queue = require('./queue');

/**
 * @classdesc Class representing deque.<br>
 * deque is implemented extends queue.<br>
 * add additional method.<br>
 * pop and push method of queue is assumed as private.<br>
 * this constructor can get Queue type object.
 * @version v1.0
 */
class Deque extends Queue {
  /**
   * Get the first element of deque.
   * @returns {boolen} the first data of deque.
   */
  front() {
    return super.front();
  }


  /**
   * Get the last element of deque.
   * @return {*} - the last element of deque.
   */
  back() {
    return super.back();
  }

  /**
   * Make sure the deque is empty.
   * @return {boolean} true if deque is empty.
   */
  empty() {
    return super.empty();
  }

  /**
   * Get the number of element in deque.
   * @return {number} the number of elements.
   */
  size() {
    return super.size();
  }

  /**
   * Initalize the deque
   */
  clear() {
    super.clear();
  }

  /**
   * add data to back of deque.
   * @param {*} data - the data of deque.
   */
  pushBack(data) {
    this.push(data);
  }

  /**
   * add data to front of deque.
   * @param {*} data - the data of deque.
   */
  pushFront(data) {
    if (this._size === 0) {
      this._elements[0] = data;
      this._size = 1;
      this._begin = 0;
      this._end = 0;
    } else {
      if (this._size === this._maxSize) {
        this._sizeup();
      }
      this._begin = (this._begin - 1) % this._maxSize;
      this._elements[this._begin] = data;
      this._size += 1;
    }
  }

  /**
   * remove the last data of deque.
   * @returns {boolean} if deque is empty, return false.
   */
  popBack() {
    if (this._size === 0) {
      return false;
    }
    if (this._size === 1) {
      this.clear();
      return true;
    }

    this._end = (this._end - 1) % this._maxSize;
    this._size -= 1;
    return true;
  }

  /**
   * remove the first data of deque.
   * @returns {boolean} if deque is empty, return false.
   */
  popFront() {
    return this.pop();
  }

  /**
   * do not use in deque.
   * @private
   */
  pop() {
    return super.pop();
  }

  /**
   * do not use in deque.
   * @private
   */
  push(data) {
    super.push(data);
  }

  /**
   * compare data of this and param in order.
   * @param {Deque} otherDeque - Deque object.
   * @returns {boolean} Make sure this and param are same.
   */
  compare(otherDeque) {
    if (!(otherDeque instanceof Deque)) {
      return false;
    }
    if (this._size !== otherDeque.size()) {
      return false;
    }
    let i = this._begin;
    for (;i !== this._end; i = (i + 1) % this._maxSize) {
      if (this._elements[i] !== otherDeque.front()) {
        return false;
      }
      otherDeque.popFront();
    }
    if (this._elements[i] !== otherDeque.front()) {
      return false;
    }
    return true;
  }

  /**
   * show information of object
   * @returns {string}
   */
  toString() {
    let str = `Object Name: Deque
Size: `.concat(this.size().toString()).concat(`
Elements: `);
    let i = this._begin;
    for (; i !== this._end; i = (i + 1) % this._maxSize) {
      str = str.concat(`
  Sequence[`).concat(i).concat(']: ').concat(this._elements[i].toString());
    }
    str = str.concat(`
  Sequence[`).concat(i).concat(']: ').concat(this._elements[i].toString());
    return str;
  }
}

module.exports = Deque;
