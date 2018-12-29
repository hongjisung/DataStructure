const partition = (array, first, last, comp) => {
  const arr = array;
  const pivot = arr[last];
  let i = first;
  for (let j = first; j < last; j += 1) {
    if (!comp(arr[j], pivot)) {
      if (i !== j) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      i += 1;
    }
  }
  const temp = arr[last];
  arr[last] = arr[i];
  arr[i] = temp;
  return i;
};

const quicksort = (array, first, last, comp) => {
  if (first < last) {
    const p = partition(array, first, last, comp);
    quicksort(array, first, p - 1, comp);
    quicksort(array, p + 1, last, comp);
  }
};

const quickSort = (data, comp = (n1, n2) => n1 < n2) => {
  const array = [...data];
  quicksort(array, 0, array.length - 1, comp);
  return array;
};

module.exports = quickSort;
