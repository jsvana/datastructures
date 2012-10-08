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
  var _length = 0;

  _head.setNext(_tail);
  _tail.setPrev(_head);

  this.addAfter = function(node, item) {
    var next = node.getNext();
    var newNode = new Node(item);

    node.setNext(newNode);
    newNode.setPrev(node);
    newNode.setNext(next);
    next.setPrev(newNode);

    ++_length;

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

  this.getLast = function() {
    return _tail.getPrev();
  };

  this.remove = function(node) {
    var prev = node.getPrev();
    var next = node.getNext();
    prev.setNext(next);
    next.setPrev(prev);
    node.setPrev(null);
    node.setNext(null);

    --_length;

    return node.getData();
  };

  this.push = function(item) {
    return this.pushFirst(item);
  };

  this.pushFirst = function(item) {
    return this.addFirst(item);
  };

  this.pushLast = function(item) {
    return this.addLast(item);
  };

  this.popFirst = function() {
    return this.remove(this.getFirst());
  };

  this.popLast = function() {
    return this.remove(this.getLast());
  };

  this.length = function() {
    return _length;
  };

  this.get = function(index) {
    if(index < 0 || index > this.length() - 1) {
      return null;
    }

    var node = this.getFirst();

    for(var i = 0; node.hasNext(); i++) {
      if(i === index) {
        return node;
      }

      node = node.getNext();
    }

    return null;
  }

  this.empty = function() {
    return _length === 0;
  };
};

var ArraySequence = function(size) {
  var _data;
  var _length = 0;
  var _size;

  if(size === null) {
    _data = new Array(4);
    _size = 4;
  } else {
    _data = new Array(size);
    _size = size;
  }

  this.length = function() {
    return _length;
  };

  this.empty = function() {
    return _length === 0;
  }

  this.add = function(index, item) {
    if(_length == _size) {
      //console.log('[Expanding...]');
      this.expand();
      //console.log('[Expanded] New size: ' + _size);
    }

    for(var i = this.length(); i >= index; i--) {
      _data[i] = _data[i - 1];
    }

    _data[index] = item;
    ++_length;

    return item;
  };

  this.push = function(item) {
    return this.pushFirst(item);
  };

  this.pushFirst = function(item) {
    return this.add(0, item);
  };

  this.pushLast = function(item) {
    return this.add(this.length(), item);
  };

  this.get = function(index) {
    if(index < 0 || index > this.length()) {
      return null;
    }

    return _data[index];
  };

  this.set = function(index, value) {
    if(index < 0 || index > this.length()) {
      return null;
    }

    var old = _data[index];
    _data[index] = value;
    return old;
  };

  this.remove = function(index) {
    if(index < 0 || index > this.length() - 1) {
      return null;
    }

    var item = _data[index];

    for(var i = index; i < this.length() - 1; i++) {
      _data[i] = _data[i + 1];
    }

    --_length;


    _data[_length] = null;

    return item;
  };

  this.popFirst = function() {
    return this.remove(0);
  };

  this.popLast = function() {
    return this.remove(this.length() - 1);
  };

  this.expand = function() {
    _size *= 2;

    var newData = new Array(_size);

    for(var i = 0; i < this.length(); i++) {
      newData[i] = _data[i];
    }

    _data = newData;
  };
};

var Dictionary = function() {
  var _buckets = new ArraySequence();

  for(var i = 0; i < 8; i++) {
    _buckets.push(new LinkedList());
  }

  this.set = function(key, value) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var list = bucketSearch(bucket, key);

    if(list !== null) {
      node = list.getData().value.push(value);
    } else {
      list = new LinkedList();
      list.push(value);
      bucket.push({ key: key, value: list });
    }

    return value;
  };

  this.get = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);

    return bucketSearch(bucket, key).getData().value;
  };

  this.contains = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);

    return bucketSearch(bucket, key) !== null;
  };

  this.remove = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var list = bucketSearch(bucket, key);

    if(list !== null) {
      bucket.remove(list);

      return list.getData().value;
    } else {
      return null;
    }
  };

  var hash = function(key) {
    return key.length ^ key.charCodeAt(0);
  };

  var bucketSearch = function(bucket, key) {
    var node = bucket.getFirst();

    while(node.hasNext()) {
      if(node.getData().key === key) {
        return node;
      }

      node = node.getNext();
    }

    return null;
  };
};

var test = function() {
  var map = new Dictionary();

  map.set('foo', 'bar');
  map.set('foo', 'asdf');
  map.set('querty', 'uiop');
  map.set('queuee', 'test');
  map.set('one', 'two');
  map.set('three', 'four');
  map.set('five', 'six');

  console.log(map.get('foo') == map.get('qwerty'));

  console.log('[Get foo]');

  var foo = map.get('foo');
  var node = foo.getFirst();

  while(node.hasNext()) {
    console.log(node.getData());
    node = node.getNext();
  }

  console.log('[Get qwerty]');

  var qwerty = map.get('querty');
  var node = foo.getFirst();

  while(node.hasNext()) {
    console.log(node.getData());
    node = node.getNext();
  }

  console.log('[Contains foo]');

  console.log(map.contains('foo'));
  map.remove('foo');
  console.log(map.contains('foo'));
};

test();

