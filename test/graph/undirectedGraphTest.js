const assert = require('assert');
const UndirectedGraph = require('../../src/graph/undirectedGraph');
const mergesort = require('../../src/algorithms/mergeSort');

/* global describe it beforeEach */
describe('UndirectedGraph Test', () => {
  let undirectedGraph = new UndirectedGraph();

  beforeEach('Initiate directed graph', () => { undirectedGraph = new UndirectedGraph(); });

  it('constructor test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.nodeSize(), 4);
    assert.strictEqual(undirectedGraph.edgeSize(), 3);
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), null);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), null);
    assert.strictEqual(undirectedGraph.getWeight('2', '4'), null);
    assert.strictEqual(undirectedGraph.getWeight('5', '1'), false);

    const dg2 = new UndirectedGraph(null, null, undirectedGraph);
    assert.strictEqual(dg2.nodeSize(), 4);
    assert.strictEqual(dg2.edgeSize(), 3);
    assert.strictEqual(dg2.getWeight('1', '2'), null);
    assert.strictEqual(dg2.getWeight('4', '2'), null);
    assert.strictEqual(dg2.getWeight('2', '4'), null);
    assert.strictEqual(dg2.getWeight('5', '1'), false);
  });

  it('[Symbol.iterator] test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4', '5', '6'],
      [['1', '2'], ['2', '3'], ['4', '2'], ['2', '6'], ['4', '5'],
        ['6', '5'], ['5', '3'], ['3', '6']]);
    // basic breadth first search
    undirectedGraph.setIterStart('1');
    console.log([...undirectedGraph]); // 1 2 (3 4 6) 5
    undirectedGraph.setIterStart('4');
    console.log([...undirectedGraph]); // 4 2 5 1 3 6
    // depth first search
    undirectedGraph.setIterType('dfs');
    console.log([...undirectedGraph]); // 4 5 6 3 2 1
    undirectedGraph.setIterStart('1');
    console.log([...undirectedGraph]); // 1 2 6 5 4 3


    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4', '5', '6'],
      [['1', '2', 1], ['2', '3', 2], ['4', '2', 1], ['2', '6', 5], ['4', '5', 2],
        ['6', '5', 4], ['5', '3', 2], ['3', '6', 2]]);
    undirectedGraph.setIterType('dijkstra');
    undirectedGraph.setIterStart('4');
    assert.deepEqual([...undirectedGraph], ['4', '2', '5', '1', '3', '6']);
  });

  it('nodeSize() test', () => {
    assert.strictEqual(undirectedGraph.nodeSize(), 0);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.nodeSize(), 4);
    undirectedGraph.insertNode('5');
    assert.strictEqual(undirectedGraph.nodeSize(), 5);
    undirectedGraph.eraseNode('5');
    assert.strictEqual(undirectedGraph.nodeSize(), 4);
    undirectedGraph.eraseNode('2');
    assert.strictEqual(undirectedGraph.nodeSize(), 3);
  });

  it('edgeSize() test', () => {
    assert.strictEqual(undirectedGraph.edgeSize(), 0);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.edgeSize(), 3);
    undirectedGraph.insertNode('5');
    undirectedGraph.insertEdge('5', '1');
    undirectedGraph.insertEdge('5', '3');
    undirectedGraph.insertEdge('4', '5');
    assert.strictEqual(undirectedGraph.edgeSize(), 6);
    undirectedGraph.eraseNode('5');
    assert.strictEqual(undirectedGraph.edgeSize(), 3);
    undirectedGraph.eraseEdge('4', '2');
    assert.strictEqual(undirectedGraph.edgeSize(), 2);
    undirectedGraph.eraseNode('2');
    assert.strictEqual(undirectedGraph.edgeSize(), 0);
  });

  it('getNodes() test', () => {
    assert.deepEqual(undirectedGraph.getNodes(), []);
    let nodes = mergesort(['1', '2', '3', '4']);
    undirectedGraph = new UndirectedGraph(nodes, [['1', '2'], ['2', '3'], ['4', '2']]);
    let dgnodes = mergesort(undirectedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
    undirectedGraph.eraseNode('3');
    nodes = mergesort(['1', '2', '4']);
    dgnodes = mergesort(undirectedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
    undirectedGraph.insertNode('5');
    undirectedGraph.insertNode('7');
    nodes = mergesort(['1', '2', '4', '5', '7']);
    dgnodes = mergesort(undirectedGraph.getNodes());
    assert.deepEqual(dgnodes, nodes);
  });

  it('getEdges() test', () => {
    assert.deepEqual(undirectedGraph.getEdges(), []);

    let edges = [['1', '2'], ['2', '3'], ['4', '2']];
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], edges);
    let dgedges = undirectedGraph.getEdges();
    for (let i = 0; i < edges.length; i += 1) {
      let check = false;
      for (let j = 0; j < dgedges.length; j += 1) {
        if (edges[i][0] === dgedges[j][0] && edges[i][1] === dgedges[j][1]) {
          check = true;
        } else if (edges[i][0] === dgedges[j][1] && edges[i][1] === dgedges[j][0]) {
          check = true;
        }
      }
      assert.strictEqual(check, true);
    }

    undirectedGraph.insertEdge('3', '4');
    undirectedGraph.insertEdge('4', '1');
    undirectedGraph.insertEdge('3', '1');
    edges = [['1', '2'], ['2', '3'], ['2', '4'], ['3', '4'], ['1', '4'], ['1', '3']];
    dgedges = undirectedGraph.getEdges();
    for (let i = 0; i < edges.length; i += 1) {
      let check = false;
      for (let j = 0; j < dgedges.length; j += 1) {
        if (edges[i][0] === dgedges[j][0] && edges[i][1] === dgedges[j][1]) {
          check = true;
        } else if (edges[i][0] === dgedges[j][1] && edges[i][1] === dgedges[j][0]) {
          check = true;
        }
      }
      assert.strictEqual(check, true);
    }

    undirectedGraph.eraseEdge('3', '4');
    edges = [['1', '2'], ['2', '3'], ['2', '4'], ['1', '4'], ['1', '3']];
    dgedges = undirectedGraph.getEdges();
    for (let i = 0; i < edges.length; i += 1) {
      let check = false;
      for (let j = 0; j < dgedges.length; j += 1) {
        if (edges[i][0] === dgedges[j][0] && edges[i][1] === dgedges[j][1]) {
          check = true;
        } else if (edges[i][0] === dgedges[j][1] && edges[i][1] === dgedges[j][0]) {
          check = true;
        }
      }
      assert.strictEqual(check, true);
    }

    undirectedGraph.eraseNode('2');
    edges = [['1', '4'], ['1', '3']];
    dgedges = undirectedGraph.getEdges();
    for (let i = 0; i < edges.length; i += 1) {
      let check = false;
      for (let j = 0; j < dgedges.length; j += 1) {
        if (edges[i][0] === dgedges[j][0] && edges[i][1] === dgedges[j][1]) {
          check = true;
        } else if (edges[i][0] === dgedges[j][1] && edges[i][1] === dgedges[j][0]) {
          check = true;
        }
      }
      assert.strictEqual(check, true);
    }
  });

  it('getWeight() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), null);
    assert.strictEqual(undirectedGraph.getWeight('5', '1'), false);
    assert.strictEqual(undirectedGraph.getWeight('3', '2'), null);

    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2', 10], ['2', '3', 7], ['4', '2', -5]]);
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), 10);
    assert.strictEqual(undirectedGraph.getWeight('5', '1'), false);
    assert.strictEqual(undirectedGraph.getWeight('3', '2'), 7);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), -5);
  });

  it('setWeight() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.setWeight('1', '3', 5), false);
    assert.strictEqual(undirectedGraph.setWeight('2', '4', 10), true);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), 10);
    undirectedGraph.insertEdge('1', '3');
    assert.strictEqual(undirectedGraph.setWeight('1', '3', 5), true);
    assert.strictEqual(undirectedGraph.getWeight('3', '1'), 5);
  });

  it('mapWeight() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    undirectedGraph.mapWeight((start, end, weight) => Number(start) * Number(end));
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), 2);
    assert.strictEqual(undirectedGraph.getWeight('3', '2'), 6);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), 8);
  });

  it('eraseNode() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.eraseNode('10'), false);
    undirectedGraph.eraseNode('2');
    assert.strictEqual(undirectedGraph.eraseNode('2'), false);
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), false);
    assert.strictEqual(undirectedGraph.getWeight('2', '3'), false);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), false);
    assert.strictEqual(undirectedGraph.getNodes().includes('2'), false);
    assert.strictEqual(undirectedGraph.getEdges().length, 0);
    undirectedGraph.eraseNode('1');
    undirectedGraph.eraseNode('3');
    assert.strictEqual(undirectedGraph.getNodes().length, 1);
    assert.strictEqual(undirectedGraph.eraseNode('5'), false);
  });

  it('eraseEdge() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.eraseEdge('1', '2'), true);
    assert.strictEqual(undirectedGraph.eraseEdge('3', '2'), true);
    assert.strictEqual(undirectedGraph.getWeight('1', '2'), false);
    assert.strictEqual(undirectedGraph.getWeight('2', '3'), false);
    assert.strictEqual(undirectedGraph.getWeight('4', '2'), null);
    assert.strictEqual(undirectedGraph.eraseEdge('3', '1'), false);
    assert.strictEqual(undirectedGraph.eraseEdge('2', '1'), false);
  });

  it('insertNode() test', () => {
    assert.strictEqual(undirectedGraph.insertNode('1'), true);
    assert.strictEqual(undirectedGraph.insertNode('2'), true);
    assert.strictEqual(undirectedGraph.insertNode('3'), true);
    assert.strictEqual(undirectedGraph.insertNode('2'), false);
  });

  it('insertEdge() test', () => {
    assert.strictEqual(undirectedGraph.insertEdge('1', '3'), false);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.insertEdge('1', '2'), false);
    assert.strictEqual(undirectedGraph.insertEdge('3', '2'), false);
    assert.strictEqual(undirectedGraph.getWeight('3', '2'), null);
    assert.strictEqual(undirectedGraph.insertEdge('6', '10'), false);
    undirectedGraph.insertNode('6');
    assert.strictEqual(undirectedGraph.insertEdge('6', '3'), true);
  });

  it('isCycle() test', () => {
    assert.strictEqual(undirectedGraph.isCycle(), false);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.isCycle(), false);
    undirectedGraph.insertEdge('3', '1');
    assert.strictEqual(undirectedGraph.isCycle(), true);
    undirectedGraph.eraseEdge('3', '1');
    undirectedGraph.insertEdge('4', '3');
    assert.strictEqual(undirectedGraph.isCycle(), true);
  });

  it('isTree() test', () => {
    assert.strictEqual(undirectedGraph.isTree(), false);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.isTree(), true);
    undirectedGraph.eraseEdge('4', '2');
    assert.strictEqual(undirectedGraph.isTree(), false);
    undirectedGraph.eraseEdge('3', '2');
    undirectedGraph.insertEdge('4', '3');
    undirectedGraph.insertEdge('1', '4');
    assert.strictEqual(undirectedGraph.isTree(), true);
    undirectedGraph.insertEdge('3', '1');
    assert.strictEqual(undirectedGraph.isTree(), false);
  });

  it('isNegativeWeight() test', () => {
    assert.strictEqual(undirectedGraph.isNegativeWeight(), false);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.isNegativeWeight(), false);
    undirectedGraph.setWeight('4', '2', -10);
    assert.strictEqual(undirectedGraph.isNegativeWeight(), true);
    undirectedGraph.mapWeight((s, e, w) => Number(s) * Number(e));
    assert.strictEqual(undirectedGraph.isNegativeWeight(), false);
    undirectedGraph.mapWeight((s, e, w) => -1 * Number(s) * Number(e));
    assert.strictEqual(undirectedGraph.isNegativeWeight(), true);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2', 7], ['2', '3', -4], ['4', '2', 10]]);
    assert.strictEqual(undirectedGraph.isNegativeWeight(), true);
  });

  it('isAllWeightEqual() test', () => {
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), true);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), true);
    undirectedGraph.setWeight('2', '3', 10);
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), false);
    undirectedGraph.setWeight('2', '3', null);
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), true);
    undirectedGraph.mapWeight((s, e, w) => Number(s) * Number(e));
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), false);
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2', 7], ['2', '3', -4], ['4', '2', 10]]);
    assert.strictEqual(undirectedGraph.isAllWeightEqual(), false);
  });

  it('disjointset() test', () => {
    undirectedGraph = new UndirectedGraph(['1', '2', '3', '4'], [['1', '2'], ['2', '3'], ['4', '2']]);
    let dset = undirectedGraph.disjointSet();
    assert.strictEqual(dset.length, 1);
    assert.strictEqual(dset[0].length, 4);
    assert.strictEqual(dset[0].includes('1'), true);
    assert.strictEqual(dset[0].includes('2'), true);
    assert.strictEqual(dset[0].includes('3'), true);
    assert.strictEqual(dset[0].includes('4'), true);

    undirectedGraph.eraseEdge('2', '4');
    dset = undirectedGraph.disjointSet();
    assert.strictEqual(dset.length, 2);
    if (dset[0].length === 3) {
      assert.strictEqual(dset[1].length, 1);
      assert.strictEqual(dset[0].includes('1'), true);
      assert.strictEqual(dset[0].includes('2'), true);
      assert.strictEqual(dset[0].includes('3'), true);
      assert.strictEqual(dset[1].includes('4'), true);
    } else {
      assert.strictEqual(dset[0].length, 1);
      assert.strictEqual(dset[1].length, 3);
      assert.strictEqual(dset[1].includes('1'), true);
      assert.strictEqual(dset[1].includes('2'), true);
      assert.strictEqual(dset[1].includes('3'), true);
      assert.strictEqual(dset[0].includes('4'), true);
    }
  });
});
