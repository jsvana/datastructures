var LinkedList = require('./linkedlist');
var ArraySequence = require('./arraysequence');

var HashMap = function() {
  var _buckets = new ArraySequence();

  for(var i = 0; i < 8; i++) {
    _buckets.push(new LinkedList());
  }

  this.set = function(key, value) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var node = bucketSearch(bucket, key);

    if(node === null) {
      node = bucket.push({ key: key, value: value });
    } else {
      node.setData({ key: key, value: value });
    }

    return node;
  };

  this.get = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var node = bucketSearch(bucket, key);

    if(node === null) {
      return null;
    } else {
      return node.getData().value;
    }
  };

  this.contains = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var node = bucketSearch(bucket, key);

    return node !== null;
  };

  this.remove = function(key) {
    var index = hash(key) % _buckets.length();
    var bucket = _buckets.get(index);
    var node = bucketSearch(bucket, key);
    return bucket.remove(node);
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
  var map = new HashMap();

  map.set('foo', 'bar');
  map.set('querty', 'uiop');
  map.set('queuee', 'test');
  map.set('one', 'two');
  map.set('three', 'four');
  map.set('five', 'six');

  console.log(map.get('foo'));
  console.log(map.get('querty'));
  console.log(map.get('queuee'));
  console.log(map.get('one'));
  console.log(map.get('three'));
  console.log(map.get('five'));

  console.log(map.contains('foo'));
  map.remove('foo');
  console.log(map.contains('foo'));
};

test();
