(function() {
  function multifn() {}

  if (typeof module != 'undefined')
    module.exports = multifn;
  else if (typeof define == 'function' && define.amd)
    define(function() { return multifn; });
  else
    this.multifn = multifn;
})();
