var LinkedList = require('./linkedlist');

var Tree = function() {
  var Node = function(value) {
    var _value = value;
    var _parent = null;
    var _children = new LinkedList();

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

    this.addChild = function(value) {
      _children.push(new Node(value));
    };

    this.removeChild = function(index) {
      return _children.remove(index);
    };

    this.getChild = function(index) {
      return _children.get(index).getData();
    };

    this.hasChildren = function() {
      return !_children.empty();
    };

    this.render = function() {
      var childrenStr = '(' + _value;

      if(this.hasChildren()) {
        var child = _children.getFirst();

        while(child.hasNext()) {
          childrenStr += ', ' + child.getData().render();

          child = child.getNext();
        }
      }

      childrenStr += ')';

      return childrenStr;
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
  var tree = new Tree();

  tree.addRoot('one');
  var root = tree.getRoot();
  root.addChild('two');
  root.addChild('three');
  var left = root.getChild(0);
  left.addChild('four');
  left.addChild('five');
  left.addChild('six');

  console.log(root.render());
};

module.exports = Tree;
