// .js-line-animation, .js-ease, .js-from-left, .js-scale
var activateAnimation = function() {
	$(".js-line-animation, .js-ease, .js-from-left, .js-scale").each(function(){
		var $this = $(this);
		// $this.addClass('active');
		$this.bind('inview', function (event, visible) {
			var $that = $(this);
			if (visible === true && !$that.hasClass('active')) {
				$that.addClass('active');
			} else {
				return false;
			}
		});
	});
};

function hoverStick(resources){
	$(resources[0]).addClass('active');

	resources.on('mouseenter', function(r){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
	});
}

function addFlash(parent){
	parent.bind('inview', function (event, visible) {
		var $this = $(this);
		if (visible && !$this.hasClass('flashed')){
			$this.addClass('flashed');
			$this.children().each(function(i, el){
				setTimeout(function(){
					$(el).addClass('flashing');
				}, i * 400);
			});
		}
	});
}

jQuery(function($){
	$(function () {
		$(window).scroll();
	});
	activateAnimation();
	// hoverStick($('.resources__all').children());
	addFlash($('.footer__social'));
});
