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
  rbegin()
  rend()

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

  //
  toString()
*/

const Node = require('./node/listNode');

/**
 * @classdesc Class representing List.<br>
 * Doubly linked list.
 * @version v1.0.
 */
class List {
  /**
   * Get null or iterable Object and make List sequentially.
   * @param {null|object} data - The data of iteable object.
   */
  constructor(data = null) {
    /**
     * Express the back end of List.<br>
     * It is a virtual node.
     * @private
     * @type {Node}
     */
    this._nil = new Node(null, null, null);
    /**
     * Express the front end of List.<br>
     * It is a virtual node.
     * @private
     * @type {Node}
     */
    this._rnil = new Node(null, null, this._nil);
    this._nil.setPrev(this._rnil);
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
   * @return {null|Node} The first Node of list.
   */
  begin() {
    return this._front;
  }

  /**
   * Get the back end of list, nil.<br>
   * For check of end.<br>
   * Or use getPrev method for before node:last node of list.
   * @return {Node} nil
   */
  end() {
    return this._nil;
  }

  /**
   * Get the last node of list.<br>
   * Use the getPrev method for next node.<br>
   * If list is empty, return null.
   * @returns {null|Node} last node of list.
   */
  rbegin() {
    return this._back;
  }

  /**
   * Get the front end of list, rnil<br>
   * For check of the end of reverse iterator.<br>
   * Use getNext method for get first node of list.
   * @returns {Node} rnil.
   */
  rend() {
    return this._rnil;
  }

  // Modifiers
  /**
   * Make list empty.
   */
  clear() {
    this._nil = new Node(null, null, null);
    this._rnil = new Node(null, null, this._nil);
    this._nil.setPrev(this._rnil);
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

    if (node === this._rnil) {
      return false;
    }

    const newnode = new Node(data);
    newnode.setPrev(node.getPrev());
    newnode.setNext(node);

    if (this._front === node) {
      this._front = newnode;
      this._rnil.setNext(newnode);
      newnode.setPrev(this._rnil);
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
    if (this._size === 0) {
      this._front = newnode;
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
      this._front.setPrev(this._rnil);
      this._rnil.setNext(node);
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
    const node = new Node(data, this._rnil, this._front);

    if (this._size === 0) {
      this._front = node;
      this._nil.setPrev(node);
      this._back = node;
    } else {
      this._front.setPrev(node);
      this._front = node;
    }

    this._rnil.setNext(node);
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
    if (node === this._rnil) {
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
    node.setPrev(this._rnil);
    this._rnil.setNext(node);
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
   * @param {string} sorting - sort mode
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

  /**
   * show information of object
   * @returns {string}
   */
  toString() {
    let str = `Object Name: List
Size: `.concat(this.size().toString()).concat(`
Elements: `);
    [...this].map((d, i) => {
      str = str.concat(`
  Sequence[`).concat(i).concat(']: ').concat(d.toString());
      return true;
    });
    return str;
  }
}


module.exports = List;
