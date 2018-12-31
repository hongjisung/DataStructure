const List = require('../containers/list');

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
