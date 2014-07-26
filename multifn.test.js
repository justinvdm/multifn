var assert = require('assert');
var multifn = require('./multifn');


describe("multifn", function() {
  it("should use the first matching override", function() {
    var fn = multifn()
      .if(function(a, b) { return a && !b; })
      .do(function(a) { return a; })

      .if(function(a, b) { return a && b; })
      .do(function(a, b) { return a + b; })

      .if(function(a, b) { return a && b; })
      .do(function() { return 3; });

    assert.equal(fn(2), 2);
    assert.equal(fn(4), 4);
    assert.equal(fn(1, 3), 4);
    assert.equal(fn(2, 3), 5);
  });

  it("should return undefined if there are no matching functions", function() {
    var fn = multifn()
      .if(function(a) { return a; })
      .do(function() { return 23; });

    assert.equal(fn(true), 23);
    assert(typeof fn(false) == 'undefined');
  });
});
