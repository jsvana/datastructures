var bubbleSort = function(array, compare) {
  for(var i = 0; i < array.length - 1; i++) {
    for(var j = 0; j < array.length - 1; j++) {
      if(compare(array[j], array[j + 1]) > 0) {
        array[j] ^= array[j + 1];
        array[j + 1] ^= array[j];
        array[j] ^= array[j + 1];
      }
    }
  }

  return array;
};

var insertionSort = function(array, compare) {
  for(var i = 1; i < array.length; i++) {
    var offset = i;
    var item = array[i];

    while(offset > 0 && compare(array[offset - 1], item) > 0) {
      array[offset] = array[offset - 1];
      --offset;
    }

    array[offset] = item;
  }

  return array;
};

var mergeSort = function(array, compare) {
  if(array.length <= 1) {
    return array;
  }

  var left = [];
  var right = [];
  var middle = parseInt(array.length / 2);

  for(var i = 0; i < middle; i++) {
    left.push(array[i]);
  }

  for(var i = middle; i < array.length; i++) {
    right.push(array[i]);
  }

  left = mergeSort(left, compare);
  right = mergeSort(right, compare);

  var ret = [];

  while(left.length > 0 || right.length > 0) {
    if(left.length > 0 && right.length > 0) {
      if(compare(left[0], right[0]) <= 0) {
        ret.push(left[0]);
        left.shift();
      } else {
        ret.push(right[0]);
        right.shift();
      }
    } else if(left.length > 0) {
      ret.push(left[0]);
      left.shift();
    } else if(right.length > 0) {
      ret.push(right[0]);
      right.shift();
    }
  }

  return ret;
};

var quickSort = function(array, compare) {
  if(array.length <= 1) {
    return array;
  }

  var middle = parseInt(array.length / 2);
  var pivot = array.splice(middle, 1);
  var less = [];
  var more = [];

  for(var i = 0; i < array.length; i++) {
    if(array[i] <= pivot) {
      less.push(array[i]);
    } else {
      more.push(array[i]);
    }
  }

  return quickSort(less).concat(pivot).concat(quickSort(more));
};

var test = function() {
  console.log('[Bubble]');

  console.log(bubbleSort([5, 4, 3, 2, 1], function(a, b) { return a - b; }));

  console.log('[Insertion]');

  console.log(insertionSort([5, 4, 3, 2, 1], function(a, b) { return a - b; }));

  console.log('[Merge]');

  console.log(mergeSort([5, 4, 3, 2, 1], function(a, b) { return a - b; }));

  console.log('[Quick]');

  console.log(quickSort([5, 4, 3, 2, 1], function(a, b) { return a - b; }));
};

test();

module.exports = {
  bubbleSort: bubbleSort,
  insertionSort: insertionSort
};
