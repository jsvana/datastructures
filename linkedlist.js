var LinkedList = function() {
  var Node = function(value) {
    var _data = value;
    var _prev = null;
    var _next = null;

    this.setData = function(data) {
      _data = data;
    };

    this.getData = function() {
      return _data;
    }

    this.setPrev = function(node) {
      _prev = node;
    };

    this.getPrev = function(node) {
      return _prev;
    }

    this.setNext = function(node) {
      _next = node;
    };

    this.getNext = function(node) {
      return _next;
    }

    this.hasNext = function(node) {
      return _next != null;
    };

    this.hasPrev = function(node) {
      return _prev != null;
    }
  };

  var _head = new Node(null);
  var _tail = new Node(null);

  _head.setNext(_tail);
  _tail.setPrev(_head);

  this.addAfter = function(node, item) {
    var next = node.getNext();
    var newNode = new Node(item);

    node.setNext(newNode);
    newNode.setPrev(node);
    newNode.setNext(next);
    next.setPrev(newNode);

    return newNode;
  };

  this.addBefore = function(node, item) {
    return this.addAfter(node.getPrev(), item);
  };

  this.addFirst = function(item) {
    return this.addAfter(_head, item);
  };

  this.addLast = function(item) {
    return this.addBefore(_tail, item);
  };

  this.getFirst = function() {
    return _head.getNext();
  };

  this.remove = function(node) {
    var prev = node.getPrev();
    var next = node.getNext();
    prev.setNext(next);
    next.setPrev(prev);
    node.setPrev(null);
    node.setNext(null);

    return node;
  };
};

var list = new LinkedList();

var node = list.addFirst("one");
var two = list.addAfter(node, "two");
list.addLast("three");

console.log('[List Contents]');

while(node.hasNext()) {
  console.log(node.getData());

  node = node.getNext();
}

list.remove(two);

node = list.getFirst();

console.log('[List Contents]');

while(node.hasNext()) {
  console.log(node.getData());

  node = node.getNext();
}
