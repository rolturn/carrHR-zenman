var helpers = (function () {

  var pushLocation = function (html, updatedHrefObj) {
    var pathname = window.location.pathname;
    console.log(pathname)
    var updatedPath = '';
    var queryString = Object.keys(updatedHrefObj).map(function(key) {
        return key + '=' + updatedHrefObj[key]
    }).join('&');

    updatedPath = pathname + '?' + queryString;
    window.history.pushState(html,"new title", updatedPath);
    console.log(updatedPath)
  }

  window.onpopstate = function(e){
    if(e.state){
      console.log(e.state)
        document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
};

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
