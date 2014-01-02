# co-spawn

setImmediate for the [co](https://github.com/visionmedia/co) generator framework

[![build status](https://secure.travis-ci.org/eugeneware/co-spawn.png)](http://travis-ci.org/eugeneware/co-spawn)

Calling setImmediate in a co-friendly way is painful and you have to launch
co() in your setImmediate function. This is a simple wrapper.

## Installation

This module is installed via npm:

``` bash
$ npm install co-spawn
```

## Example Usage

### Non-blocking spawn

``` js
var spawn = require('co-spawn');
co(function *() {
  var c = { counter: 0 };

  // this will run first
  c.counter++;

  // put the following code into another turn of the event loop
  spawn(function *() {
    yield finish(c, done);
  });

  // this will run second
  c.counter++;
})();

function *finish(c, cb) {
  // this will run last
  c.counter++;

  expect(c.counter).to.equal(3);
  done();
}
```

### Blocking spawn

If for some reason you want to block on the spawn, just yield:

``` js
var spawn = require('co-spawn');
co(function *() {
  var c = { counter: 0 };

  // this will run 1st
  c.counter++;

  // put the following code into another turn of the event loop, but block
  yield spawn(function *() {
    yield finish(c, done);
  });

  // this will run last
  c.counter++;
})();

function *finish(c, cb) {
  // this will run 2nd
  c.counter++;

  expect(c.counter).to.equal(2);
  done();
}
```
