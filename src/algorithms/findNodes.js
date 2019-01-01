const List = require('../containers/list');

/**
 * find nodes which key matches in the given keys array.<br>
 * n is the number of element in data, m is the number of key.<br>
 * In List, it traverse the iterator. so, time complexity is O(n*m).<br>
 * In others, it use equalRange Method in tree. so, time complexity is O(m*log(n)).<br><br>
 * Working container : List, setTree, multiSetTree, mapTree, multiMapTree.
 * @param {object} data - iterable container in this data structure.
 * @param {Array} keys - find datas.
 * @returns {Array} array of nodes whick match the key.
 */
const findNodes = (data, keys) => {
  const nodes = [];
  if (data instanceof List) {
    for (let itr = data.begin(); itr !== data.end(); itr = itr.getNext()) {
      if (keys.includes(itr.getData())) {
        nodes.push(itr);
      }
    }
  } else {
    keys.forEach((val) => {
      const range = data.equalRange(val);
      for (let itr = range[0]; itr !== range[1]; itr = itr.getNext()) {
        nodes.push(itr);
      }
    });
  }
  return nodes;
};

module.exports = findNodes;
