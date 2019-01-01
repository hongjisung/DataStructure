const List = require('../containers/list');
const MapTree = require('../containers/mapTree');
const MultiMapTree = require('../containers/multiMapTree');

/**
 * apply the given function to elements in the given object.<br>
 * It cannot apply to set as set is key and data are equal and it is sorted by key.<br>
 * it traverse nodes by iterator and check condition.<br>
 * it takes time about O(n).<br><br>
 * Working container : List, mapTree, multiMapTree.
 * @param {object} data - List, MapTree, MultiMapTree
 * @param {function} func - apply this function to elements in object.
 */
const map = (data, func) => {
  if (data instanceof List) {
    for (let itr = data.begin(); itr !== data.end(); itr = itr.getNext()) {
      itr.setData(func(itr.getData()));
    }
  } else if (data instanceof MapTree || data instanceof MultiMapTree) {
    for (let itr = data.begin(); itr !== data.end(); itr = itr.getNext()) {
      itr.setValue(func(itr.getValue()));
    }
  } else {
    return false;
  }
  return true;
};

module.exports = map;
