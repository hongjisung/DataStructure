/**
 * @classdesc Express list element.<br>
 * @protected
 */
class ListNode {
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
   * public method for change data of node in list.
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

module.exports = ListNode;
