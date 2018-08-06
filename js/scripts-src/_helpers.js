var helpers = (function () {

  var pushLocation = function (updatedObj, updatedHrefObj, callback) {
    if (updatedObj.pushed === true) return false
    var pathname = window.location.pathname;
    var obj = _.cloneDeep(updatedObj)
    var queryString = Object.keys(updatedHrefObj).map(function(key) {
        return key + '=' + updatedHrefObj[key]
    }).join('&');
    if (queryString) {
      var updatedPath = pathname + '?' + queryString;
      obj['pushed'] = true;
      window.history.pushState(JSON.stringify(obj), updatedPath, updatedPath);
    }

    window.onpopstate = function(e){
      if(e.state){
        callback(JSON.parse(e.state));
      }
    };


  }

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

  var slugify = function (text) {
  	return text.toString()
  		.toLowerCase()
  		.replace(/\s+/g, '-')           // Replace spaces with -
  		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
  		.replace(/^-+/, '')             // Trim - from start of text
  		.replace(/-+$/, '');            // Trim - from end of text
  }

  return {
    urlParams,
    findParam: function (search) {
      return !_.isUndefined(urlParams[search]) ? urlParams[search] : false;
    },
    slugify,
    pushLocation,
  }
})();
