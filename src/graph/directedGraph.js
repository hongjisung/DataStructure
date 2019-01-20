/*
directed graph based on adjacency list concept
Object(node : Object(next node : weight)) structure
{n1: {n2: w2, n3: w3}, n2: {n3: w23}, n3: {n1: w31}}
Object를 기반으로 하기 때문에 node는 모두 string타입이어야 한다.

Class DirectedGraph
method:
  constructor // node set과 edge set을 받는다.

  // iterator?
  breadth first visitor
  depth first visitor
  dijkstra visitor

  // Capacity
  nodeSize
  edgeSize

  // Element Access
  getNodes
  getEdges
  getWeight

  // modifiers
  setWeight
  mapWeight // change weight
  eraseNode
  eraseEdge
  insertNode
  insertEdge

  // lookup
  isCycle // 사이클이 있는가 없는가 없으면 tree or forest
  isTree // 사이클이 없으면서 전체가 연결되어 있는가 (spanning tree)
  isNegativeWeight
  isAllWeightEqual

  // Operations
  reverse // change the edge's directions
*/

/* eslint no-param-reassign: ["error", { "props": false }] */
class DirectedGraph {
  constructor(node = null, edge = null, otherGraph = null) {
    this._graph = {};
    this._nodeSize = 0;
    this._edgeSize = 0;

    // get other DirectedGraph
    if (otherGraph instanceof DirectedGraph) {
      const ognode = otherGraph.getNodes();
      const ogedge = otherGraph.getEdges();
      // insert node
      if (ognode !== null && typeof ognode[Symbol.iterator] === 'function') {
        [...ognode].forEach((val) => {
          this._graph[val] = {};
          this._nodeSize += 1;
        });
      }
      // insert edge
      if (ogedge !== null && typeof ogedge[Symbol.iterator] === 'function') {
        [...ogedge].forEach((val) => {
          const [start, end, weight] = val;
          if (weight === undefined) {
            this._graph[start][end] = null;
          } else {
            this._graph[start][end] = weight;
          }
          this._edgeSize += 1;
        });
      }
    } else {
      // get nodes and edges

      // insert node
      if (node !== null && typeof node[Symbol.iterator] === 'function') {
        [...node].forEach((val) => {
          this._graph[val] = {};
          this._nodeSize += 1;
        });
      }
      // insert edge
      if (edge !== null && typeof edge[Symbol.iterator] === 'function') {
        [...edge].forEach((val) => {
          const [start, end, weight] = val;
          if (weight === undefined) {
            this._graph[start][end] = null;
          } else {
            this._graph[start][end] = weight;
          }
          this._edgeSize += 1;
        });
      }
    }
  }

  // iterator
  // breadthFirstVisitor
  // depthFirstVisitor
  // dijkstraVisitor

  // Capacity
  // nodeSize
  nodeSize() {
    return this._nodeSize;
  }

  // edgeSize
  edgeSize() {
    return this._edgeSize;
  }

  // Element Access
  // getNodes : get every node of graph
  getNodes() {
    return Object.keys(this._graph);
  }

  // getEdges : get every edge of graph
  getEdges() {
    const edges = [];
    Object.keys(this._graph).forEach((val) => {
      Object.keys(this._graph[val]).forEach((val2) => {
        edges.push([val, val2, this._graph[val][val2]]);
      });
    });
    return edges;
  }

  // getWeight : get the weight of a edge
  getWeight(startNode = null, endNode = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] === undefined) {
      return false;
    }
    return this._graph[startNode][endNode];
  }

  // modifiers
  // setWeight : change the weight of a edge
  setWeight(startNode = null, endNode = null, newWeight = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] === undefined) {
      return false;
    }
    this._graph[startNode][endNode] = newWeight;
    return true;
  }

  // mapWeight : change all weight by given function
  mapWeight(func = null) {
    if (typeof func !== 'function') {
      return false;
    }
    Object.keys(this._graph).forEach((val) => {
      Object.keys(this._graph[val]).forEach((val2) => {
        const newWeight = func(val, val2, this._graph[val][val2]);
        this._graph[val][val2] = newWeight;
      });
    });
    return true;
  }

  // eraseNode
  eraseNode(node = null) {
    if (this._graph[node] === undefined) {
      return false;
    }
    this._edgeSize -= Object.keys(this._graph[node]).length;
    delete this._graph[node];
    this._nodeSize -= 1;
    Object.keys(this._graph).forEach((val) => {
      if (this._graph[val][node] !== undefined) {
        delete this._graph[val][node];
        this._edgeSize -= 1;
      }
    });
    return true;
  }

  // eraseEdge
  eraseEdge(startNode = null, endNode = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] === undefined) {
      return false;
    }
    delete this._graph[startNode][endNode];
    this._edgeSize -= 1;
    return true;
  }

  // insertNode
  insertNode(node = null) {
    if (this._graph[node] !== undefined) {
      return false;
    }
    this._graph[node] = {};
    this._nodeSize += 1;
    return true;
  }

  // insertEdge
  insertEdge(startNode = null, endNode = null, weight = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[endNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] !== undefined) {
      return false;
    }
    this._graph[startNode][endNode] = weight;
    this._edgeSize += 1;
    return true;
  }

  // lookup
  // isCycle // 사이클이 있는가 없는가 없으면 tree or forest
  // https://www.geeksforgeeks.org/detect-cycle-in-a-graph/
  isCycle() {
    const nodes = Object.keys(this._graph);
    let iscycle = false;

    const visited = {};
    const dfsStack = {};
    nodes.forEach((val) => { visited[val] = false; });
    nodes.forEach((val) => { dfsStack[val] = false; });
    nodes.forEach((val) => {
      if (!iscycle && !visited[val] && this._dfsCycle(val, visited, dfsStack)) {
        iscycle = true;
      }
    });
    return iscycle;
  }

  // isTree // 사이클이 없으면서 전체가 연결되어 있는가 (spanning tree)
  isTree() {
    if (this._edgeSize !== this._nodeSize - 1) {
      return false;
    }

    const root = this._findroot();
    if (root === undefined) {
      return false;
    }

    const visited = {};
    const nodes = Object.keys(this._graph);
    nodes.forEach((val) => { visited[val] = false; });
    if (!this._dfsIsTree(root, visited)) {
      return !Object.values(visited).includes(false);
    }
    return false;
  }

  // isNegativeWeight
  isNegativeWeight(func = n => typeof n === 'number' && n < 0) {
    let isNegative = false;
    Object.values(this._graph).forEach((val) => {
      Object.values(val).forEach((val2) => {
        if (func(val2)) {
          isNegative = true;
        }
      });
    });
    return isNegative;
  }

  // isAllWeightEqual
  isAllWeightEqual() {
    let weight = null;
    let result = true;
    Object.values(this._graph).forEach((val) => {
      Object.values(val).forEach((val2) => {
        if (weight === null) {
          weight = val2;
        } else if (weight !== val2) {
          result = false;
        }
      });
    });
    return result;
  }

  // Operations
  // reverse
  reverse() {
    const newgraph = {};
    Object.keys(this._graph).forEach((val) => { newgraph[val] = {}; });
    Object.keys(this._graph).forEach((val) => {
      Object.keys(this._graph[val]).forEach((val2) => {
        newgraph[val2][val] = this._graph[val][val2];
      });
    });
    this._graph = newgraph;
  }

  _dfsCycle(node, visited, dfsStack) {
    visited[node] = true;
    dfsStack[node] = true;
    let iscycle = false;

    Object.keys(this._graph[node]).forEach((val) => {
      if (iscycle) {
        return;
      }
      if (dfsStack[val] === true) {
        iscycle = true;
        return;
      }
      if (!visited[val] && this._dfsCycle(val, visited, dfsStack)) {
        iscycle = true;
      }
    });
    dfsStack[node] = false;
    return iscycle;
  }

  _findroot() {
    const nodes = Object.keys(this._graph);
    const lookat = {};
    nodes.forEach((val) => { lookat[val] = true; });
    Object.values(this._graph).forEach((val) => {
      Object.keys(val).forEach((val2) => {
        delete lookat[val2];
      });
    });
    return Object.keys(lookat)[0];
  }

  _dfsIsTree(node, visited) {
    visited[node] = true;
    let iscycle = false;
    Object.keys(this._graph[node]).forEach((val) => {
      if (iscycle) {
        return;
      }
      if (visited[val]) {
        iscycle = true;
        return;
      }
      iscycle = this._dfsIsTree(val, visited);
    });
    return iscycle;
  }
}

module.exports = DirectedGraph;
