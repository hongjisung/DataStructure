## **Usage**
Usage Examples of algorithm  

### **Merge Sort**
```javascript
const mergesort = require('./src').MergeSort;
const List = require('./src/containers/list');

const a = [];
for (let i = 0; i < 10; i += 1) {
  a.push(Math.floor(Math.random()*100))
}
const b = mergesort(a); // sorted Array object

const li = new List();
for (let i = 0; i < 10; i += 1) {
  li.pushBack(Math.floor(Math.random()*100))
}
const b2 = mergesort(li); // sorted Array object
```

### **Quick Sort**
```javascript
const quicksort = require('./src').QuickSort;
const List = require('./src/containers/list');

const li = new List();
for (let i = 0; i < 10; i += 1) {
  li.pushBack(Math.floor(Math.random()*100))
}
const b = quicksort(li); // sorted Array object
```

### **removeCondition**
```javascript
const std = require('./src');

const list = new std.List();
const limit = 1000;
for (let i = 0; i < limit; i += 1) {
  list.pushBack(Math.floor(Math.random() * limit * 10));
}
std.removeCondition(list, data => data < limit * 5); // remove elements under 5000;

const setTree = new std.SetTree();
for (let i = 0; i < limit; i += 1) {
  setTree.insert(Math.floor(Math.random() * limit * 10));
}
std.removeCondition(setTree, data => data < limit * 5); // remove elements which key is under 5000;
```

## **unique**
```javascript
const std = require('./src');

const list = new std.List();
const limit = 1000;
for (let i = 0; i < limit; i += 1) {
  list.pushBack(Math.floor(Math.random() * 10));
}
std.unique(list); // elements are unique.
```

## **findNodes**
```javascript
const std = require('./src');

const keys = [1, 5, 10, 50, 100, 500, 0];
const limit = 1000;

const list = new std.List();
for (let i = 0; i < limit; i += 1) {
  list.pushBack(Math.floor(Math.random() * limit));
}

const found = std.findNodes(list, keys);

found.forEach((val) => {
  console.log(keys.includes(val.getData())); // true
});
```

## **map**  
```javascript
const std = require('./src');

const limit = 1000;
const mapTree = new std.MapTree();
for (let i = 0; i < limit; i += 1) {
  const val = Math.floor(Math.random() * limit * 10);
  mapTree.insert(val, val);
}

std.map(mapTree, val => val * 1000);

for (let node = mapTree.begin(); node !== mapTree.end(); node = node.getNext()) {
  console.log(node.getValue() === node.getKey() * 1000); // true
}
```