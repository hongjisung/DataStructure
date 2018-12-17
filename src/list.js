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
  size()
  empty()

  front()
  back()

  begin()
  end()

  clear()
  insert()
  erase()
  pushBack()
  pushFront()
  popBack()
  popFront()

  compare()
  splice()
  merge()
  reverse()

*/

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true }] */
class Node {
  constructor(data = null, prev = null, next = null) {
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

class List {
  constructor(data = null) {
    this._nil = new Node(null, null, null);
    this._size = 0;
    this._front = null;
    this._back = this._nil;
    if (data !== null && typeof data[Symbol.iterator] === 'function') {
      [...data].forEach(val => this.pushBack(val));
    }
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

  // Element Access
  front() {
    if (this._size === 0) {
      return false;
    }
    return this._front.getData();
  }

  back() {
    if (this._size === 0) {
      return false;
    }
    return this._back.getPrev().getData();
  }

  // iterable node
  begin() {
    return this._front;
  }

  end() {
    return this._back;
  }

  // Modifiers
  clear() {
    this._nil = new Node(null, null, null);
    this._size = 0;
    this._front = null;
    this._back = this._nil;
  }

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
    this._size += 1;
    return node;
  }

  erase(node) {
    if (!(node instanceof Node)) {
      return false;
    }
    if (this._front === node) {
      const nextnode = node.getNext();
      this.popFront();
      return nextnode;
    }
    if (this._back === node) {
      return false;
    }

    const frontnode = node.getPrev();
    const nextnode = node.getNext();
    frontnode.setNext(nextnode);
    nextnode.setPrev(frontnode);

    this._size -= 1;
    return nextnode;
  }

  pushBack(data) {
    const lastnode = this._back.getPrev();
    const node = new Node(data, lastnode, this._nil);

    if (this._size === 0) {
      this._front = node;
    } else {
      lastnode.setNext(node);
    }

    this._nil.setPrev(node);
    this._size += 1;
  }

  pushFront(data) {
    const node = new Node(data, null, this._front);

    if (this._size === 0) {
      this._front = node;
      this._nil.setPrev(node);
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

    const node = this._back.getPrev().getPrev();
    if (node === null) {
      this.clear();
      return true;
    }
    node.setNext(this._back);
    this._back.setPrev(node);
    this._size -= 1;
    return true;
  }

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
        if (itr == null) {
          same = false;
        }
      });
      if (itr !== this.end()) {
        same = false;
      }

      if (same === false) {
        return false;
      }
      
      return true;
    }
    return false;
  }

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

  merge(data, compare = (d1, d2) => d1 < d2) {
    if (data === null) {
      return false;
    }

    if (typeof data[Symbol.iterator] === 'function') {
      const newlist = new List();
      let itr = this.begin();
      [...data].forEach((val) => {
        while (compare(itr.getData(), val)) {
          newlist.pushBack(itr.getData());
          itr = itr.getNext();
          if (itr.getData() === null) {
            break;
          }
        }
        newlist.pushBack(val);
      });
      this._back = newlist.end();
      this._size = newlist.size();
      this._front = newlist.begin();
      this._back = newlist.end();
      return true;
    }
    return false;
  }

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
    this._back = newlist.end();
  }

  // javascript iterator
  [Symbol.iterator]() {
    let node = null;
    const start = this.begin();
    const end = this.end();
    const iterator = {
      next() {
        if (node === null) {
          node = start;
          if (node === end) {
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
