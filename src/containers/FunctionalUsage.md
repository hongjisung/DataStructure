# **Functional Usage By Using copy method**

## **List Example**
``` javascript
const List = require('./src/containers/list');

// add functional method about List.pushBack method
// 1. make function with same parameter
List.prototype.pushBackFunc = function(d) {
  // 2. make new object by copy
  const newlist = this.copy();
  // 3. use the function to make functional.
  newlist.pushBack(d);
  // 4. return it.
  return newlist;
}

// constructor
const list = new List([1, 2, 3]);

let newlist = list.pushBackFunc(5).pushBackFunc(10).pushBackFunc(15);
console.log(list);
console.log(newlist);

// add functional method about List.popFront method
List.prototype.popFrontFunc = function() {
  const newlist = this.copy();
  newlist.popFront();
  return newlist;
}

newlist = list.popFrontFunc().popFrontFunc();
console.log(newlist);
```

## **SetTree Example**
```javascript
const SetTree = require('./src').SetTree;

// add functional method about SetTree.insert method;
SetTree.prototype.insertFunc = function(d) {
  const newtree = this.copy();
  newtree.insert(d);
  return newtree;
}

const st = new SetTree();
let newst = st.insertFunc(3).insertFunc(5).insertFunc(7);
console.log(st);
console.log(newst);

// add functional method about SetTree.erase method;
SetTree.prototype.eraseFunc = function(d) {
  const newtree = this.copy();
  newtree.erase(d);
  return newtree;
}

newst = newst.eraseFunc(7).eraseFunc(5);
console.log(newst);
```