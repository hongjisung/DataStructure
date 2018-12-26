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
    parent
    leftChild
    rightChild

  Method:
    getKey
    setKey
    getValue
    setValue
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

    // operation
    compareKey
    compareValue

    // Observers
    keyComp

*/

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
  constructor(key = null, value = null, parent = null, leftChild = null, rightChild = null) {
    /** @private */
    this.key = key;
    /** @private */
    this.value = value;
    /** @private */
    this.parent = parent;
    /** @private */
    this.leftChild = leftChild;
    /** @private */
    this.rightChild = rightChild;
  }

  /**
   * Return the key of node.
   * @returns {*} - the key of node.
  */
  getKey() {
    return this.key;
  }

  /** @protected */
  setKey(key) {
    this.key = key;
  }

  /**
   * Return the value of node.
   * @returns {*} - the value of node.
  */
  getValue() {
    return this.value;
  }

  /** @protected */
  setValue(value) {
    this.value = value;
  }

  /** @protected */
  getParent() {
    return this.key;
  }

  /** @protected */
  setParent(node) {
    this.parent = node;
  }

  /** @protected */
  getLeftChild() {
    return this.key;
  }

  /** @protected */
  setLeftChild(node) {
    this.leftChild = node;
  }

  /** @protected */
  getRightChild() {
    return this.key;
  }

  /** @protected */
  setRightChild(node) {
    this.rightChild = node;
  }

  /**
   * Get prev node by the compare function.
   * @returns {TreeNode} - the prev node.
   */
  getPrev() {
    
  }

  /**
   * Get next node by the compare function.
   * @returns {TreeNode} - the next node.
   */
  getNext() {
    
  }
}

class RedBlackTree {

}

module.exports = RedBlackTree;
