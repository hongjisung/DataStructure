/*
class SetTree:
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

    // Modifiers
    clear
    insert
    erase

    // Lookup
    count
    find
    contains
    equalRange
    lowerBound
    upperBound

    // Observers
    keyComp

    //
    toString
*/
const RedBlackTree = require('./redBlackTree');

/**
 * @classdesc unique element self-balancing binary search tree.<br>
 * key is equal to value.<br>
 * Use composition by RedBlackTree.<br>
 * Can not have mutiple same element.
 */
class SetTree {
  /**
   * Initiate setTree.<br>
   * Get parameter as null or compare function or other set tree.
   * @param {null|function|SetTree} data
   */
  constructor(data = null) {
    /**
     * compose red black tree.
     * @type {RedBlackTree}
     * @private
     */
    this._tree = new RedBlackTree();
    if (typeof data === 'function') {
      this._tree = new RedBlackTree(data);
    } else if (data instanceof SetTree) {
      this._tree = new RedBlackTree(data.keyComp());
      [...data].forEach(val => this._tree.insert(val, val));
    }
  }

  /**
   * Return the first iterator node of tree.
   * @returns {null|TreeNode}
   */
  begin() {
    return this._tree.begin();
  }

  /**
   * this express the end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  end() {
    return this._tree.end();
  }

  /**
   * return the last node of tree iterator.
   * @returns {null|TreeNode}
   */
  rbegin() {
    return this._tree.rbegin();
  }

  /**
   * this express the front end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  rend() {
    return this._tree.rend();
  }

  /**
   * iterator of tree.
   */
  [Symbol.iterator]() {
    const itr = this._tree[Symbol.iterator]();
    let data = null;
    const iterator = {
      next() {
        data = itr.next();
        if (data.done === false) {
          return { value: data.value[0], done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  }

  /**
   * make sure tree is empty.
   * @returns {boolean}
   */
  empty() {
    return this._tree.empty();
  }

  /**
   * the number of nodes in tree.
   * @returns {number}
   */
  size() {
    return this._tree.size();
  }

  /**
   * initiate the tree.
   */
  clear() {
    this._tree.clear();
  }

  /**
   * insert new node in tree with key.<br>
   * If key already exists, return false.
   * @param {*} key - Should not TreeNode.
   */
  insert(key) {
    if (this._tree.contains(key)) {
      return false;
    }
    this._tree.insert(key, key);
    return true;
  }

  /**
   * If erase() get key value as param, we erase all nodes with that key.<br>
   * But if erase() get TreeNode as param, we erase only that node.
   * @param {*|TreeNode} data - Data can be key or Node of tree.
   * @returns {false|TreeNode} - next node of erased data. if cannot find the key, return falase.
   */
  erase(data) {
    return this._tree.erase(data);
  }

  /**
   * count the number of nodes which match the key.<br>
   * It should be 0 or 1.
   * @param {*} key - Should not TreeNode.
   * @returns {number}
   */
  count(key) {
    return this._tree.count(key);
  }

  /**
   * return node which matches the key.
   * @param {*} key - Should not TreeNode.
   * @returns {TreeNode}
   */
  find(key) {
    return this._tree.find(key);
  }

  /**
   * make sure the key is in tree.
   * @param {*} key - Should not TreeNode.
   * @returns {boolean}
   */
  contains(key) {
    return this._tree.contains(key);
  }

  /**
   * return the start node and end node of given key.<br>
   * end node is next node of last match node.<br>
   * if no key in tree, return [endnode,endnode]
   * @param {*} key - Should not TreeNode.
   * @returns {Array} - [TreeNode,TreeNode]
   */
  equalRange(key) {
    return this._tree.equalRange(key);
  }

  /**
   * Find the first not less node.<br>
   * It don't need to be same with given key.
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  lowerBound(key) {
    return this._tree.lowerBound(key);
  }

  /**
   * Find the first upper node.<br>
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  upperBound(key) {
    return this._tree.upperBound(key);
  }

  /**
   * return the key compare function.
   * @returns {function}
   */
  keyComp() {
    return this._tree.keyComp();
  }

  /**
   * show information of object
   * @returns {string}
   */
  toString() {
    let str = `Object Name: SetTree
Size: `.concat(this.size().toString()).concat(`
Elements: `);
    [...this].map((d, i) => {
      str = str.concat(`
  Sequence[`)
        .concat(i)
        .concat(']: ')
        .concat(d.toString());
      return true;
    });
    return str;
  }
}

module.exports = SetTree;
