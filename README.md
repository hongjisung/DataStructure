# **Javascript Data Structure**
## Containers
- ### **List**  
  Doubly linked list.  
  
- ### **Stack**   
  Based on Array.  

- ### **Queue**  
  Based on circular array.     
  
- ### **Priority queue**
  Based on Array.  
  Sorted by Compare function basically descending order.  

- ### **Deque**    
  Deque extends Queue.  
  Based on circular array.  
  pop and push method are assumed as private.

- ### **SetTree**  
  Red black tree with unique value.   
  Identify key with data.  
  Sorted by Compare function basically descending order.

- ### **MapTree**  
  Red black tree with unique value.  
  key and data mapping structure.  
  Sorted by Compare function basically descending order.  
## Algorithms
- ### **MergeSort**
  Sort iterable object in O(nlogn) times.
  Sorting time almost similar in most cases.

- ### **QuickSort**
  Sort iterable object in average O(nlogn) times.
  Sorting time is not stable.

# Usage
## Containers
### List
```javascript
const List = require('./src/containers/list');

// constructor
const list = new List();
const list2 = new List([1, 2]);
const list3 = new List([1, 5, 3, 4, 2]);

// modifiers
list.pushBack(2);
list.pushFront(1); // [1,2]
list.popBack(); // [2]
list.popBack(1); // [2, 1]

// iterators
for (let itr = list.begin(); itr !== list.end(); itr = itr.getNext()) {
  console.log(itr.getData()); // 1, 1, 2
}

[...list] // [1, 1, 2]

// operations
list.compare(list2) // false
list3.sort(); // [5, 4, 3, 2, 1]
list3.sort((n1, n2) => n1 > n2, 'mergesort') // [1, 2, 3, 4, 5]
list3.reverse(); // [5, 4, 3, 2, 1]
```

### Stack
```javascript
const Stack = require('./src/containers/stack');

// constructor
let stack = new stack();
stack = new Stack([1, 5, 3]);

// element access
stack.top(); // 3

// capacity
stack.empty(); // false
stack.size(); // 3

// modifiers
stack.pop(); // [1, 5]
stap.push(10); // [1, 5, 10]
```

### Queue
```javascript
const Queue = require('./src/containers/queue');

// constructor
let queue = new Queue();
queue = new Queue([1, 3, 5]);

// element access
queue.front() // 1
queue.back() // 5

// modifiers
queue.pop() // [3, 5]
queue.push(7) // [3, 5, 7]
queue.clear() // []
```

### Priority Queue
```javascript
const PriorityQueue = require('./src/containers/priorityQueue');

// constructor
let pq = new PriorityQueue();
pq = new PriorityQueue((n1, n2) => n1 > n2);

// modifiers
[7, 3, 5, 1, 9].forEach(val => pq.push(val)); // [1, 3, 5, 7, 9]
pq.pop(); // [3, 5, 7, 9]

// element access
pq.top(); // 3
pq.compareFunction() // (n1, n2) => n1 > n2
```

### Deque
```javascript
const Deque = require('./src/containers/deque');

// constructor
let deque = new Deque();
deque = new Deque([1, 2, 3]);

// element access
deque.front(); // 1
deque.back(); // 3

// modifiers
deque.popBack(); // [1, 2]
deque.pushFront(4); // [4, 1, 2]
```

### SetTree
```javascript
const SetTree = require('./src/containers/setTree');

// constructor
let setTree = new SetTree();
const st = new SetTree((n1, n2) => n1 > n2); // ascending
[5, 3, 4, 1, 2].forEach(val => st.insert(val)); // [1, 2, 3, 4, 5]
setTree = new SetTree(st);

// iterator
console.log([...setTree]); // [1, 2, 3, 4, 5]
for (let itr = setTree.begin(); itr !== setTree.end(); itr = itr.getNext()) {
  console.log(itr.getKey()); // 1, 2, 3, 4, 5
}
for (let itr = setTree.rbegin(); itr !== setTree.end(); itr = itr.getPrev()) {
  console.log(itr.getKey()); // 5, 4, 3, 2, 1
}

// modifiers
setTree.insert(3); // false
setTree.insert(6); // true, [1, 2, 3, 4, 5, 6]
setTree.erase(3); // return TreeNode which key is 4
mapTree.erase(3); // false;

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

### MapTree
```javascript
const MapTree = require('./src/containers/mapTree');

// constructor
let mapTree = new MapTree();
const mt = new MapTree((n1, n2) => n1 > n2); // ascending
[[5, 'a'], [3, 'b'], [4, 'c'], [1, 'd'], [2, 'e']].forEach(val => mt.insert(val[0], val[1])); // [[1, 'd'], [2, 'e'], [3, 'b'], [4, 'c'], [5, 'a']]
mapTree = new MapTree(mt);

// iterator
console.log([...mapTree]); // [[1, 'd'], [2, 'e'], [3, 'b'], [4, 'c'], [5, 'a']]
for (let itr = mapTree.begin(); itr !== mapTree.end(); itr = itr.getNext()) {
  console.log(itr.getKey()); // 1, 2, 3, 4, 5
}
for (let itr = mapTree.rbegin(); itr !== mapTree.end(); itr = itr.getPrev()) {
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

## Algorithms
### Merge Sort
```javascript
const mergesort = require('./src/algorithms/mergeSort');
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

### Quick Sort
```javascript
const quicksort = require('./src/algorithms/quickSort');
const List = require('./src/containers/list');

const li = new List();
for (let i = 0; i < 10; i += 1) {
  li.pushBack(Math.floor(Math.random()*100))
}
const b = quicksort(li); // sorted Array object
```

# Jsdoc  
docdash

# Eslint
airbnb

# Test
Mocha