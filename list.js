/*
javascript constructure 1개

class:
  Node
  List


Node:
  data
  prev
  next

List:
  size()
  empty()

  begin()
  end()

  front()
  back()

  clear()
  insert()
  erase()
  push_back()
  push_front()
  pop_back()
  pop_front()

  merge()
  splice()
  reverse()

*/

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true }] */
const Iterator = require('./iterator');

class Node {
  constructor(data = '', prev = '', next = '') {
    this._data = data;
    this._prev = prev;
    this._next = next;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }

  getPrev() {
    return this._prev;
  }

  setPrev(prev) {
    this._prev = prev;
  }

  getNext() {
    return this._next;
  }

  setNext(next) {
    this._next = next;
  }
}

class List extends Iterator {
  constructor() {
    super();
    this._size = 0;
    this._front = '';
    this._back = '';
  }

  // Capacity
  size() {
    return this._size;
  }

  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  // c++ iterators
  begin() {}

  end() {}

  // Element Access
  front() {
    return this._front;
  }

  back() {
    return this._back;
  }

  // Modifiers
  clear() {
    this._size = 0;
    this._front = '';
    this._back = '';
  }

  insert() {}

  erase() {}

  pushBack(data) {
    const node = new Node(data, this._back, '');

    if (this._size === 0) {
      this._front = node;
      this._back = node;
    } else {
      this._back.setNext(node);
      this._back = node;
    }

    this._size += 1;
  }

  pushFront(data) {
    const node = new Node(data, '', this._front);

    if (this._size === 0) {
      this._front = node;
      this._back = node;
    } else {
      this._front.setPrev(node);
      this._front = node;
    }

    this._size += 1;
  }

  popBack() {
    if (this._size === 0) {
      return false;
    }

    const node = this._back.getPrev();
    if (node === '') {
      this.clear();
      return true;
    }
    node.setNext('');
    this._back = node;
    this._size -= 1;
    return true;
  }

  popFront() {
    if (this._size === 0) {
      return false;
    }

    const node = this._front.getNext();
    if (node === '') {
      this.clear();
      return true;
    }
    node.setPrev('');
    this._front = node;
    this._size -= 1;
    return true;
  }


  // javascript iterator
  [Symbol.iterator]() {
    let node = '';
    const start = this._front;
    const iterator = {
      next() {
        if (node === '') {
          node = start;
          if (node === '') {
            return { value: undefined, done: true };
          }
          return { value: node.getData(), done: false };
        }

        node = node.getNext();
        if (node === '') {
          return { value: undefined, done: true };
        }
        return { value: node.getData(), done: false };
      },
    };
    return iterator;
  }
}


module.exports = List;
