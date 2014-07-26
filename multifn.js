(function() {
  function multifn() {
    var types = [];
    var fallback = noop;

    function _multifn_() {
      var i = -1;
      var n = types.length;
      var type;

      while (++i < n) {
        type = types[i];
        if (!type.if.apply(_multifn_, arguments)) continue;
        return type.do.apply(_multifn_, arguments);
      }

      return fallback.apply(_multifn_, arguments);
    }

    _multifn_.if = function(ifFn) {
      return {do: function(doFn) {
        types.push({
          if: ifFn,
          do: doFn
        });

        return _multifn_;
      }};
    };
    
    _multifn_.else = function(elseFn) {
      fallback = elseFn;
      return _multifn_;
    };

    return _multifn_;
  }

  function noop() {}

  if (typeof module != 'undefined')
    module.exports = multifn;
  else if (typeof define == 'function' && define.amd)
    define(function() { return multifn; });
  else
    this.multifn = multifn;
})();
