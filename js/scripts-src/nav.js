/*------------------------------------*\
  ::Sticky Header
\*------------------------------------*/
jQuery(function($) {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 1;
  var logoWidth = $('.head-nav__logo').outerWidth();
  var navbarHeight = $('.main-head__nav').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var $mNav = $('.main-head__trigger');
    if(!$mNav.hasClass('active')) { // if the nav is open don't shrink header
      var st = $(this).scrollTop();
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
        return;
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.main-head__nav').removeClass('nav--show').addClass('nav--hidden');
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('.main-head__nav').removeClass('nav--hidden').addClass('nav--show');
        }
      }
      lastScrollTop = st;
    }
  }
});


/*
*  Mobile Nav Functionality
*  Submenu Dropdowns
*/
var mobileNav = (function() {
  $( '.head-nav__mobile .menu-item-has-children' ).doubleTapToGo();
  $( '.head-nav__mobile .menu-item-has-children' ).click( function(e) {
    $( this ).toggleClass( 'active' );
    console.log(this);
    $( this ).find( '.sub-menu' ).stop().slideToggle('slow');
  });
})();

/*
*  Hamburger Helper Animation
*/
var hamburgerHelper = (function() {
  $("#hamburger-6").click(function(){
    $('#head-nav__phone').removeClass("is-active");

    $(this).toggleClass("is-active");
    $('#head-nav__mobile').toggleClass("is-active");

    $(this).hasClass('is-active') ? $('body').addClass('is-active') : $('body').removeClass('is-active');
  });

  $("#mobile-telephone").click(function(e){
    e.preventDefault();

    $('#hamburger-6').removeClass("is-active");
    $('#head-nav__mobile').removeClass("is-active");

    $('#head-nav__phone').toggleClass("is-active");

    $('#head-nav__phone').hasClass('is-active') ? $('body').addClass('is-active') : $('body').removeClass('is-active');
  });
})();

/*
*  Desktop Nav Functionality
*  Submenu Dropdowns
*/
var desktopNav = (function() {
  $( '.head-nav__desktop .menu-item-has-children' ).mouseenter( function() {
    $( this ).find( '.sub-menu' ).addClass('slide');
  });

  $( '.head-nav__desktop .menu-item-has-children' ).mouseleave( function() {
    $( this ).find( '.sub-menu' ).removeClass('slide');
  });
})();


// jQuery(function($){
//   desktopNav();
//   mobileNav();
//   hamburgerHelper();
// });
