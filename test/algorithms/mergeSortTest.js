const assert = require('assert');
const mergeSort = require('../../src/algorithms/mergeSort');

/* global describe it */
describe('merge sort test', () => {
  it('well sorted test', () => {
    const limit = 1000;
    const comp = (n1, n2) => n1 < n2;
    for (let i = 0; i < 100; i += 1) {
      let a = [];
      for (let j = 0; j < limit; j += 1) {
        a.push(Math.floor(Math.random() * limit * 10));
      }

      a = mergeSort(a, comp);

      for (let j = 0; j < limit - 1; j += 1) {
        assert.strictEqual(comp(a[j], a[j + 1]), false);
      }
    }
  });

  it('1,000,000 sort test', () => {
    const limit = 1000000;
    const comp = (n1, n2) => n1 < n2;

    let a = [];
    for (let j = 0; j < limit; j += 1) {
      a.push(Math.floor(Math.random() * limit * 10));
    }
    a = mergeSort(a, comp);

    for (let j = 0; j < limit - 1; j += 1) {
      assert.strictEqual(comp(a[j], a[j + 1]), false);
    }
  });

  it('5,000,000 sort test', () => {
    const limit = 5000000;
    const comp = (n1, n2) => n1 < n2;

    let a = [];
    for (let j = 0; j < limit; j += 1) {
      a.push(Math.floor(Math.random() * limit * 10));
    }
    a = mergeSort(a, comp);

    for (let j = 0; j < limit - 1; j += 1) {
      assert.strictEqual(comp(a[j], a[j + 1]), false);
    }
  });
});
