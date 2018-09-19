(function($) {

  var $formElements = $('.wpcf7-form-control-wrap');

  $.each($formElements, function() {
    var $this = $(this);
    var $colEle = $this.find("[class*='col']");
    if ($colEle.length > 0) {
      var colEleClassList = $colEle[0].classList;
      colEleClassList.forEach(function(c) {
        if (c.includes('col')) {
          $this.addClass(c);
        }
      });
    }
  });

  $('.wpcf7-recaptcha').parent().addClass('wpcf7-recaptcha')
  $('.wpcf7-submit').wrap('<div class="wpcf7-submit"></div>')

})(jQuery)

// Resize reCAPTCHA to fit width of container
// Since it has a fixed width, we're scaling
// using CSS3 transforms
// ------------------------------------------
// captchaScale = containerWidth / elementWidth

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
//
// $(function() {
//
//   // Initialize scaling
//   scaleCaptcha();
//
//   // Update scaling on window resize
//   // Uses jQuery throttle plugin to limit strain on the browser
//   $(window).resize( $.throttle( 100, scaleCaptcha ) );
// })
