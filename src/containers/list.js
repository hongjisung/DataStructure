/*
javascript constructure 1개

issue
1. list의 마지막은 Nil로 하는 것

class:
  Node
  List


Node:
  data
  prev
  next

List:
  // capacity
  size()
  empty()

  // element access
  front()
  back()

  // iterators
  begin()
  end()

  // modifiers
  clear()
  insert()
  erase()
  pushBack()
  pushFront()
  popBack()
  popFront()

  // operations
  compare()
  splice()
  sort()
  merge()
  reverse()

*/

/**
 * @classdesc Express list element.<br>
 * Point front and back Node object.
 * @protected
 */
class Node {
  /**
   * Create node of list.
   * @constructor
   * @protected
   * @param {*} data - the data of node. 
   * @param {*} prev - point the front node of this node.
   * @param {*} next - point the next node of thie node.
   */
  constructor(data = null, prev = null, next = null) {
    /**
     * data variable
     * @private
     * @type {*}
     */
    this._data = data;
    /**
     * front node
     * @private
     * @type {Node}
     */
    this._prev = prev;
    /**
     * next node
     * @private
     * @type {Node}
     */
    this._next = next;
  }

  /**
   * Get the data of Node.
   * @return {*} The data of Node.
   */
  getData() {
    return this._data;
  }

  /**
   * Set the data of Node.
   * @protected
   * @param {*} data - The data of Node. 
   */
  setData(data) {
    this._data = data;
  }

  /**
   * Get the front node.
   * @return {Node} The front node.
   */
  getPrev() {
    return this._prev;
  }

  /**
   * Set the front node.
   * @protected
   * @param {Node} prev - The front node.
   */
  setPrev(prev) {
    this._prev = prev;
  }

  /**
   * Get the next node.
   * @return {Node} The Next node.
   */
  getNext() {
    return this._next;
  }

  /**
   * Set the next node.
   * @protected
   * @param {Node} next - The next node.
   */
  setNext(next) {
    this._next = next;
  }
}

/**
 * @classdesc Class representing List.<br>
 * Doubly linked list.
 * @version v1.0.
 */
class List {
  /**
   * Get null or iterable Object and make List sequentially.
   * @param {*} data - The data of Node.
   */
  constructor(data = null) {
    /**
     * Express the end of List.<br>
     * It is a virtual node.
     * @private
     * @type {Node}
     */
    this._nil = new Node(null, null, null);
    /**
     * the number of Node
     * @private
     * @type {number}
     */
    this._size = 0;
    /**
     * The first node of list.
     * @private
     * @type {Node}
     */
    this._front = null;
    /**
     * The end of list.
     * Always nil.
     * @private
     * @type {Node}
     */
    this._back = null;
    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.pushBack(val));
    }
  }

  // Capacity
  /**
   * Get the number of elements.
   * @return {number} the number of elements. 
   */
  size() {
    return this._size;
  }

  /**
   * Make sure the list is empty.
   * @return {boolean} if list is empty, true.
   */
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  // Element Access
  /**
   * Get the first element of list.
   * @return {boolean|*} false if list is empty, else return the first element.
   */
  front() {
    if (this._size === 0) {
      return false;
    }
    return this._front.getData();
  }

  /**
   * Get the last element of list.
   * @return {boolean|*} false if list is empty, else return the last element.
   */
  back() {
    if (this._size === 0) {
      return false;
    }
    return this._back.getData();
  }

  // iterable node
  /**
   * Get the first Node of list.<br>
   * Can use getNext method for next node.<br>
   * if list is empty, return null.
   * @return {Node} The first Node of list.
   */
  begin() {
    return this._front;
  }

  /**
   * Get the end of list, nil.<br>
   * For check of end.<br>
   * Or use getPrev method for before node:last node of list.
   * @return {Node} nil
   */
  end() {
    return this._nil;
  }

  // Modifiers
  /**
   * Make list empty.
   */
  clear() {
    this._nil = new Node(null, null, null);
    this._size = 0;
    this._front = null;
    this._back = null;
  }

  /**
   * Insert new data in front of given node and return present node like c++ stl.
   * @param {Node} node - In front of this node, the data is inserted.
   * @param {*} data - The data to insert list.
   * @returns {boolean|Node} - If node is not Node object, return false, else return this node.
   */
  insert(node, data) {
    if (!(node instanceof Node)) {
      return false;
    }

    const newnode = new Node(data);
    newnode.setPrev(node.getPrev());
    newnode.setNext(node);

    if (this._front === node) {
      this._front = newnode;
    }

    const prevnode = node.getPrev();
    if (prevnode !== null) {
      prevnode.setNext(newnode);
    }
    node.setPrev(newnode);
    // set this._back
    if (node === this._nil) {
      this._back = newnode;
    }
    this._size += 1;
    return node;
  }

  /**
   * Erase this node and return the next node.
   * @param {*} node - The node which is removed from list.
   * @returns {boolean|Node} - If node is not Node object, return false, else return the next node.
   */
  erase(node) {
    if (!(node instanceof Node)) {
      return false;
    }
    if (this._front === node) {
      const nextnode = node.getNext();
      this.popFront();
      return nextnode;
    }
    if (this._nil === node) {
      return false;
    }

    const frontnode = node.getPrev();
    const nextnode = node.getNext();
    frontnode.setNext(nextnode);
    nextnode.setPrev(frontnode);

    // set this._back
    if (nextnode === this._nil) {
      this._back = frontnode;
    }

    this._size -= 1;
    return nextnode;
  }

  /**
   * The data is added to end of list.
   * @param {*} data - the data of list.
   */
  pushBack(data) {
    const lastnode = this._back;
    const node = new Node(data, lastnode, this._nil);

    if (this._size === 0) {
      this._front = node;
    } else {
      lastnode.setNext(node);
    }

    this._nil.setPrev(node);
    this._back = node;
    this._size += 1;
  }

  /**
   * The data is added to front of list.
   * @param {*} data - the data of list.
   */
  pushFront(data) {
    const node = new Node(data, null, this._front);

    if (this._size === 0) {
      this._front = node;
      this._nil.setPrev(node);
      this._back = node;
    } else {
      this._front.setPrev(node);
      this._front = node;
    }

    this._size += 1;
  }

  /**
   * The data is removed from end of list.
   * @returns {boolean} false it the list is empty.
   */
  popBack() {
    if (this._size === 0) {
      return false;
    }

    const node = this._back.getPrev();
    if (node === null) {
      this.clear();
      return true;
    }
    node.setNext(this._nil);
    this._nil.setPrev(node);
    this._back = node;
    this._size -= 1;
    return true;
  }

  /**
   * The data is removed from front of list.
   * @returns {boolean} false it the list is empty.
   */
  popFront() {
    if (this._size === 0) {
      return false;
    }

    const node = this._front.getNext();
    if (node === this._nil) {
      this.clear();
      return true;
    }
    node.setPrev(null);
    this._front = node;
    this._size -= 1;
    return true;
  }

  // Operations
  /**
   * Compare iterable object with this list.
   * @param {Object} data - iterable object.
   * @returns {boolean} - true if the data and index is same in list and iterable object.
   */
  compare(data) {
    if (data === null) {
      return false;
    }

    if (typeof data[Symbol.iterator] === 'function') {
      let itr = this.begin();
      let same = true;
      [...data].forEach((val) => {
        if (itr !== null && itr.getData() !== val) {
          same = false;
        }
        if (itr !== null) {
          itr = itr.getNext();
        }
        if (itr === null) {
          same = false;
        }
      });
      if (this.size() !== 0 && itr !== this.end()) {
        same = false;
      }

      if (same === false) {
        return false;
      }

      return true;
    }
    return false;
  }

  /**
   * Insert elements of iterable object in list where the front of given node.
   * @param {Node} node - Elements of data are inserted in front of this node.
   * @param {Object} data - iterable object
   * @returns {boolean} If elements are well inserted, return true.
   */
  splice(node, data) {
    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach((val) => {
        if (val !== null) {
          this.insert(node, val);
        }
      });
      return true;
    }
    return false;
  }

  /**
   * sort the list by compare function.
   * Basically quick sort, but can choose merge sort.
   * @param {function} comp - compare function 
   */
  sort(comp = (n1, n2) => n1 < n2, sorting = 'quicksort') {
    let sort = null;
    if (sorting === 'quicksort') {
      sort = require('../algorithms/quickSort');
    }
    if (sorting === 'mergesort') {
      sort = require('../algorithms/mergeSort');
    }
    const arr = sort(this, comp);
    this.clear();
    arr.forEach((val) => { this.pushBack(val); });
  }

  /**
   * Merge this list and data(iterable object) by sequential order.<br>
   * @param {Object} data - sortable iterable object.
   * @param {function} compare - inequality function.
   * @return {boolean} check well merged.
   */
  merge(data, compare = (d1, d2) => d1 < d2) {
    if (data === null) {
      return false;
    }

    if (typeof data[Symbol.iterator] === 'function') {
      // sort this list
      this.sort(compare);
      // sort the data
      const mergesort = require('../algorithms/mergeSort');
      const sorteddata = mergesort(data, compare);

      const newlist = new List();
      let itr = this.begin();
      sorteddata.forEach((val) => {
        while (itr.getData() !== null && compare(val, itr.getData())) {
          newlist.pushBack(itr.getData());
          itr = itr.getNext();
          if (itr.getData() === null) {
            break;
          }
        }
        newlist.pushBack(val);
      });
      while (itr.getData() !== null) {
        newlist.pushBack(itr.getData());
        itr = itr.getNext();
      }
      this._nil = newlist.end();
      this._size = newlist.size();
      this._front = newlist.begin();
      this._back = newlist.end().getPrev();
      return true;
    }
    return false;
  }

  /**
   * Reverse the list.
   */
  reverse() {
    const newlist = new List();
    let len = this.size();
    while (len !== 0) {
      newlist.pushBack(this.back());
      this.popBack();
      len -= 1;
    }
    this._nil = newlist.end();
    this._size = newlist.size();
    this._front = newlist.begin();
    this._back = newlist.end().getPrev();
  }

  // javascript iterator
  /**
   * Iterator of this list.
   * return the value of Nodes.
   * @returns {Object} {value, done}
   */
  [Symbol.iterator]() {
    let node = null;
    const start = this.begin();
    const end = this.end();
    const iterator = {
      next() {
        if (node === null) {
          node = start;
          if (node === null) {
            return { value: undefined, done: true };
          }
          return { value: node.getData(), done: false };
        }

        node = node.getNext();
        if (node === end) {
          return { value: undefined, done: true };
        }
        return { value: node.getData(), done: false };
      },
    };
    return iterator;
  }
}


module.exports = List;
