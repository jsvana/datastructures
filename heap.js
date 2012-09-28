var ArraySequence = require('./arraysequence');

var Heap = function() {
  var Node = function(value, index) {
    var _value = value;
    var _index = index;

    this.setValue = function(value) {
      _value = value;
    };

    this.getValue = function() {
      return _value;
    };

    this.setIndex = function(index) {
      _index = index;
    };

    this.getIndex = function() {
      return _index;
    };
  };

  _data = new ArraySequence();
  _data.push(null);

  this.setRoot = function(value) {
    if(this.length() > 0) {
      _data.set(1, new Node(value, 1));
    } else {
      _data.add(1, new Node(value, 1));
    }
  };

  this.getRoot = function() {
    return _data.get(1);
  };

  this.isRoot = function(node) {
    return this.getRoot() === node;
  };

  this.insert = function(value) {
    var node = new Node(value, _data.length());

    _data.add(_data.length(), node);

    while(!this.isRoot(node) && node !== null) {
      var parent = this.getParent(node);

      if(node.getValue() < parent.getValue()) {
        var parentValue = parent.getValue();
        parent.setValue(node.getValue());
        node.setValue(parentValue);

        node = this.getParent(node);
      } else {
        return node;
      }
    }

    return node;
  };

  this.getParent = function(node) {
    if(this.isRoot(node)) {
      return null;
    }

    var index = node.getIndex();

    if(index % 2 !== 0) {
      index = (index - 1) / 2;
    } else {
      index = index / 2;
    }

    return _data.get(index);
  };

  this.getLeft = function(node) {
    var index = node.getIndex() * 2;

    if(index < _data.length()) {
      return _data.get(index);
    } else {
      return null;
    }
  };

  this.hasLeft = function(node) {
    return this.getLeft(node) !== null;
  };

  this.getRight = function(node) {
    var index = node.getIndex() * 2 + 1;

    if(index < _data.length()) {
      return _data.get(index);
    } else {
      return null;
    }
  };

  this.hasRight = function(node) {
    return this.getRight(node) !== null;
  };

  this.removeMin = function() {
    var min = _data.get(1).getValue();
    _data.get(1).setValue(_data.get(_data.length() - 1).getValue());
    _data.popLast();

    var node = this.getRoot();

    while(this.hasLeft(node)) {
      var smaller;

      if(this.hasRight(node)) {
        if(this.getLeft(node).getValue() < this.getRight(node).getValue()) {
          smaller = this.getLeft(node);
        } else {
          smaller = this.getRight(node);
        }
      } else {
        smaller = this.getLeft(node);
      }

      if(node.getValue() < smaller.getValue()) {
        break;
      }

      var old = node.getValue();
      node.setValue(smaller.getValue());
      smaller.setValue(old);

      node = smaller;
    }

    return min;
  };

  this.render = function(node) {
    if(node === null) {
      return 'null';
    } else {
      return '(' + node.getValue() + ' ' + this.render(this.getLeft(node)) + ' ' + this.render(this.getRight(node)) + ')';
    }
  };

  this.length = function() {
    return _data.length() - 1;
  };

  this.empty = function() {
    return this.length() === 0;
  };
};

var test = function() {
  var heap = new Heap();

  heap.setRoot(6);
  heap.insert(5);
  heap.insert(4);
  heap.insert(3);
  heap.insert(2);
  heap.insert(1);

  var root = heap.getRoot();
  console.log(heap.render(root));

  console.log(heap.removeMin());
  console.log(heap.render(root));
};

module.exports = Heap;
