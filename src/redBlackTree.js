/*
Red Black Tree

compare function
  basic : (n1, n2) => n1 < n2
    larger key first come out
  input :  two parameter
  output : bool

class TreeNode:
  Data:
    key
    value
    color
    parent
    leftChild
    rightChild

  Method:
    getKey
    setKey
    getValue
    setValue
    getColor
    setColor
    getParent
    setParent
    getLeftChild
    setLeftChild
    getRightChild
    setRightChild
    getPrev
    getNext

class Tree:
  Method:
    // iterator
    begin
    end
    rbegin
    [Symbol.iterator]

    // Capacity
    empty
    size

    // Modifier
    clear
    insert
    erase

    // lookup
    count
    find
    contains
    equalRange
    lowerBound
    upperBound

    // Observers
    keyComp

*/


/* eslint no-use-before-define: ["error", { "variables": false }] */

/**
 * @classdesc Node of Tree.<br>
 * Use getNext and getPrev method.
 */
class TreeNode {
  /**
   * Create node of tree.
   * @constructor
   * @private
   * @param {*} key - the key of node for compare.
   * @param {*} value - the value of node for save.
   * @param {*} parent - the parent of node in tree.
   * @param {*} leftChild - the left child of node in tree.
   * @param {*} rightChild - the right child of node in tree.
   */
  constructor(key = null, value = null, color = null,
    parent = null, leftChild = null, rightChild = null) {
    /** @private */
    this._key = key;
    /** @private */
    this._value = value;
    /** @private */
    this._color = color;
    /** @private */
    this._parent = parent;
    /** @private */
    this._leftChild = leftChild;
    /** @private */
    this._rightChild = rightChild;
  }

  /**
   * Return the key of node.
   * @returns {*} - the key of node.
  */
  getKey() {
    return this._key;
  }

  /** @protected */
  setKey(key) {
    this._key = key;
  }

  /**
   * Return the value of node.
   * @returns {*} - the value of node.
  */
  getValue() {
    return this._value;
  }

  /** @protected */
  setValue(value) {
    this._value = value;
  }


  /**
   * Return the color of node.
   * @returns {*} - the color of node.
  */
  getColor() {
    return this._color;
  }

  /** @protected */
  setColor(color) {
    this._color = color;
  }

  /** @protected */
  getParent() {
    return this._parent;
  }

  /** @protected */
  setParent(node) {
    this._parent = node;
  }

  /** @protected */
  getLeftChild() {
    return this._leftChild;
  }

  /** @protected */
  setLeftChild(node) {
    this._leftChild = node;
  }

  /** @protected */
  getRightChild() {
    return this._rightChild;
  }

  /** @protected */
  setRightChild(node) {
    this._rightChild = node;
  }

  /**
   * Get prev node by the compare function.
   * @returns {TreeNode} - the prev node.
   */
  /*
  1. if this node has left child, go left subtree and return maximum node in there.
  2. if it has no left child, go parent.
  3. if it is right child of parent, return parent.
  4. if it is left child of parent, go next parent and go 3.
  5. but if it has no parent anymore, it is biggest node and return endnode.
  */
  getPrev() {
    const leftmax = findLeftMaximum(this);
    if (leftmax === this) {
      let nownode = this;
      let p = parent(this);
      while (p !== null && p.getRightChild() !== nownode) {
        nownode = p;
        p = parent(p);
      }
      if (p !== null) {
        return p;
      }
      return endnode;
    }
    return leftmax;
  }

  /**
   * Get next node by the compare function.
   * @returns {TreeNode} - the next node.
   */
  /*
  1. if this node has right child, go right subtree and return minimum node in there.
  2. if it has no right child, go parent.
  3. if it is left child of parent, return parent.
  4. if it is right child of parent, go next parent and go 3.
  5. but if it has no parent anymore, it is biggest node and return endnode.
  */
  getNext() {
    if (this === endnode) {
      return false;
    }
    const rightmin = findRightMinimum(this);
    if (rightmin === this) {
      let nownode = this;
      let p = parent(this);
      while (p !== null && p.getLeftChild() !== nownode) {
        nownode = p;
        p = parent(p);
      }
      if (p !== null) {
        return p;
      }
      return endnode;
    }
    return rightmin;
  }
}


// private variables
const endnode = new TreeNode();

const parent = (node) => {
  if (!(node instanceof TreeNode)) {
    return null;
  }
  return node.getParent();
};

const grandparent = (node) => {
  const p = parent(node);
  if (p === null) {
    return null;
  }
  return parent(p);
};

const sibling = (node) => {
  const p = parent(node);
  if (p === null) {
    return null;
  }
  if (p.getLeftChild() === node) {
    return p.getRightChild();
  }
  return p.getLeftChild();
};

const uncle = (node) => {
  const p = parent(node);
  const g = grandparent(node);
  if (g == null) {
    return null;
  }
  return sibling(p);
};

const rotateLeft = (node) => {
  if (!(node instanceof TreeNode)) {
    return false;
  }
  const nnew = node.getRightChild();
  const p = parent(node);
  // check leaf
  if (nnew.getLeftChild() === null) {
    return false;
  }
  node.setRightChild(nnew.getLeftChild());
  nnew.setLeftChild(node);
  node.setParent(nnew);
  if (node.getRightChild() !== null) {
    node.getRightChild().setParent(node);
  }
  if (p !== null) {
    if (node === p.getLeftChild()) {
      p.setLeftChild(nnew);
    } else if (node === p.getRightChild()) {
      p.setRightChild(nnew);
    }
  }
  nnew.setParent(p);
  return true;
};

const rotateRight = (node) => {
  if (!(node instanceof TreeNode)) {
    return false;
  }
  const nnew = node.getLeftChild();
  const p = node.getParent();
  // check leaf
  if (nnew.getLeftChild() === null) {
    return false;
  }
  node.setLeftChild(nnew.getRightChild());
  nnew.setRightChild(node);
  node.setParent(nnew);
  if (node.getLeftChild() !== null) {
    node.getLeftChild().setParent(node);
  }
  if (p !== null) {
    if (node === p.getLeftChild()) {
      p.setLeftChild(nnew);
    } else if (node === p.getRightChild()) {
      p.setRightChild(nnew);
    }
  }
  nnew.setParent(p);
  return true;
};

const insertCase1 = (node) => {
  if (parent(node) == null) {
    node.setColor('black');
  }
};

// insert methods
const insertCase2 = () => true;

const insertCase3 = (node) => {
  parent(node).setColor('black');
  uncle(node).setColor('black');
  grandparent(node).setColor('black');
  insertRepairTree(grandparent(node));
};

const insertCase4 = (node) => {
  const p = parent(node);
  const g = grandparent(node);
  let n = node;

  if (n === g.getLeftChild().getRightChild()) {
    rotateLeft(p);
    n = n.getLeftChild();
  } else if (n === g.getRightChild().getLeftChild()) {
    rotateRight(p);
    n = n.getRightChild();
  }

  insertCase4Step2(n);
};

const insertCase4Step2 = (node) => {
  const p = parent(node);
  const g = grandparent(node);

  if (node === p.getLeftChild()) {
    rotateRight(g);
  } else {
    rotateLeft(g);
  }
  p.setColor('black');
  g.setColor('red');
};

const insertRepairTree = (node) => {
  if (parent(node) === null) {
    // console.log(1);
    insertCase1(node);
  } else if (parent(node).getColor() === 'black') {
    // console.log(2);
    insertCase2();
  } else if (uncle(node).getColor() === 'red') {
    // console.log(3);
    insertCase3(node);
  } else {
    // console.log(4);
    insertCase4(node);
  }
};

// remove methods
const replaceNode = (node, child) => {
  if (!(node instanceof TreeNode) && !(child instanceof TreeNode)) {
    return false;
  }
  const p = parent(node);
  child.setParent(p);
  if (p === null) {
    return true;
  }
  if (node === p.getLeftChild()) {
    p.setLeftChild(child);
  } else {
    p.setRightChild(child);
  }
  return true;
};

const deleteOneChild = (root, node) => {
  let child = null;
  let p = parent(node);
  // check leaf
  if (node.getRightChild().getLeftChild() === null) {
    child = node.getLeftChild();
  } else {
    child = node.getRightChild();
  }

  // reset root
  // check leaf
  if (node === root && child.getLeftChild() === null) {
    return null;
  }

  replaceNode(node, child);

  if (node.getColor() === 'black') {
    if (child.getColor() === 'red') {
      child.setColor('black');
    }
    deleteCase1(child);
  }

  // reset root
  // check leaf
  if (child.getLeftChild() === null) {
    while (parent(p) !== null) {
      p = parent(p);
    }
    return p;
  }
  while (parent(child) !== null) {
    child = parent(child);
  }
  return child;
};

const deleteCase1 = (node) => {
  if (parent(node) !== null) {
    deleteCase2(node);
  }
};

const deleteCase2 = (node) => {
  const s = sibling(node);
  const p = parent(node);

  if (s.getColor() === 'red') {
    p.setColor('red');
    s.setColor('black');
    if (node === p.getLeftChild()) {
      rotateLeft(p);
    } else {
      rotateRight(p);
    }
  }
  deleteCase3(node);
};

const deleteCase3 = (node) => {
  const s = sibling(node);
  const p = parent(node);

  if (p.getColor() === 'black' && s.getColor() === 'black'
  && s.getLeftChild().getColor() === 'black' && s.getRightChild().getColor() === 'black') {
    s.setColor('red');
    deleteCase1(p);
  } else {
    deleteCase4(node);
  }
};

const deleteCase4 = (node) => {
  const s = sibling(node);
  const p = parent(node);

  if (p.getColor() === 'red' && s.getColor() === 'black'
  && s.getLeftChild().getColor() === 'black'
  && s.getRightChild().getColor() === 'black') {
    s.setColor('red');
    s.getParent().setColor('black');
  } else {
    deleteCase5(node);
  }
};

const deleteCase5 = (node) => {
  const s = sibling(node);
  if (s.getColor() === 'black') {
    if (node === node.getParent().getLeftChild()
    && s.getRightChild().getColor() === 'black'
    && s.getLeftChild().getColor() === 'red') {
      s.setColor('red');
      s.getLeftChild().setColor('black');
      rotateRight(s);
    } else if (node === node.getParent().getRightChild()
    && s.getLeftChild().getColor() === 'black'
    && s.getRightChild().getColor() === 'red') {
      s.setColor('red');
      s.getRightChild().setColor('black');
      rotateLeft(s);
    }
  }
  deleteCase6(node);
};

const deleteCase6 = (node) => {
  const s = sibling(node);
  const p = parent(node);

  s.setColor(node.getParent().getColor());
  p.setColor('black');

  if (node === node.getParent().getLeftChild()) {
    s.getRightChild().setColor('black');
    rotateLeft(p);
  } else {
    s.getLeftChild().setColor('black');
    rotateRight(p);
  }
};

// find methods
const findLeftMaximum = (node) => {
  let leftmax = node.getLeftChild();
  if (leftmax.getLeftChild() === null) {
    return node;
  }
  // check leaf
  while (leftmax.getRightChild().getLeftChild() !== null) {
    leftmax = leftmax.getRightChild();
  }
  return leftmax;
};

const findRightMinimum = (node) => {
  let rightmin = node.getRightChild();
  if (rightmin.getLeftChild() === null) {
    return node;
  }
  // check leaf
  while (rightmin.getLeftChild().getLeftChild() !== null) {
    rightmin = rightmin.getLeftChild();
  }
  return rightmin;
};

const findMinNode = (node) => {
  let minnode = node;
  // check leaf
  while (minnode.getLeftChild().getLeftChild() !== null) {
    minnode = minnode.getLeftChild();
  }
  return minnode;
};

const findMaxNode = (node) => {
  let maxnode = node;
  // check leaf
  while (maxnode.getRightChild().getLeftChild() !== null) {
    maxnode = maxnode.getRightChild();
  }
  return maxnode;
};

/**
 * @classdesc Express red black tree.<br>
 * 1. Each node is either red or black.<br>
 * 2. The root is black. This rule is sometimes ommitted.
 *  Since the root can always be changed from red to black,
 *  but not necessarily vice versa, this rule has little effect on analysis.<br>
 * 3. All leaves(nil) are black.<br>
 * 4. If a node is red then both its children are black.<br>
 * 5. Every path from a given node to any of its descendant nil nodes
 *  contains the same number of black nodes.
 */
class RedBlackTree {
  /**
   * Initiate RedBlackTree.<br>
   * You can set the compare function or copy same RedBlackTree.
   * @param {function|RedBlackTree} data - compare function or RedBlackTree.
   */
  constructor(data = null) {
    /** @private */
    this._root = null;
    /** @private */
    this._end = endnode;
    /** @private */
    this._size = 0;
    /** @private */
    this._keyComp = (n1, n2) => n1 < n2;

    if (typeof data === 'function') {
      this._keyComp = data;
    } else if (data !== null && data instanceof RedBlackTree) {
      [...data].forEach(val => this.insert(val[0], val[1]));
      this._keyComp = data.keyComp();
    }
  }

  begin() {
    if (this._root === null) {
      return null;
    }
    return findMinNode(this._root);
  }

  /**
   * this express the end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  end() {
    return this._end;
  }

  rbegin() {
    return findMaxNode(this._root);
  }

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
          return { value: [node.getKey(), node.getValue()], done: false };
        }

        node = node.getNext();
        if (node === end) {
          return { value: undefined, done: true };
        }
        return { value: [node.getKey(), node.getValue()], done: false };
      },
    };
    return iterator;
  }

  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  size() {
    return this._size;
  }

  clear() {
    this._root = null;
    this._end = endnode;
    this._size = 0;
  }

  insert(key, value) {
    const node = new TreeNode(key, value, 'red', null, new TreeNode(null, null, 'black', null, null),
      new TreeNode(null, null, 'black', null, null));
    node.getLeftChild().setParent(node);
    node.getRightChild().setParent(node);
    this._insertRecurse(this._root, node);
    // console.log('recurse');

    insertRepairTree(node);
    // console.log('repair');
    let root = node;
    while (parent(root) !== null) {
      root = parent(root);
    }
    this._root = root;
    this._size += 1;
  }

  // how to reset root
  /**
   * If erase() get key value as param, we erase all nodes with that key.
   * But if erase() get TreeNode as param, we erase only that node.
   * @param {*|TreeNode} data - Data can be key or Node of tree.
   */
  erase(data) {
    let nextnode = null;
    // console.log('erase');
    if (data instanceof TreeNode) {
      nextnode = data.getNext();
      // console.log('node object');
      // check leaf
      if (data.getLeftChild().getLeftChild() === null
        || data.getRightChild().getLeftChild() === null) {
        this._root = deleteOneChild(this._root, data);
      } else {
        const leftmax = findLeftMaximum(data);
        data.setKey(leftmax.getKey());
        data.setValue(leftmax.getValue());
        this._root = deleteOneChild(this._root, leftmax);
      }
      this._size -= 1;
    } else {
      const range = this.equalRange(data);
      if (range[0] === endnode) {
        return false;
      }
      let node = range[0];
      while (node !== range[1]) {
        node = this.erase(node);
      }
      nextnode = node;
    }

    return nextnode;
  }

  count() { }

  find() { }

  contains() { }

  equalRange(key) {
    const leftmost = this._findLeftMostNode(key);
    if (leftmost === endnode) {
      return [endnode, endnode];
    }
    const rightmost = this._findRightMostNode(key);
    return [leftmost, rightmost.getNext()];
  }

  lowerBound(key) {}

  upperBound(key) {}

  keyComp() {
    return this._keyComp;
  }

  // private methods
  _insertRecurse(root, node) {
    if (root != null && this._keyComp(root.getKey(), node.getKey())) {
      // check leaf
      if (root.getLeftChild().getLeftChild() !== null) {
        this._insertRecurse(root.getLeftChild(), node);
        return;
      }
      root.setLeftChild(node);
    } else if (root !== null) {
      // check leaf
      if (root.getRightChild().getLeftChild() !== null) {
        this._insertRecurse(root.getRightChild(), node);
        return;
      }
      root.setRightChild(node);
    }

    node.setParent(root);
  }

  /**
   * Find the node which places left most of tree.
   * @param {TreeNode} root - root of search Tree.
   * @param {key} - target key.
   * @private
   */
  _findLeftMostNode(key) {
    if (this._root === null) {
      return endnode;
    }
    let node = this._root;
    while (node.getLeftChild() !== null && node.getKey() !== key) {
      if (this._keyComp(node.getKey(), key)) {
        node = node.getLeftChild();
      } else {
        node = node.getRightChild();
      }
    }

    if (node.getLeftChild() === null) {
      return endnode;
    }

    while (node.getPrev() !== endnode && node.getPrev().getKey() === key) {
      node = node.getPrev();
    }
    return node;
  }

  /**
   * Find the node which places right most of tree.
   * @param {TreeNode} root - root of search Tree.
   * @param {key} - target key.
   * @private
   */
  _findRightMostNode(key) {
    if (this._root === null) {
      return endnode;
    }
    let node = this._root;
    while (node.getLeftChild() !== null && node.getKey() !== key) {
      if (this._keyComp(node.getKey(), key)) {
        node = node.getLeftChild();
      } else {
        node = node.getRightChild();
      }
    }

    if (node.getLeftChild() === null) {
      return endnode;
    }

    while (node.getNext() !== endnode && node.getNext().getKey() === key) {
      node = node.getNext();
    }
    return node;
  }
}

module.exports = RedBlackTree;
