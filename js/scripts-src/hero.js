/*------------------------------------*\
    ::Hero CTA
\*------------------------------------*/
var heroCTA = function(){
	var $hero = $('#hero-cta');

    if(0 < $hero.length){
        var stickyTop = $('#hero-cta').offset().top - 150;

    	$(window).on( 'scroll', function(){
            if ($(window).scrollTop() >= stickyTop) {
                $('#hero-cta').addClass('stick');
            } else {
                $('#hero-cta').removeClass('stick');
            }
        });
    }
};

var backgroundPos = function(){
	var $hero_bg = $('.hero__background');
	if(0 < $hero_bg.length){
		var $background = $hero_bg.css('background-image');
        if (($background.indexOf('Golden-Ridge') >= 0) || ($background.indexOf('New-Aurora') >= 0)) {
			$hero_bg.css('background-position', 'bottom');
		}
    }
};


jQuery(function($){
	heroCTA();
	backgroundPos();
});

$(document).ready(function () {
  $('._hero-image__background--fixed').addClass('hero-image__background--fixed');

});
