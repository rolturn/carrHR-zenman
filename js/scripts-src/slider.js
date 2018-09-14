var slider = function() {
	var navAmount = $( ".slider__slide-content" ).length;
	$('.js-slide-content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: false,
		autoplay: true,
		autoplaySpeed: 4000,
		asNavFor: '.js-slide-nav',
		variableWidth: false,
	});
	$('.js-slide-nav').slick({
		slidesToShow: navAmount,
		asNavFor: '.js-slide-content',
		variableWidth: true,
		focusOnSelect: true,
	});
	$('.slider__prev').on('click', function(){
		$('.js-slide-content').slick("slickPrev");
	});
	$('.slider__next').on('click', function(){
		$('.js-slide-content').slick("slickNext");
	});
	if ($('.slider__slide-nav.see-all-container').length > 0) {
		$('.slider__slide-nav.see-all-container').detach().appendTo('.js-slide-nav .slick-track');
	}
};

var TestimonialSlider = function() {
	var faderholder = document.querySelectorAll('.module-testimonial-slider__quotes');

	for (var f = 0; f < faderholder.length; f++) {
		fade_em(faderholder[f]);
	}

	function fade_em(parent){
		var index = 1,
			children = parent.children,
			count = children.length - 1, // align with zero-based array access
			interval,
			delay = 4000,
			maxH = 180;

		for (var c = 0; c <= count; c++) {
			maxH = Math.max(maxH, children[c].clientHeight);
		}
		parent.style.height = maxH + 'px';

		children[0].classList.add('shown');

		interval = setInterval(function(){
			fade_to(index);
		}, delay);

		parent.parentNode.parentNode.parentNode.addEventListener('click', function(evt){ // go stupid. get dumb.
			if (evt.target.classList.contains('module-testimonial-slider__nav')){
				clearInterval(interval);

				if (evt.target.classList.contains('module-testimonial-slider__prev')){
					index = get_prev(get_prev(index));
					fade_to(index);
				} else {
					fade_to(index);
				}

				interval = setInterval(function(){
					fade_to(index);
				}, delay);
			}
		});

		var fade_to = function(i){
			for (var s = 0; s <= count; s++) {
				if (children[s].classList.contains('shown')){
					children[s].classList.remove('shown');
				}
			}

			children[i].classList.add('shown');

			index = get_next(i);
		}

		var get_next = function(i){
			var next = i + 1;
			if (next > count){
				next = 0;
			}

			return next;
		}

		var get_prev = function(i){
			var prev = i - 1;
			if (prev < 0){
				prev = count;
			}

			return prev;
		}
	}
};

var imageGallery = function() {
	var gallerySlider = $('.js-image-content'),
		galleryNav = $('.js-image-nav');

	gallerySlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: true,
	}).on('beforeChange', function(evt, slick, cur, next){
		galleryNav.find('.slick-current').removeClass('slick-current').end().children().eq(next).addClass('slick-current');
	});

	galleryNav.on('click', function(e){
		if (e.target.nodeName === 'IMG'){
			gallerySlider.slick('slickGoTo', $(this.children).index(e.target.parentNode));
		}
	});

	$('.image__prev').on('click', function(){
		gallerySlider.slick('slickPrev');
	});
	$('.image__next').on('click', function(){
		gallerySlider.slick('slickNext');
	});
};

var twoColSlider = function() {
	$('.js-two-col-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: false,
	});
};


var events = function(count) {
	var $number = parseInt(count);

	$('.js-events-slider').slick({
		infinite: false,
		slidesToShow: 3,
		arrows: false,
		slidesToScroll: 1,
		initialSlide: $number,
		responsive: [
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});

	$('.event__prev').on('click', function(){
		$('.js-events-slider').slick("slickPrev");
	});
	$('.event__next').on('click', function(){
		$('.js-events-slider').slick("slickNext");
	});
};


jQuery(function($){
	slider();
	TestimonialSlider();
	twoColSlider();
	imageGallery();
	events($('.first').first().attr('data-counter'));
});
