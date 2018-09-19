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

// // Resize reCAPTCHA to fit width of container
// // Since it has a fixed width, we're scaling
// // using CSS3 transforms
// // ------------------------------------------
// // captchaScale = containerWidth / elementWidth
//
// function scaleCaptcha(elementWidth) {
//   // Width of the reCAPTCHA element, in pixels
//   var reCaptchaWidth = 304;
//   // Get the containing element's width
// 	var containerWidth = $('.container').width();
//
//   // Only scale the reCAPTCHA if it won't fit
//   // inside the container
//   if(reCaptchaWidth > containerWidth) {
//     // Calculate the scale
//     var captchaScale = containerWidth / reCaptchaWidth;
//     // Apply the transformation
//     $('.g-recaptcha').css({
//       'transform':'scale('+captchaScale+')'
//     });
//   }
// }

$(function() {

  // Initialize scaling
  // scaleCaptcha();

  // Update scaling on window resize
  // Uses jQuery throttle plugin to limit strain on the browser
  // $(window).resize( $.throttle( 100, scaleCaptcha ) );

});
