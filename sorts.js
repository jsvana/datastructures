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
  for(var i = 0; i < array.length; i++) {
    for(var j = 0; j < array.length; j++) {
      if(compare(array[i], array[j]) < 0) {
        array[j] ^= array[i];
        array[i] ^= array[j];
        array[j] ^= array[i];
      }
    }
  }

  return array;
};

var test = function() {
  console.log('[Bubble]');

  console.log(bubbleSort([5, 4, 3, 2, 1], function(a, b) { return a - b }));

  console.log('[Insertion]');

  console.log(insertionSort([5, 4, 3, 2, 1], function(a, b) { return a - b }));
};

test();

module.exports = {
  bubbleSort: bubbleSort,
  insertionSort: insertionSort
};
