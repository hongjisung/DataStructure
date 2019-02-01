
## **Usage**
Usage example of containers  

### **List**
```javascript
const List = require('./src/containers/list');

// constructor
const list = new List();
const list2 = new List([1, 2]);
const list3 = new List([1, 5, 3, 4, 2]);

// deepcopy
const list4 = new List(list3);

// modifiers
list.pushBack(2);
list.pushFront(1); // [1,2]
list.popFront(); // [2]
list.pushBack(1); // [2, 1]

// iterators
for (let itr = list.begin(); itr !== list.end(); itr = itr.getNext()) {
  console.log(itr.getData()); // 2, 1
}
[...list] // [2, 1]

// operations
list.compare(list2) // false
list3.sort(); // [5, 4, 3, 2, 1]
list3.sort((n1, n2) => n1 > n2, 'mergesort') // [1, 2, 3, 4, 5]
list3.reverse(); // [5, 4, 3, 2, 1]
```

### **Stack**
```javascript
const Stack = require('./src').Stack;

// constructor
let stack = new Stack();
stack = new Stack([1, 5, 3]);
// deep copy
const s2 = new Stack(stack);

// element access
stack.top(); // 3

// capacity
stack.empty(); // false
stack.size(); // 3

// modifiers
stack.pop(); // [1, 5]
stack.push(10); // [1, 5, 10]
```

### **Queue**
```javascript
const Queue = require('./src').Queue;

// constructor
let queue = new Queue();
queue = new Queue([1, 3, 5]);
// deep copy
const q2 = new Queue(queue);

// element access
queue.front() // 1
queue.back() // 5

// modifiers
queue.pop() // [3, 5]
queue.push(7) // [3, 5, 7]
queue.clear() // []
```

### **Priority Queue**
```javascript
const PriorityQueue = require('./src').PriorityQueue;

// constructor
let pq = new PriorityQueue();
pq = new PriorityQueue((n1, n2) => n1 > n2);

// deep copy
const pq2 = new PriorityQueue(null, pq);

// modifiers
[7, 3, 5, 1, 9].forEach(val => pq.push(val)); // [1, 3, 5, 7, 9]
pq.pop(); // [3, 5, 7, 9]

// element access
pq.top(); // 3
pq.compareFunction() // (n1, n2) => n1 > n2
```

### **Deque**
```javascript
const Deque = require('./src').Deque;

// constructor
let deque = new Deque();
deque = new Deque([1, 2, 3]);
// deep copy
const d2 = new Deque(deque);

// element access
deque.front(); // 1
deque.back(); // 3

// modifiers
deque.popBack(); // [1, 2]
deque.pushFront(4); // [4, 1, 2]
```

### **SetTree**
```javascript
const SetTree = require('./src').SetTree;

// constructor
let setTree = new SetTree();
const st = new SetTree((n1, n2) => n1 > n2); // ascending
[5, 3, 4, 1, 2].forEach(val => st.insert(val)); // [1, 2, 3, 4, 5]
// deep copy
setTree = new SetTree(st);

// iterator
console.log([...setTree]); // [1, 2, 3, 4, 5]
for (let itr = setTree.begin(); itr !== setTree.end(); itr = itr.getNext()) {
  console.log(itr.getKey()); // 1, 2, 3, 4, 5
}
for (let itr = setTree.rbegin(); itr !== setTree.rend(); itr = itr.getPrev()) {
  console.log(itr.getKey()); // 5, 4, 3, 2, 1
}

// modifiers
setTree.insert(3); // false
setTree.insert(6); // true, [1, 2, 3, 4, 5, 6]
setTree.erase(3); // return TreeNode which key is 4
setTree.erase(3); // false;

// lookup
setTree.find(3); // setTree.end()
setTree.find(4); // TreeNode which key is 4
setTree.count(4); // 1
setTree.contains(3); // false
setTree.lowerBound(3); // TreeNode which key is 4
setTree.upperBound(4); // TreeNode which key is 5
setTree.equalRange(5); // [ TreeNode which key is 5,  TreeNode which key is 6]

// Observers
setTree.keyComp(); // (n1, n2) => n1 > n2
```

### **MultiSetTree**
```javascript
const std = require('./src');

// same methods with SetTree
const multiSetTree = new std.MultiSetTree();
multiSetTree.insert(3);
multiSetTree.insert(3);
multiSetTree.insert(3);

const range = multiSetTree.equalRange(3);
for (let itr = range[0]; itr !== range[1]; itr = itr.getNext()) {
  console.log(itr.getKey()); // 3, 3, 3
}
```

### **MapTree**
```javascript
const MapTree = require('./src').MapTree;

// constructor
let mapTree = new MapTree();
const mt = new MapTree((n1, n2) => n1 > n2); // ascending
[[5, 'a'], [3, 'b'], [4, 'c'], [1, 'd'], [2, 'e']].forEach(val => mt.insert(val[0], val[1])); // [[1, 'd'], [2, 'e'], [3, 'b'], [4, 'c'], [5, 'a']]
// deepcopy
mapTree = new MapTree(mt);

// iterator
console.log([...mapTree]); // [[1, 'd'], [2, 'e'], [3, 'b'], [4, 'c'], [5, 'a']]
for (let itr = mapTree.begin(); itr !== mapTree.end(); itr = itr.getNext()) {
  console.log(itr.getKey()); // 1, 2, 3, 4, 5
}
for (let itr = mapTree.rbegin(); itr !== mapTree.rend(); itr = itr.getPrev()) {
  console.log(itr.getValue()); // a, c, b, e, d
}

// modifiers
mapTree.insert(3, 'z'); // false
mapTree.insert(6, 'k'); // true
mapTree.erase(3); // return TreeNode which key is 4
mapTree.erase(3); // false;
mapTree.assign(3, 't'); // false
mapTree.assign(4, 't'); // true, [[1, 'd'], [2, 'e'], [4, 't'], [5, 'a'], [6, 'k']]
mapTree.insertOrAssign(9, 'z'); // [[1, 'd'], [2, 'e'], [4, 't'], [5, 'a'], [6, 'k'], [9, 'z']]

// lookup
mapTree.find(3); // setTree.end()
mapTree.find(4); // TreeNode which key is 4
mapTree.count(4); // 1
mapTree.contains(3); // false
mapTree.lowerBound(3); // TreeNode which key is 4
mapTree.upperBound(4); // TreeNode which key is 5
mapTree.equalRange(5); // [ TreeNode which key is 5,  TreeNode which key is 6]

// Observers
mapTree.keyComp(); // (n1, n2) => n1 > n2
```

### **MultiMapTree**
```javascript
const std = require('./src');

// same methods with MapTree
const multiMapTree = new std.MultiMapTree();
multiMapTree.insert(3, 7);
multiMapTree.insert(3, 'abc');
multiMapTree.insert(3, [1, 3]);

const range = multiMapTree.equalRange(3);
for (let itr = range[0]; itr !== range[1]; itr = itr.getNext()) {
  console.log(itr.getKey(), itr.getValue()); // random sequence emergence (3, 7) , (3, 'abc') , (3, [1, 3])
}

multiMapTree.assign(3, 'all change');
console.log([...multiMapTree]) // [[3, 'all change'], [3, 'all change'], [3, 'all change']]
```