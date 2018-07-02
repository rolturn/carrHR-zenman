var helpers = (function () {
  var urlParams = {};
  if (window.location.search.length > 0) {
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
    })();
  }
  return {
    urlParams,
    findParam: function (search) {
      return !_.isUndefined(urlParams[search]) ? urlParams[search] : false;
    },
  }
})();
