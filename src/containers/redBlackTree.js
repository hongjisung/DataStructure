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
    rend
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
 * @protected
 */
class TreeNode {
  /**
   * Create node of tree.
   * @constructor
   * @private
   * @param {*} key - the key of node for compare. Should not TreeNode.
   * @param {*} value - the value of node for save.
   * @param {TreeNode} parent - the parent of node in tree.
   * @param {TreeNode} leftChild - the left child of node in tree.
   * @param {TreeNode} rightChild - the right child of node in tree.
   * @param {EndNode} endnode - endnode of tree iterator.
   */
  constructor(key = null, value = null, color = null,
    parent = null, leftChild = null, rightChild = null, endnode = null, rendnode = null) {
    /**
     * all type except TreeNode.
     * @private
     * @type {*}
     */
    this._key = key;
    /**
     * @type {*}
     * @private
     */
    this._value = value;
    /**
     * only 'red' or 'black'. except case null for endnode.
    * @type {string}
    * @private
    */
    this._color = color;
    /**
     * parent node.
     * @type {TreeNode}
     * @private
     */
    this._parent = parent;
    /**
     * left child node.
     * @type {TreeNode}
     * @private
     */
    this._leftChild = leftChild;
    /**
     * right child node.
     * @type {TreeNode}
     * @private
     */
    this._rightChild = rightChild;
    /**
     * endnode
     * @type {TreeNode}
     * @private
     */
    this._endnode = endnode;
    this._rendnode = rendnode;
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
   * @returns {string} - the color of node.
   * @protected
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

  /*
  1. if this node has left child, go left subtree and return maximum node in there.
  2. if it has no left child, go parent.
  3. if it is right child of parent, return parent.
  4. if it is left child of parent, go next parent and go 3.
  5. but if it has no parent anymore, it is biggest node and return rendnode.
  */
  /**
   * Get prev node by the compare function.<br>
   * At rendnode, it returns false.
   * @returns {TreeNode} - the prev node.
   */
  getPrev() {
    if (this.getColor() === null) {
      return false;
    }
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
      return this._rendnode;
    }
    return leftmax;
  }


  /*
  1. if this node has right child, go right subtree and return minimum node in there.
  2. if it has no right child, go parent.
  3. if it is left child of parent, return parent.
  4. if it is right child of parent, go next parent and go 3.
  5. but if it has no parent anymore, it is biggest node and return endnode.
  */
  /**
   * Get next node by the compare function.<br>
   * At endnode, it returns false.
   * @returns {false|TreeNode} - the next node.
   */
  getNext() {
    if (this.getColor() === null) {
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
      return this._endnode;
    }
    return rightmin;
  }
}

/**
 * @classdesc Denote end of tree iterator.<br>
 * special class extends TreeNode.<br>
 * Just use for endnode.<br>
 * Have special variable _prev for last node of the tree.
 * @private
 */
class EndNode extends TreeNode {
  constructor() {
    super();
    /**
     * denode the last node in tree by iterator.
     */
    this._next = null;
    this._prev = null;
  }

  getNext() {
    return this._next;
  }

  /** @protected */
  setNext(node) {
    this._next = node;
  }

  getPrev() {
    return this._prev;
  }

  /** @protected */
  setPrev(node) {
    this._prev = node;
  }
}

// private variables

/**
 * get parent of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const parent = (node) => {
  if (!(node instanceof TreeNode)) {
    return null;
  }
  return node.getParent();
};

/**
 * get grandparent of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const grandparent = (node) => {
  const p = parent(node);
  if (p === null) {
    return null;
  }
  return parent(p);
};

/**
 * get sibling of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
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

/**
 * get uncle of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const uncle = (node) => {
  const p = parent(node);
  const g = grandparent(node);
  if (g == null) {
    return null;
  }
  return sibling(p);
};

/**
 * move right child node to present node
 * @param {TreeNode} node
 * @returns {boolean}
 * @private
 */
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

/**
 * move left child node to present node
 * @param {TreeNode} node
 * @returns {boolean}
 * @private
 */
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

/** @private */
const insertCase1 = (node) => {
  if (parent(node) == null) {
    node.setColor('black');
  }
};

// insert methods
/** @private */
const insertCase2 = () => true;

/** @private */
const insertCase3 = (node) => {
  parent(node).setColor('black');
  uncle(node).setColor('black');
  grandparent(node).setColor('red');
  insertRepairTree(grandparent(node));
};

/** @private */
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

/** @private */
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

/**
 * correct tree which break rules.
 * @param {TreeNode} node
 * @private
 */
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
/**
 * replace present and given child nodes.
 * @param {TreeNode} node
 * @param {TreeNode} child
 * @private
 */
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

/**
 * correct the tree which breaks the rule.
 * @param {TreeNode} root
 * @param {TreeNode} node
 * @returns {TreeNode} root of corrected tree.
 * @private
 */
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
    } else {
      deleteCase1(child);
    }
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

/** @private */
const deleteCase1 = (node) => {
  if (parent(node) !== null) {
    deleteCase2(node);
  }
};

/** @private */
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

/** @private */
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

/** @private */
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

/** @private */
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

/** @private */
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
/**
 * find the left maximum node of given node.
 * @param {TreeNode} node
 * @returns {null|TreeNode}
 * @private
 */
const findLeftMaximum = (node) => {
  if (node === null) {
    return null;
  }
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

/**
 * find the right minimum node of given node.
 * @param {TreeNode} node
 * @returns {null|TreeNode}
 * @private
 */
const findRightMinimum = (node) => {
  if (node === null) {
    return null;
  }
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

/**
 * find minimum node of subtree which has root as given node.
 * @param {TreeNode} node
 * @returns {null|TreeNode}
 * @private
 */
const findMinNode = (node) => {
  if (node === null) {
    return null;
  }
  let minnode = node;
  // check leaf
  while (minnode.getLeftChild().getLeftChild() !== null) {
    minnode = minnode.getLeftChild();
  }
  return minnode;
};

/**
 * find maximum node of subtree which has root as given node.
 * @param {TreeNode} node
 * @returns {null|TreeNode}
 * @private
 */
const findMaxNode = (node) => {
  if (node === null) {
    return null;
  }
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
 *  contains the same number of black nodes.<br><br>
 * References https://en.wikipedia.org/wiki/Red%E2%80%93black_tree.
 */
class RedBlackTree {
  /**
   * Initiate RedBlackTree.<br>
   * You can set the compare function or copy same RedBlackTree.
   * @param {null|function|RedBlackTree} data - compare function or RedBlackTree.
   */
  constructor(data = null) {
    /**
     * the root of tree.
     * @type {TreeNode}
     * @private
    */
    this._root = null;
    /**
     * the back end of tree iterator.
     * @type {EndNode}
     * @private
    */
    this._endnode = new EndNode();
    /**
     * the front end of tree iterator.
     * @type {EndNode}
     * @private
    */
    this._rendnode = new EndNode();
    this._endnode.setPrev(this._rendnode);
    this._rendnode.setNext(this._endnode);
    /**
     * the size of tree.
     * @type {number}
     * @private
    */
    this._size = 0;
    /**
     * the compare function of key.
     * @type {function}
     * @private
    */
    this._keyComp = (n1, n2) => n1 < n2;

    if (typeof data === 'function') {
      this._keyComp = data;
    } else if (data !== null && data instanceof RedBlackTree) {
      [...data].forEach(val => this.insert(val[0], val[1]));
      this._keyComp = data.keyComp();
    }
  }

  /**
   * Return the first iterator node of tree.
   * @returns {null|TreeNode}
   */
  begin() {
    if (this._root === null) {
      return null;
    }
    return findMinNode(this._root);
  }

  /**
   * this express the back end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  end() {
    if (this._root !== null) {
      this._endnode.setPrev(this.rbegin());
    } else {
      this._endnode.setPrev(this._rendnode);
    }
    return this._endnode;
  }

  /**
   * return the last node of tree iterator.
   * @returns {null|TreeNode}
   */
  rbegin() {
    if (this._root === null) {
      return null;
    }
    return findMaxNode(this._root);
  }

  /**
   * this express the front end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  rend() {
    if (this._root !== null) {
      this._rendnode.setNext(this.begin());
    } else {
      this._rendnode.setNext(this._endnode);
    }
    return this._rendnode;
  }

  /**
   * iterator of tree.<br>
   * return value is [key, value] array.
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

  /**
   * make sure tree is empty.
   * @returns {boolean}
   */
  empty() {
    if (this._size === 0) {
      return true;
    }
    return false;
  }

  /**
   * the number of nodes in tree.
   * @returns {number}
   */
  size() {
    return this._size;
  }

  /**
   * initiate the tree.
   */
  clear() {
    this._root = null;
    this._endnode = new EndNode();
    this._rendnode = new EndNode();
    this._endnode.setPrev(this._rendnode);
    this._rendnode.setNext(this._endnode);
    this._size = 0;
  }

  /**
   * insert new node in tree with key and value.
   * @param {*} key - Should not TreeNode.
   * @param {*} value
   */
  insert(key, value) {
    if (key instanceof TreeNode) {
      return;
    }
    const node = new TreeNode(key, value, 'red', null, new TreeNode(null, null, 'black', null, null, null),
      new TreeNode(null, null, 'black', null, null, null), this._endnode, this._rendnode);
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
   * If erase() get key value as param, we erase all nodes with that key.<br>
   * But if erase() get TreeNode as param, we erase only that node.
   * @param {*|TreeNode} data - Data can be key or Node of tree.
   * @returns {false|TreeNode} - next node of erased data. if cannot find the key, return falase.
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
      if (range[0] === this.end()) {
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

  /**
   * count the number of nodes which match the key.
   * @param {*} key - Should not TreeNode.
   * @returns {number}
   */
  count(key) {
    let cnt = 0;
    const range = this.equalRange(key);
    for (let itr = range[0]; itr !== range[1]; itr = itr.getNext()) {
      cnt += 1;
    }
    return cnt;
  }

  /**
   * return arbitrary node which matches the key.
   * @param {*} key - Should not TreeNode.
   * @returns {TreeNode}
   */
  find(key) {
    return this._findKey(key);
  }

  /**
   * make sure the key is in tree.
   * @param {*} key - Should not TreeNode.
   * @returns {boolean}
   */
  contains(key) {
    const findnode = this._findKey(key);
    if (findnode === this._endnode) {
      return false;
    }
    return true;
  }

  /**
   * return the start node and end node of given key.<br>
   * end node is next node of last match node.<br>
   * if no key in tree, return [endnode,endnode]
   * @param {*} key - Should not TreeNode.
   * @returns {Array} - [TreeNode,TreeNode]
   */
  equalRange(key) {
    const leftmost = this._findLeftMostNode(key);
    if (leftmost === this._endnode) {
      return [this._endnode, this._endnode];
    }
    const rightmost = this._findRightMostNode(key);
    return [leftmost, rightmost.getNext()];
  }

  /**
   * Find the first not less node.<br>
   * It don't need to be same with given key.
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  lowerBound(key) {
    if (this._root === null) {
      return this._endnode;
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
      node = parent(node);
      if (!this._keyComp(node.getKey(), key)) {
        node = node.getNext();
      }
      return node;
    }

    while (node.getPrev() !== this._rendnode && node.getPrev().getKey() === key) {
      node = node.getPrev();
    }
    return node;
  }

  /**
   * Find the first upper node.<br>
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  upperBound(key) {
    if (this._root === null) {
      return this._endnode;
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
      node = parent(node);
      if (!this._keyComp(node.getKey(), key)) {
        node = node.getNext();
      }
      return node;
    }

    while (node.getNext() !== this._endnode && node.getNext().getKey() === key) {
      node = node.getNext();
    }
    return node.getNext();
  }

  /**
   * return the key compare function.
   * @returns {function}
   */
  keyComp() {
    return this._keyComp;
  }

  // private methods
  /**
   * find the leaf node to insert new node.
   * @param {TreeNode} root
   * @param {TreeNode} node
   * @private
   */
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
   * @param {key} - target key.
   * @private
   * @returns {TreeNode}
   */
  _findLeftMostNode(key) {
    if (this._root === null) {
      return this._endnode;
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
      return this._endnode;
    }

    while (node.getPrev() !== this._rendnode && node.getPrev().getKey() === key) {
      node = node.getPrev();
    }
    return node;
  }

  /**
   * Find the node which places right most of tree.
   * @param {key} - target key.
   * @private
   * @returns {TreeNode}
   */
  _findRightMostNode(key) {
    if (this._root === null) {
      return this._endnode;
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
      return this._endnode;
    }

    while (node.getNext() !== this._endnode && node.getNext().getKey() === key) {
      node = node.getNext();
    }
    return node;
  }

  /**
   * Make sure the key is in tree.
   * If key exists, return the arbitrary node.
   * Else return endnode.
   * @param {*} key - target key to find.
   * @private
   * @returns {TreeNode}
   */
  _findKey(key) {
    if (this._root === null) {
      return this._endnode;
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
      return this._endnode;
    }

    return node;
  }
}

module.exports = RedBlackTree;
