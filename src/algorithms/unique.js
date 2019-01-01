const List = require('../containers/list');

/**
 * make a given data container have unique elements.<br>
 * it traverse nodes by iterator and check condition.<br>
 * it takes time about O(n).<br><br>
 * Working container : List, multiSetTree, multiMapTree.
 * @param {object} data - iterable container in this data structure.
 */
const unique = (data) => {
  if (data instanceof List) {
    const dict = {};
    let node = data.begin();
    while (node !== data.end()) {
      if (dict[node.getData()] === undefined) {
        dict[node.getData()] = true;
        node = node.getNext();
      } else {
        node = data.erase(node);
      }
    }
  } else {
    const dict = {};
    let node = data.begin();
    while (node !== data.end()) {
      if (dict[node.getKey()] === undefined) {
        dict[node.getKey()] = true;
        node = node.getNext();
      } else {
        node = data.erase(node);
      }
    }
  }
};

module.exports = unique;
