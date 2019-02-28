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
  clear
  push
  pop

  // operation
  compare

  //
  toString
  copy
*/

/**
 * @classdesc Class representing a Stack.
 * @version v1.0
 */
class Stack {
  /**
   * Create a stack.
   * @param {null|Object} data - The data is iterable object.
   */
  constructor(data = null) {
    /**
     * container of element
     * @type {Array}
     * @private
     */
    this._elements = [];
    /**
     * the number of elements
     * @type {number}
     * @private
     */
    this._size = 0;

    if (data instanceof Stack) {
      data._elements.forEach(val => this.push(val));
    }

    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.push(val));
    }
  }

  // element access
  /**
   * Get the top data.
   * @returns {boolean|*} false if the stack has no element else top element.
   */
  top() {
    if (this._size === 0) {
      return false;
    }
    return this._elements[this._size - 1];
  }

  // capacity
  /**
   * Check the stack is empty.
   * @returns {boolean} true if the stack is empty.
   */
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  /**
   * Get the number of elements in stack.
   * @returns {number} the number of elements.
   */
  size() {
    return this._size;
  }

  // modifiers
  /**
   * Initialize Stack
   */
  clear() {
    this._elements = [];
    this._size = 0;
  }

  /**
   * Push a data in stack.
   * @param {*} data - The data pushed to stack.
   */
  push(data) {
    this._elements.push(data);
    this._size += 1;
  }

  /**
   * pop the top elements
   * @return {boolean} false if the stack is empty.
   */
  pop() {
    if (this._size === 0) {
      return false;
    }
    this._elements.pop();
    this._size -= 1;
    return true;
  }

  // operations
  /**
   * compare with other stack
   * @param {Object} otherStack - Stack object to compare.
   * @return {boolean} true if they are same.
   */
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

  /**
   * show information of object
   * @returns {string}
   */
  toString() {
    let str = `Object Name: Stack
Size: `.concat(this.size().toString()).concat(`
Elements: `);
    for (let i = 0; i < this._size; i += 1) {
      str = str.concat(`
  Sequence[`).concat(i).concat(']: ').concat(this._elements[this._size - 1 - i].toString());
    }
    return str;
  }

  /**
   * return a copy of this object.
   * @returns {Stack}
   */
  copy() {
    return new Stack(this);
  }
}

module.exports = Stack;
