var ArraySequence = function(size) {
  var _data;
  var _length = 0;
  var _size;

  if(size == null) {
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
    return _length == 0;
  }

  this.add = function(index, item) {
    if(_length == _size) {
      console.log('[Expanding...]');
      this.expand();
      console.log('[Expanded] New size: ' + _size);
    }

    for(var i = this.length(); i >= index; i--) {
      _data[i] = _data[i - 1];
    }

    _data[index] = item;
    ++_length;

    return item;
  };

  this.pushFirst = function(item) {
    this.add(0, item);
  };

  this.pushLast = function(item) {
    this.add(this.length(), item);
  };

  this.get = function(index) {
    if(index < 0 || index > this.length()) {
      return null;
    }

    return _data[index];
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

var test = function() {
  var data = new ArraySequence();

  data.pushFirst('one');
  data.pushFirst('two');
  data.pushFirst('three');
  data.pushFirst('four');
  data.pushFirst('five');
  data.pushLast('zero');

  console.log('[Display]');

  for(var i = 0; i < data.length(); i++) {
    console.log(data.get(i));
  }

  data.remove(2);

  console.log('[Display]');

  for(var i = 0; i < data.length(); i++) {
    console.log(data.get(i));
  }

  console.log('[popLast] ' + data.popLast());
  console.log('[length] ' + data.length());
  console.log('[popFirst] ' + data.popFirst());
  console.log('[length] ' + data.length());

  console.log('[Display]');

  for(var i = 0; i < data.length(); i++) {
    console.log(data.get(i));
  }
};

module.exports = ArraySequence;
