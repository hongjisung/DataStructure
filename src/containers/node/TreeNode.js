/*
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

module.exports = TreeNode;
