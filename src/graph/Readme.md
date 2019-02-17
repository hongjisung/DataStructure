## **Graph [Symbol.Iterator]**
### There are three type of iterator  
### **1. 'bfs'**  
- basic iterator
- Breadth first search starting from this._iterStart
### **2. 'dfs'**
- Depth first search starting from this._iterStart
### **3. 'dijkstra'**
- Dijkstra search by starting from this._iterStart
- the weight is added by this._weightAddFunc.
- the weight of route is compared by this._weightCompFunc

### **setIterType**
By 'setIterType' method, you can set iterator type.
```
directedGraph = new DirectedGraph(['1', '2', '3', '4', '5', '6'],
      [['1', '2', 1], ['2', '3', 2], ['4', '2', 1], ['2', '6', 5], ['4', '5', 2],
        ['6', '5', 4], ['5', '3', 2], ['3', '6', 2]]);
directedGraph.setIterType('dijkstra');
[...directedGraph]
directedGraph.setIterType('dfs');
[...directedGraph]
directedGraph.setIterType('bfs');
[...directedGraph]
```

### **setIterStart**
Determine where to start iterator.  
Parameter is start node.
```
directedGraph.setIterStart('1');
[...directedGraph]

directedGraph.setIterType('dijkstra');
directedGraph.setIterStart('4');
[...directedGraph]
```

### **setWeightAddFunc, setWeightCompFunc**
For 'dijkstra' search, set the way to add weight and compare weight.