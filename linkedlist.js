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

  this.addFirst = function(item) {
    return this.addAfter(_head, item);
  };
};

var list = new LinkedList();

var node = list.addFirst("one");
list.addAfter(node, "two");

while(node.hasNext()) {
  console.log(node.getData());

  node = node.getNext();
}
