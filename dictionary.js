var LinkedList = require('./linkedlist');
var ArraySequence = require('./arraysequence');

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
      node = list.getData().value.getFirst();
      while(node.hasNext()) {
        node = node.getNext();
      }
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
    var list = bucketSearch(bucket, key);

    if(list !== null) {
      return list.getData().value;
    } else {
      return null;
    }
  };

  this.contains = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);

    return bucketSearch(bucket, key) !== null;
  };

  this.remove = function(key, value) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var list = bucketSearch(bucket, key);

    if(list !== null) {
      if(typeof value !== undefined) {
        var node = list.getData().value.getFirst();

        while(node.hasNext()) {
          if(node.getData() === value) {
            list.getData().value.remove(node);
            break;
          }
          node = node.getNext();
        }

        return value;
      } else {
        bucket.remove(list);

        return list.getData().value;
      }
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
  map.set('qwerty', 'uiop');
  map.set('queuee', 'test');
  map.set('one', 'two');
  map.set('three', 'four');
  map.set('five', 'six');

  console.log('[Get foo]');

  var foo = map.get('foo');
  var node = foo.getFirst();

  while(node.hasNext()) {
    console.log(node.getData());
    node = node.getNext();
  }

  console.log('[Remove foo[\'bar\']]');

  map.remove('foo', 'bar');

  var foo = map.get('foo');
  var node = foo.getFirst();

  while(node.hasNext()) {
    console.log(node.getData());
    node = node.getNext();
  }

  console.log('[Get qwerty]');

  var qwerty = map.get('qwerty');
  var node = qwerty.getFirst();

  while(node.hasNext()) {
    console.log(node.getData());
    node = node.getNext();
  }

  console.log('[Contains foo]');

  console.log(map.contains('foo'));
  map.remove('foo');
  console.log(map.contains('foo'));
};

module.exports = Dictionary;
