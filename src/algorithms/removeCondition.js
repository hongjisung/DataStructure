const List = require('../containers/list');

/**
 * remove all elements which match the condition in container.
 * @param {List|SetTree|MapTree} data - iterable container in this data structure.
 * @param {function} condition - check data or key match the condition.
 * @returns {boolean}
 */
const removeCondition = (data, condition) => {
  if (data === null || typeof data.begin !== 'function' || typeof data.end !== 'function') {
    return false;
  }
  let node = data.begin();
  while (node !== data.end()) {
    if (data instanceof List) {
      if (condition(node.getData())) {
        node = data.erase(node);
      } else {
        node = node.getNext();
      }
    } else if (condition(node.getKey())) {
      node = data.erase(node);
    } else {
      node = node.getNext();
    }
  }
  return true;
};

module.exports = removeCondition;
