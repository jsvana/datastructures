var LinkedList = require('./linkedlist');

var PriorityQueue = function() {
  var _data = new LinkedList();

  this.push = function(item, priority) {
    var node = _data.getFirst();

    while(node.hasNext()) {
      var data = node.getData();

      if(priority <= data.priority) {
        return _data.addBefore(node, { item: item, priority: priority });
      }

      node = node.getNext();
    }

    return _data.addLast({ item: item, priority: priority });
  };

  this.pop = function() {
    return _data.popFirst();
  };

  this.length = function() {
    return _data.length();
  };

  this.empty = function() {
    return _data.empty();
  };
};

var test = function() {
  var queue = new PriorityQueue();

  var items = [
    { item: 'asdf', priority: 4 },
    { item: 'qwerty', priority: 2 },
    { item: 'foo', priority: 7 },
    { item: 'bar', priority: 1 }
  ];

  for(var i = 0; i < items.length; i++) {
    queue.push(items[i].item, items[i].priority);
  }

  while(!queue.empty()) {
    var data = queue.pop();
    console.log('item: ' + data.item + ', priority: ' + data.priority);
  }
};

test();
