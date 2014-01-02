var co = require('co');
module.exports = spawn;
function spawn(fn) {
  setImmediate(function () {
    co(fn)();
  });
  // return an object so that it is yieldable
  return {};
}

