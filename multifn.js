(function() {
  function multifn() {
    var types = [];

    function _multifn_() {
      var i = -1;
      var n = types.length;
      var type;

      while (++i < n) {
        type = types[i];
        if (!type.if.apply(this, arguments)) continue;
        return type.do.apply(this, arguments);
      }
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

    return _multifn_;
  }

  if (typeof module != 'undefined')
    module.exports = multifn;
  else if (typeof define == 'function' && define.amd)
    define(function() { return multifn; });
  else
    this.multifn = multifn;
})();
