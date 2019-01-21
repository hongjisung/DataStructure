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
