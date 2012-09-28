var BinaryTree = function() {
  var Node = function(value) {
    var _value = value;
    var _parent = null;
    var _left = null;
    var _right = null;

    this.setValue = function(value) {
      _value = value;
    };

    this.getValue = function() {
      return _value;
    };

    this.setParent = function(node) {
      _parent = node;
    };

    this.getParent = function() {
      return _parent;
    };

    this.addLeft = function(value) {
      _left = new Node(value);
    };

    this.setLeft = function(node) {
      _left = node;
    };

    this.getLeft = function() {
      return _left;
    };

    this.hasLeft = function() {
      return _left !== null;
    };

    this.addRight = function(value) {
      _right = new Node(value);
    };

    this.setRight = function(node) {
      _right = node;
    };

    this.getRight = function() {
      return _right;
    };

    this.hasRight = function() {
      return _right !== null;
    };

    this.render = function() {
      var leftStr;
      var rightStr;

      if(this.hasLeft()) {
        leftStr = _left.render();
      } else {
        leftStr = 'null';
      }

      if(this.hasRight()) {
        rightStr = _right.render();
      } else {
        rightStr = 'null';
      }

      return '(' + leftStr + ', ' + _value + ', ' + rightStr + ')';
    };
  };

  var _root = new Node();

  this.addRoot = function(value) {
    var oldValue = _root.getValue();
    _root = new Node(value);
    return oldValue;
  };

  this.setRoot = function(node) {
    var oldRoot = _root;
    _root = node;
    return oldRoot.getValue();
  };

  this.getRoot = function() {
    return _root;
  };

  this.isRoot = function(node) {
    return node === _root;
  };
};

var test = function() {
  var tree = new BinaryTree();

  tree.addRoot('one');
  var root = tree.getRoot();
  root.addLeft('two');
  root.addRight('three');
  var left = root.getLeft();
  left.addLeft('four');
  left.addRight('five');

  console.log(root.render());
};

test();

module.exports = BinaryTree;
