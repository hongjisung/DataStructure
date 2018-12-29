/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * merge A parts(left-right, right-end) to B
 * @private
 * @param {Array} A
 * @param {number} left
 * @param {number} right
 * @param {number} end
 * @param {Array} B
 * @param {function} comp
 */
const mergeAtoB = (A, left, right, end, B, comp) => {
  let i = left;
  let j = right;
  for (let k = left; k < end; k += 1) {
    if (i < right && (j >= end || comp(A[j], A[i]))) {
      B[k] = A[i];
      i += 1;
    } else {
      B[k] = A[j];
      j += 1;
    }
  }
};

/**
 * copy A to B.
 * @private
 * @param {Array} A 
 * @param {number} begin 
 * @param {number} end 
 * @param {Array} B 
 */
const copyArray = (A, begin, end, B) => {
  for (let k = begin; k < end; k += 1) {
    B[k] = A[k];
  }
};

/**
 * merge sort split part
 * @private
 * @param {Array} B
 * @param {number} begin
 * @param {number} end
 * @param {Array} A
 * @param {function} comp
 */
const mergeSplit = (B, begin, end, A, comp) => {
  if (end - begin < 2) {
    return;
  }
  const mid = Math.floor((begin + end) / 2);
  mergeSplit(A, begin, mid, B, comp);
  mergeSplit(A, mid, end, B, comp);

  mergeAtoB(B, begin, mid, end, A, comp);
};

/**
 * sort A array by using B array with compare function
 * @private
 * @param {Array} A
 * @param {Array} B
 * @param {function} comp
 */
const mergesort = (A, B, comp) => {
  const n = A.length;
  copyArray(A, 0, n, B);
  mergeSplit(B, 0, n, A, comp);
};

/**
 * merge sort iterable data with compare function.<br>
 * reference https://en.wikipedia.org/wiki/Merge_sort.
 * @param {object} data - iterable object
 * @param {function} comp - compare function
 */
const mergeSort = (data, comp = (n1, n2) => n1 < n2) => {
  const array = [...data];
  const working = new Array(array.length);
  mergesort(array, working, comp);
  return array;
};

module.exports = mergeSort;
