/*
undirected graph based on adjacency list concept
Object(node : Object(next node : weight)) structure
{n1: {n2: w2, n3: w3}, n2: {n3: w23}, n3: {n1: w31}}
Object를 기반으로 하기 때문에 node는 모두 string타입이어야 한다.

Class UndirectedGraph
method:
  constructor // node set과 edge set을 받는다.

  // iterator?
  breadthFirstVisitor
  depthFirstVisitor
  dijkstraVisitor
  [Symbol.iterator]

  // Capacity
  nodeSize
  edgeSize

  // Element Access
  getNodes
  getEdges
  getWeight

  // modifiers
  setIterType
  setIterStart
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
  disjointSet // find disjoint set
*/

const Queue = require('../../src/containers/queue');
const Stack = require('../../src/containers/stack');
const PriorityQueue = require('../../src/containers/priorityQueue');

/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * @classdesc undirected graph based on adjacent list concept.<br>
 * the graph structure edge is made by basic Object, whick is key - value mapping class.<br>
 * one example is like {n1: {n2: w12, n3: w13}, n2: {n3: w23}, n3: {n1: w31}};
 * @version v1.0
 */
class UndirectedGraph {
  /**
   * Create undirected graph.<br>
   * If it is not given any parameter, empty graph.<br>
   * when otherGraph parameter are given, this deepcopy otherGraph.<br>
   * If node, edge are given, it made graph by given params.
   * @param {null|Array} node - array of string because Object key is string value.
   * @param {null|Array} edge - array of [startnode : string, endnode : string, weight], w can be omitted.
   * @param {null|DirectedGraph} otherGraph - other DirectedGraph object.
   */
  constructor(node = null, edge = null, otherGraph = null) {
    /**
     * node and edge are represented by this variable.
     * @type {object}
     * @private
     */
    this._graph = {};
    /**
     * the number of node.
     * @type {number}
     * @private
     */
    this._nodeSize = 0;
    /**
     * the number of edge.
     * @type {number}
     * @private
     */
    this._edgeSize = 0;
    /**
     * the type of iterator.<br>
     * it is used to [Symbol.iterator]()
     * @type {string} - 'bfs' or 'dfs' or 'dijkstra'
     * @private
     */
    this._iterType = 'bfs';
    /**
     * the start node of iterator.<br>
     * it is used to [Symbol.iterator]()
     * @type {string} - node name
     * @private
     */
    this._iterStart = '';
    /**
     * add two weight
     * @type {function}
     * @private
     * @param {*} n1 - weight
     * @param {*} n2 - weight
     * @returns {*} - weight of add n1, n2
     */
    this._weightAddFunc = (n1, n2) => n1 + n2;
    /**
     * compare two weight<br>
     * If this is used for dijkstra, the result is true when n2 is semantically smaller than n1.
     * @type {function}
     * @private
     * @param {*} n1 - weight
     * @param {*} n2 - weight
     * @returns {boolean}
     */
    this._weightCompFunc = (n1, n2) => n1 > n2;

    // get other DirectedGraph
    if (otherGraph instanceof UndirectedGraph) {
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
            this._graph[end][start] = null;
          } else {
            this._graph[start][end] = weight;
            this._graph[end][start] = weight;
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
            this._graph[end][start] = null;
          } else {
            this._graph[start][end] = weight;
            this._graph[end][start] = weight;
          }
          this._edgeSize += 1;
        });
      }
    }
  }

  // iterator
  /**
   * the iterator of graph.<br>
   * this has three type of iterating which is decided by this._iterType.<br>
   * 1. this._iterType is 'dfs'<br>
   *   depth first search by starting from this._iterStart.
   * 2. this._iterType is 'dijkstra'<br>
   *   dijkstra search by starting from this._iterStart.<br>
   *   the weight is added by this._weightAddFunc.<br>
   *   the weight of route is compared by this._weightCompFunc.<br>
   * 3. else<br>
   *   breadth first search by starting from thie._iterStart.
   */
  [Symbol.iterator]() {
    let iterator = {};
    // dijkstraVisitor
    if (this._iterType === 'dijkstra') {
      const nodes = Object.keys(this._graph);
      const graph = this._graph;
      const start = this._iterStart;
      const add = this._weightAddFunc;
      const comp = (n1, n2) => this._weightCompFunc(n1[1], n2[1]);
      const visited = {};
      nodes.forEach((val) => { visited[val] = false; });

      let node = null;
      const pq = new PriorityQueue(comp);
      iterator = {
        next() {
          // initiate iterating
          if (node === null) {
            node = [start, 0];
            visited[node[0]] = true;
            Object.keys(graph[node[0]]).forEach((val) => {
              if (!visited[val]) {
                pq.push([val, graph[node[0]][val]]);
              }
            });
            return { value: node[0], done: false };
          }
          // check priority queue empty
          if (pq.size() === 0) {
            return { value: undefined, done: true };
          }

          // get next node
          node = pq.top();
          pq.pop();
          // if node is found one, get next node until not finding one came out.
          while (visited[node[0]]) {
            if (pq.size() === 0) {
              return { value: undefined, done: true };
            }
            node = pq.top();
            pq.pop();
          }

          visited[node[0]] = true;
          Object.keys(graph[node[0]]).forEach((val) => {
            if (!visited[val]) {
              pq.push([val, add(node[1], graph[node[0]][val])]);
            }
          });
          return { value: node[0], done: false };
        },
      };
    } else if (this._iterType === 'dfs') {
    // depthFirstVisitor
      const nodes = Object.keys(this._graph);
      const graph = this._graph;
      const start = this._iterStart;
      const visited = {};
      nodes.forEach((val) => { visited[val] = false; });

      let node = null;
      const stack = new Stack();
      iterator = {
        next() {
          if (node === null) {
            node = start;
            visited[node] = true;
            Object.keys(graph[node]).forEach((val) => {
              if (!visited[val]) {
                stack.push(val);
              }
            });
            return { value: node, done: false };
          }

          node = stack.top();
          stack.pop();
          while (visited[node]) {
            node = stack.top();
            stack.pop();
          }
          visited[node] = true;
          if (node === false) {
            return { value: undefined, done: true };
          }

          Object.keys(graph[node]).forEach((val) => {
            if (!visited[val]) {
              stack.push(val);
            }
          });
          return { value: node, done: false };
        },
      };
    } else {
      // breadthFirstVisitor
      const nodes = Object.keys(this._graph);
      const graph = this._graph;
      const start = this._iterStart;
      const visited = {};
      nodes.forEach((val) => { visited[val] = false; });

      let node = null;
      const queue = new Queue();
      iterator = {
        next() {
          if (node === null) {
            node = start;
            visited[node] = true;
            Object.keys(graph[node]).forEach((val) => {
              if (!visited[val]) {
                queue.push(val);
              }
            });
            return { value: node, done: false };
          }

          node = queue.front();
          queue.pop();
          while (visited[node]) {
            node = queue.front();
            queue.pop();
          }
          visited[node] = true;
          if (node === false) {
            return { value: undefined, done: true };
          }

          Object.keys(graph[node]).forEach((val) => {
            if (!visited[val]) {
              queue.push(val);
            }
          });
          return { value: node, done: false };
        },
      };
    }
    return iterator;
  }

  // Capacity
  /**
   * return the number of node.
   * @returns {number} - the number of node.
   */
  nodeSize() {
    return this._nodeSize;
  }

  /**
   * return the number of edge.
   * @returns {number} - the number of edge.
   */
  edgeSize() {
    return this._edgeSize;
  }

  // Element Access
  /**
   * Get every node of graph by array.
   * @returns {array} - nodes of graph.
   */
  getNodes() {
    return Object.keys(this._graph);
  }

  /**
   * Get every edge of graph by array.
   * @returns {array} - edges of graph. [[startnode,endnode,weight],...] structure.
   */
  getEdges() {
    const edges = [];
    const found = {};
    Object.keys(this._graph).forEach((val) => {
      Object.keys(this._graph[val]).forEach((val2) => {
        if (found[val.concat('  ').concat(val2)] === undefined) {
          edges.push([val, val2, this._graph[val][val2]]);
          found[val2.concat('  ').concat(val)] = true;
        }
      });
    });
    return edges;
  }

  /**
   * Get weight of a edge.
   * @param {string} startNode - edge start node.
   * @param {string} endNode - edge end node.
   * @returns {*} - weight of the edge.
   */
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
  /**
   * Set iterator type.<br>
   * 'dfs', 'bfs' or 'dijkstra'
   * @param {string} type - iterator type.
   */
  setIterType(type) {
    this._iterType = type;
  }

  /**
   * Set where to start iterating.
   * @param {string} node - start node.
   */
  setIterStart(node) {
    this._iterStart = node;
  }

  /**
   * Set weight add function.
   * @param {function} func - add two weight.
   */
  setWeightAddFunc(func) {
    this._weightAddFunc = func;
  }

  /**
   * Set weight compare function.
   * @param {function} func - compare two weight.
   */
  setWeightCompFunc(func) {
    this._weightCompFunc = func;
  }

  /**
   * Change the weight of a edge.
   * @param {string} startNode - edge start node.
   * @param {string} endNode - edge end node.
   * @param {string} newWeight - new weight of edge.
   * @returns {boolean} - if edge doesn't exist, return false.
   */
  setWeight(startNode = null, endNode = null, newWeight = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] === undefined) {
      return false;
    }
    this._graph[startNode][endNode] = newWeight;
    this._graph[endNode][startNode] = newWeight;
    return true;
  }

  /**
   * Change all the edge by given function.<br>
   * the function parameter are three, startnode name, endnode name, weight of edge.
   * @param {function} func - change edge.
   * @returns {boolean} false if given param is not a function.
   */
  mapWeight(func = null) {
    if (typeof func !== 'function') {
      return false;
    }
    Object.keys(this._graph).forEach((val) => {
      Object.keys(this._graph[val]).forEach((val2) => {
        const newWeight = func(val, val2, this._graph[val][val2]);
        this._graph[val][val2] = newWeight;
        this._graph[val2][val] = newWeight;
      });
    });
    return true;
  }

  /**
   * erase a node.<br>
   * all edges relative to node are also erased.
   * @param {string} node - node name
   * @returns {boolean} - false if node is not exist.
   */
  eraseNode(node = null) {
    if (this._graph[node] === undefined) {
      return false;
    }
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

  /**
   * erase a edge
   * @param {string} startNode
   * @param {string} endNode
   * @returns {boolean} false if edge is not exist.
   */
  eraseEdge(startNode = null, endNode = null) {
    if (this._graph[startNode] === undefined) {
      return false;
    }
    if (this._graph[startNode][endNode] === undefined) {
      return false;
    }
    delete this._graph[startNode][endNode];
    delete this._graph[endNode][startNode];
    this._edgeSize -= 1;
    return true;
  }

  /**
   * insert a node.
   * @param {string} node
   * @returns {boolean} false if node is already exist.
   */
  insertNode(node = null) {
    if (this._graph[node] !== undefined) {
      return false;
    }
    this._graph[node] = {};
    this._nodeSize += 1;
    return true;
  }

  /**
   * insert a edge.
   * @param {string} startNode
   * @param {string} endNode
   * @param {*} weight
   * @returns {boolean} false if nodes are not exist or edge is already exist.
   */
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
    this._graph[endNode][startNode] = weight;
    this._edgeSize += 1;
    return true;
  }

  // lookup
  /**
   * check there is a cycle in the graph.
   * @returns {boolean} - whether a cycle is in or not.
   */
  isCycle() {
    const nodes = this.getNodes();
    const visited = {};
    const uppernode = {};
    nodes.forEach((val) => { visited[val] = false; });
    nodes.forEach((val) => { uppernode[val] = false; });
    let result = false;
    for (let i = 0; i < nodes.length; i += 1) {
      if (visited[nodes[i]] === false) {
        result = !this._dfsIsTree(nodes[i], visited, uppernode);
      }
      if (result) {
        break;
      }
    }
    return result;
  }

  /**
   * check whether the graph is tree or not.
   * @returns {boolean} - whether the graph is tree or not.
   */
  isTree() {
    if (this._nodeSize - 1 !== this._edgeSize) {
      return false;
    }
    const nodes = this.getNodes();
    const visited = {};
    const uppernode = {};
    nodes.forEach((val) => { visited[val] = false; });
    nodes.forEach((val) => { uppernode[val] = false; });
    let result = this._dfsIsTree(nodes[0], visited, uppernode);
    if (result === false) {
      return false;
    }
    Object.values(visited).forEach((val) => {
      if (!val) {
        result = val;
      }
    });
    return result;
  }

  /**
   * check whether negative edge exists.<br>
   * this can get function parameter to decide the result of arbitrary weight.
   * @param {function} func - return true if weight is semantically negative.
   * @returns {boolean} - true if negative weight exists.
   */
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

  /**
   * check the weight of every edge in graph is equal.<br>
   * @returns {boolean} - whether edges are same or not.
   */
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
  /**
   * find the disjoint sets in graph.<br>
   * In a disjoinset, all nodes in set can travel to others.
   * @returns {Array} - an array of disjoint set node array. [[n1, n2, n3], [n4, n5], ...]
   */
  disjointSet() {
    const nodes = this.getNodes();
    const visited = {};
    nodes.forEach((val) => { visited[val] = false; });
    const result = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (visited[nodes[i]] === false) {
        result.push(this._dfsDisjointSet(nodes[i], visited));
      }
    }
    return result;
  }

  // private method
  /**
   * check whether the found nodes starting from given node is tree.
   * @param {string} node - start node.
   * @param {Object} visited
   * @param {Object} uppernode - mark the parent node of a node.
   * @returns {boolean}
   * @private
   */
  _dfsIsTree(node, visited, uppernode) {
    const stack = new Stack();
    let result = true;
    stack.push(node);

    let now;
    while (!stack.empty()) {
      now = stack.top();
      stack.pop();
      if (visited[now]) {
        result = false;
        break;
      }
      visited[now] = true;
      const keys = Object.keys(this._graph[now]);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (!visited[key]) {
          stack.push(key);
          uppernode[key] = now;
        } else if (uppernode[now] !== key) {
          result = false;
          break;
        }
      }
      if (!result) {
        break;
      }
    }
    return result;
  }

  /**
   * found nodes which can go from the given node.
   * @private
   * @param {*} node - start node.
   * @param {*} visited
   * @returns {array} - nodes which can go from the given node.
   */
  _dfsDisjointSet(node, visited) {
    const stack = new Stack();
    const result = [];
    stack.push(node);

    let now;
    while (!stack.empty()) {
      now = stack.top();
      stack.pop();
      if (!visited[now]) {
        visited[now] = true;
        result.push(now);

        const keys = Object.keys(this._graph[now]);
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          if (!visited[key]) {
            stack.push(key);
          }
        }
      }
    }
    return result;
  }
}

module.exports = UndirectedGraph;
