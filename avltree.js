var AVLTree = function() {
  var Node = function(value) {
    if (value === undefined) {
      var _value = null;
    } else {
      var _value = value;
    }
    var _parent = null;
    var _left = null;
    var _right = null;
    var _height = 1;
    var _leftHeight = 0;
    var _rightHeight = 0;

    this.setHeight = function(value) {
      _height = value;
    };

    this.getHeight = function() {
      return _height;
    };

    this.setLeftHeight = function(value) {
      _leftHeight = value;
    };

    this.getLeftHeight = function() {
      return _leftHeight;
    };

    this.setRightHeight = function(value) {
      _rightHeight = value;
    };

    this.getRightHeight = function() {
      return _rightHeight;
    };

    this.balanceFactor = function() {
      return this.getLeftHeight() - this.getRightHeight();
    };

    this.calculateHeight = function() {
      if (this.getLeft() === null || this.getLeft().getValue() === null) {
        this.setLeftHeight(0);
      } else {
        this.setLeftHeight(this.getLeft().calculateHeight());
      }

      if (this.getRight() === null || this.getRight().getValue() === null) {
        this.setRightHeight(0);
      } else {
        this.setRightHeight(this.getRight().calculateHeight());
      }

      if (this.getLeftHeight() > this.getRightHeight()) {
        this.setHeight(this.getLeftHeight() + 1);
      } else {
        this.setHeight(this.getRightHeight() + 1);
      }

      return this.getHeight();
    };

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

    this.getGrandparent = function() {
      return _parent.getParent();
    };

    this.addLeft = function(value) {
      _left = new Node(value);
      return _left;
    };

    this.setLeft = function(node) {
      _left = node;
      if (node !== null) {
        node.setParent(this);
      }
      return _left;
    };

    this.getLeft = function() {
      return _left;
    };

    this.hasLeft = function() {
      return _left !== null;
    };

    this.addRight = function(value) {
      _right = new Node(value);
      return _right;
    };

    this.setRight = function(node) {
      _right = node;
      if (node !== null) {
        node.setParent(this);
      }
      return _right;
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

      if (this.hasLeft()) {
        leftStr = _left.render();
      } else {
        leftStr = 'null';
      }

      if (this.hasRight()) {
        rightStr = _right.render();
      } else {
        rightStr = 'null';
      }

      return '{"value":' + _value + ',"left":' + leftStr + ',"right":' + rightStr + '}';
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

  this.calculateHeights = function() {
    this.getRoot().calculateHeight();
  };

  this.insert = function(value) {
    var node = this.insertNode(this.getRoot(), value);
    var rebalanced = false;

    // Recalculate heights
    while (node.getParent() !== null && !rebalanced) {
      if (node.getParent().getLeft() === node) {
        node = node.getParent();
        node.setLeftHeight(node.getLeftHeight() + 1);
      } else {
        node = node.getParent();
        node.setRightHeight(node.getRightHeight() + 1);
      }

      if (node.getLeftHeight() > node.getRightHeight()) {
        node.setHeight(node.getLeftHeight() + 1);
      } else {
        node.setHeight(node.getRightHeight() + 1);
      }

      // Check rebalance
      var balanceFactor = node.balanceFactor();

      if (balanceFactor > 1) {
        if (node.getLeft().balanceFactor() < 0) {
          // Double right rotation
          var a;
          var b;
          var c;
          var aParent;
          var aRight;
          var bRight;
          var cLeft;
          var cRight;

          b = node.getLeft();
          c = node.getLeft().getRight();
          cLeft = c.getLeft();

          node.setLeft(c);
          c.setLeft(b);
          b.setRight(cLeft);

          a = node;
          aParent = a.getParent();
          b = a.getLeft();
          bRight = b.getRight();
          c = b.getLeft();

          b.setParent(aParent);
          if (a === this.getRoot()) {
            this.setRoot(b);
          } else if (aParent !== null) {
            aParent.setLeft(b);
          }
          b.setLeft(c);
          c.setParent(b);
          b.setRight(a);
          a.setParent(b);
          a.setLeft(bRight);

          node = b;
        } else {
          // Single right rotation
          var a;
          var b;
          var c;
          var aParent;
          var bRight;

          a = node;
          aParent = a.getParent();
          b = a.getLeft();
          bRight = b.getRight();
          c = b.getLeft();

          b.setParent(aParent);
          if (a === this.getRoot()) {
            this.setRoot(b);
          } else if (aParent !== null) {
            aParent.setLeft(b);
          }
          b.setLeft(c);
          c.setParent(b);
          b.setRight(a);
          a.setParent(b);
          a.setLeft(bRight);

          node = b;
        }
        rebalanced = true;
      } else if (balanceFactor < -1) {
        if (node.getRight().balanceFactor() > 0) {
          // Double left rotation
          var a;
          var b;
          var c;
          var aParent;
          var aLeft;
          var bLeft;
          var cLeft;
          var cRight;

          b = node.getRight();
          c = node.getRight().getLeft();
          cRight = c.getRight();

          node.setRight(c);
          c.setRight(b);
          b.setLeft(cRight);

          a = node;
          aParent = a.getParent();
          b = a.getRight();
          bLeft = b.getLeft();
          c = b.getRight();

          b.setParent(aParent);
          if (a === this.getRoot()) {
            this.setRoot(b);
          } else if (aParent !== null) {
            aParent.setRight(b);
          }
          b.setLeft(a);
          b.setRight(c);
          a.setRight(bLeft);

          node = b;
        } else {
          // Single left rotation
          var a;
          var b;
          var c;
          var aParent;
          var bLeft;

          a = node;
          aParent = a.getParent();
          b = a.getRight();
          bLeft = b.getLeft();
          c = b.getRight();

          b.setParent(aParent);
          if (a === this.getRoot()) {
            this.setRoot(b);
          } else if (aParent !== null) {
            aParent.setRight(b);
          }
          b.setLeft(a);
          b.setRight(c);
          a.setRight(bLeft);

          node = b;
        }
        rebalanced = true;
      }
    }

    if (rebalanced) {
      node.calculateHeight();

      while (node.getParent() !== null && !rebalanced) {
        if (node.getParent().getLeft() === node) {
          node = node.getParent();
          node.setLeftHeight(node.getLeftHeight() + 1);
        } else {
          node = node.getParent();
          node.setRightHeight(node.getRightHeight() + 1);
        }

        if (node.getLeftHeight() > node.getRightHeight()) {
          node.setHeight(node.getLeftHeight() + 1);
        } else {
          node.setHeight(node.getRightHeight() + 1);
        }
      }
    }
  };

  this.insertNode = function(node, value) {
    var nodeValue = node.getValue();
    var retNode;

    if (nodeValue === null) {
      node.setValue(value);
      retNode = node;
    } else {
      if (nodeValue > value) {
        if (node.hasLeft()) {
          retNode = this.insertNode(node.getLeft(), value);
        } else {
          retNode = node.setLeft(new Node(value));
        }
      } else {
        if (node.hasRight()) {
          retNode = this.insertNode(node.getRight(), value);
        } else {
          retNode = node.setRight(new Node(value));
        }
      }
    }

    return retNode;
  };
};

var test = function() {
  var tree = new AVLTree();

  for (var i = 99; i >= 0; i--) {
    tree.insert(i);
  }

  //tree.calculateHeights();

  var root = tree.getRoot();

  console.log(root.render());
};

test();

module.exports = AVLTree;
