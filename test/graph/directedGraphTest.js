const assert = require('assert');
const DirectedGraph = require('../../src/graph/directedGraph');
const mergesort = require('../../src/algorithms/mergeSort');

/* global describe it beforeEach */
describe('DirectedGraph Test', () => {
  let directedGraph = new DirectedGraph();

  beforeEach('Initiate directed graph', () => { directedGraph = new DirectedGraph(); });

  it('constructor test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.nodeSize(), 4);
    assert.strictEqual(directedGraph.edgeSize(), 3);
    assert.strictEqual(directedGraph.getWeight('1', '2'), null);
    assert.strictEqual(directedGraph.getWeight('4', '2'), null);
    assert.strictEqual(directedGraph.getWeight('2', '4'), false);
    assert.strictEqual(directedGraph.getWeight('5', '1'), false);

    const dg2 = new DirectedGraph(null, null, directedGraph);
    assert.strictEqual(dg2.nodeSize(), 4);
    assert.strictEqual(dg2.edgeSize(), 3);
    assert.strictEqual(dg2.getWeight('1', '2'), null);
    assert.strictEqual(dg2.getWeight('4', '2'), null);
    assert.strictEqual(dg2.getWeight('2', '4'), false);
    assert.strictEqual(dg2.getWeight('5', '1'), false);
  });

  it('[Symbol.iterator] test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4', '5', '6'],
      [['1', '2'], ['2', '3'], ['4', '2'], ['2', '6'], ['4', '5'],
        ['6', '5'], ['5', '3'], ['3', '6']]);
    // basic breadth first search
    directedGraph.setIterStart('1');
    console.log([...directedGraph]);
    directedGraph.setIterStart('4');
    console.log([...directedGraph]);
    // depth first search
    directedGraph.setIterType('dfs');
    console.log([...directedGraph]);
    directedGraph.setIterStart('1');
    console.log([...directedGraph]);


    directedGraph = new DirectedGraph(['1', '2', '3', '4', '5', '6'],
      [['1', '2', 1], ['2', '3', 2], ['4', '2', 1], ['2', '6', 5], ['4', '5', 2],
        ['6', '5', 4], ['5', '3', 2], ['3', '6', 2]]);
    directedGraph.setIterType('dijkstra');
    directedGraph.setIterStart('4');
    assert.deepEqual([...directedGraph], ['4', '2', '5', '3', '6']);
  });

  it('nodeSize() test', () => {
    assert.strictEqual(directedGraph.nodeSize(), 0);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.nodeSize(), 4);
    directedGraph.insertNode('5');
    assert.strictEqual(directedGraph.nodeSize(), 5);
    directedGraph.eraseNode('5');
    assert.strictEqual(directedGraph.nodeSize(), 4);
    directedGraph.eraseNode('2');
    assert.strictEqual(directedGraph.nodeSize(), 3);
  });

  it('edgeSize() test', () => {
    assert.strictEqual(directedGraph.edgeSize(), 0);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.edgeSize(), 3);
    directedGraph.insertNode('5');
    directedGraph.insertEdge('5', '1');
    directedGraph.insertEdge('5', '3');
    directedGraph.insertEdge('4', '5');
    assert.strictEqual(directedGraph.edgeSize(), 6);
    directedGraph.eraseNode('5');
    assert.strictEqual(directedGraph.edgeSize(), 3);
    directedGraph.eraseEdge('4', '2');
    assert.strictEqual(directedGraph.edgeSize(), 2);
    directedGraph.eraseNode('2');
    assert.strictEqual(directedGraph.edgeSize(), 0);
  });

  it('getNodes() test', () => {
    assert.deepEqual(directedGraph.getNodes(), []);
    let nodes = mergesort(['1', '2', '3', '4']);
    directedGraph = new DirectedGraph(nodes, [['1', '2'], ['2', '3'], ['4', '2']]);
    let dgnodes = mergesort(directedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
    directedGraph.eraseNode('3');
    nodes = mergesort(['1', '2', '4']);
    dgnodes = mergesort(directedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
    directedGraph.insertNode('5');
    directedGraph.insertNode('7');
    nodes = mergesort(['1', '2', '7', '5', '4']);
    dgnodes = mergesort(directedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
  });

  it('getEdges() test', () => {
    const cmpEdge = (e1, e2) => {
      if (e1[0] < e2[0]) {
        return true;
      }
      if (e1[0] === e2[0] && e1[1] < e2[1]) {
        return true;
      }
      return false;
    };

    assert.deepEqual(directedGraph.getEdges(), []);
    let edges = mergesort([['1', '2'], ['2', '3'], ['4', '2']], cmpEdge);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], edges);
    let dgedges = mergesort(directedGraph.getEdges(), cmpEdge);
    for (let i = 0; i < edges.length; i += 1) {
      assert.deepEqual(edges[i][0], dgedges[i][0]);
      assert.deepEqual(edges[i][1], dgedges[i][1]);
    }

    directedGraph.insertEdge('3', '4');
    directedGraph.insertEdge('4', '1');
    directedGraph.insertEdge('3', '1');
    edges = mergesort([['1', '2'], ['2', '3'], ['4', '2'], ['3', '4'], ['4', '1'], ['3', '1']], cmpEdge);
    dgedges = mergesort(directedGraph.getEdges(), cmpEdge);
    for (let i = 0; i < edges.length; i += 1) {
      assert.deepEqual(edges[i][0], dgedges[i][0]);
      assert.deepEqual(edges[i][1], dgedges[i][1]);
    }

    directedGraph.eraseEdge('3', '4');
    edges = mergesort([['1', '2'], ['2', '3'], ['4', '2'], ['4', '1'], ['3', '1']], cmpEdge);
    dgedges = mergesort(directedGraph.getEdges(), cmpEdge);
    for (let i = 0; i < edges.length; i += 1) {
      assert.deepEqual(edges[i][0], dgedges[i][0]);
      assert.deepEqual(edges[i][1], dgedges[i][1]);
    }

    directedGraph.eraseNode('2');
    edges = mergesort([['4', '1'], ['3', '1']], cmpEdge);
    dgedges = mergesort(directedGraph.getEdges(), cmpEdge);
    for (let i = 0; i < edges.length; i += 1) {
      assert.deepEqual(edges[i][0], dgedges[i][0]);
      assert.deepEqual(edges[i][1], dgedges[i][1]);
    }
  });

  it('getWeight() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.getWeight('1', '2'), null);
    assert.strictEqual(directedGraph.getWeight('5', '1'), false);
    assert.strictEqual(directedGraph.getWeight('2', '3'), null);

    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2', 10], ['2', '3', 7], ['4', '2', -5]]);
    assert.strictEqual(directedGraph.getWeight('1', '2'), 10);
    assert.strictEqual(directedGraph.getWeight('5', '1'), false);
    assert.strictEqual(directedGraph.getWeight('2', '3'), 7);
    assert.strictEqual(directedGraph.getWeight('4', '2'), -5);
  });

  it('setWeight() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.setWeight('1', '3', 5), false);
    assert.strictEqual(directedGraph.setWeight('4', '2', 10), true);
    assert.strictEqual(directedGraph.getWeight('4', '2'), 10);
    directedGraph.insertEdge('1', '3');
    assert.strictEqual(directedGraph.setWeight('1', '3', 5), true);
    assert.strictEqual(directedGraph.getWeight('1', '3'), 5);
  });

  it('mapWeight() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    directedGraph.mapWeight((start, end, weight, mul = 2) => mul * Number(start) * Number(end));
    assert.strictEqual(directedGraph.getWeight('1', '2'), 4);
    assert.strictEqual(directedGraph.getWeight('2', '3'), 12);
    assert.strictEqual(directedGraph.getWeight('4', '2'), 16);
  });

  it('eraseNode() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.eraseNode('10'), false);
    directedGraph.eraseNode('2');
    assert.strictEqual(directedGraph.eraseNode('2'), false);
    assert.strictEqual(directedGraph.getWeight('1', '2'), false);
    assert.strictEqual(directedGraph.getWeight('2', '3'), false);
    assert.strictEqual(directedGraph.getWeight('4', '2'), false);
    assert.strictEqual(directedGraph.getNodes().includes('2'), false);
    assert.strictEqual(directedGraph.getEdges().length, 0);
    directedGraph.eraseNode('1');
    directedGraph.eraseNode('3');
    assert.strictEqual(directedGraph.getNodes().length, 1);
    assert.strictEqual(directedGraph.eraseNode('5'), false);
  });

  it('eraseEdge() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    directedGraph.eraseEdge('1', '2');
    directedGraph.eraseEdge('2', '3');
    assert.strictEqual(directedGraph.getWeight('1', '2'), false);
    assert.strictEqual(directedGraph.getWeight('2', '3'), false);
    assert.strictEqual(directedGraph.getWeight('4', '2'), null);
    assert.strictEqual(directedGraph.eraseEdge('3', '1'), false);
    assert.strictEqual(directedGraph.eraseEdge('1', '2'), false);
  });

  it('insertNode() test', () => {
    assert.strictEqual(directedGraph.insertNode('1'), true);
    assert.strictEqual(directedGraph.insertNode('2'), true);
    assert.strictEqual(directedGraph.insertNode('3'), true);
    assert.strictEqual(directedGraph.insertNode('2'), false);
  });

  it('insertEdge() test', () => {
    assert.strictEqual(directedGraph.insertEdge('1', '3'), false);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.insertEdge('1', '2'), false);
    assert.strictEqual(directedGraph.insertEdge('3', '2'), true);
    assert.strictEqual(directedGraph.getWeight('3', '2'), null);
    assert.strictEqual(directedGraph.insertEdge('6', '10'), false);
    directedGraph.insertNode('6');
    assert.strictEqual(directedGraph.insertEdge('6', '3'), true);
  });

  it('isCycle() test', () => {
    assert.strictEqual(directedGraph.isCycle(), false);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.isCycle(), false);
    directedGraph.insertEdge('3', '1');
    assert.strictEqual(directedGraph.isCycle(), true);
    directedGraph.eraseEdge('3', '1');
    directedGraph.insertEdge('2', '4');
    assert.strictEqual(directedGraph.isCycle(), true);
    directedGraph.eraseEdge('2', '4');
    directedGraph.insertEdge('3', '4');
    assert.strictEqual(directedGraph.isCycle(), true);
    directedGraph.eraseEdge('3', '4');
    directedGraph.insertEdge('4', '3');
    assert.strictEqual(directedGraph.isCycle(), false);
  });

  it('isTree() test', () => {
    assert.strictEqual(directedGraph.isTree(), false);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.isTree(), false);
    directedGraph.eraseEdge('4', '2');
    directedGraph.insertEdge('2', '4');
    assert.strictEqual(directedGraph.isTree(), true);
    directedGraph.insertEdge('3', '2');
    assert.strictEqual(directedGraph.isTree(), false);
    directedGraph.eraseEdge('3', '2');
    directedGraph.eraseEdge('2', '3');
    assert.strictEqual(directedGraph.isTree(), false);
    directedGraph.insertEdge('3', '1');
    assert.strictEqual(directedGraph.isTree(), true);
  });

  it('isNegativeWeight() test', () => {
    assert.strictEqual(directedGraph.isNegativeWeight(), false);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.isNegativeWeight(), false);
    directedGraph.setWeight('4', '2', -10);
    assert.strictEqual(directedGraph.isNegativeWeight(), true);
    directedGraph.mapWeight((s, e, w) => Number(s) * Number(e));
    assert.strictEqual(directedGraph.isNegativeWeight(), false);
    directedGraph.mapWeight((s, e, w) => -1 * Number(s) * Number(e));
    assert.strictEqual(directedGraph.isNegativeWeight(), true);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2', 7], ['2', '3', -4], ['4', '2', 10]]);
    assert.strictEqual(directedGraph.isNegativeWeight(), true);
  });

  it('isAllWeightEqual() test', () => {
    assert.strictEqual(directedGraph.isAllWeightEqual(), true);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(directedGraph.isAllWeightEqual(), true);
    directedGraph.setWeight('2', '3', 10);
    assert.strictEqual(directedGraph.isAllWeightEqual(), false);
    directedGraph.setWeight('2', '3', null);
    assert.strictEqual(directedGraph.isAllWeightEqual(), true);
    directedGraph.mapWeight((s, e, w) => Number(s) * Number(e));
    assert.strictEqual(directedGraph.isAllWeightEqual(), false);
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2', 7], ['2', '3', -4], ['4', '2', 10]]);
    assert.strictEqual(directedGraph.isAllWeightEqual(), false);
  });

  it('reverse() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    directedGraph.reverse();
    assert.strictEqual(directedGraph.getWeight('1', '2'), false);
    assert.strictEqual(directedGraph.getWeight('2', '3'), false);
    assert.strictEqual(directedGraph.getWeight('4', '2'), false);
    assert.strictEqual(directedGraph.getWeight('2', '1'), null);
    assert.strictEqual(directedGraph.getWeight('3', '2'), null);
    assert.strictEqual(directedGraph.getWeight('2', '4'), null);
  });

  it('copy() test', () => {
    directedGraph = new DirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    const dg2 = directedGraph.copy();
    dg2.insertNode('5');
    dg2.insertEdge('5', '3');
    dg2.insertEdge('5', '2');
    assert.strictEqual(dg2.nodeSize(), 5);
    assert.strictEqual(dg2.edgeSize(), 5);
    assert.strictEqual(directedGraph.nodeSize(), 4);
    assert.strictEqual(directedGraph.edgeSize(), 3);
  });
});
