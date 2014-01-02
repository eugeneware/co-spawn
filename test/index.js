var expect = require('expect.js'),
    co = require('co'),
    spawn = require('..');

describe('co-spawn', function() {
  it('should be able to spawn a new function', function(done) {
    function *finish(c, cb) {
      c.counter++;
      expect(c.counter).to.equal(3);
      done();
    }
    co(function *() {
      var c = { counter: 0 };
      c.counter++;
      spawn(function *() {
        yield finish(c, done);
      });
      c.counter++;
    })();
  });

  it('should be able to block with yield', function(done) {
    function *finish(c, cb) {
      c.counter++;
      expect(c.counter).to.equal(2);
    }
    co(function *() {
      var c = { counter: 0 };
      c.counter++;
      yield spawn(function *() {
        yield finish(c, done);
      });
      c.counter++;
      done();
    })();
  });
});
