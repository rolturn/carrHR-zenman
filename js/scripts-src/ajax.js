/*------------------------------------*\
	::Ajax Requests
\*------------------------------------*/

// get testimonials by term
var term_ajax_get = function(termID, page) {
	$('.testimonials__loading').show();
	$.ajax({
		type: 'POST',
		url: ajax_posts.ajaxurl,
		data: {
			'action': 'load-filter2',
			'term': termID,
			'page': page
		},
		success: function(response) {
			if (page > 0){
				$('.testimonials__wrapper').append(response);
			} else {
				$('.testimonials__wrapper').html(response);
			}
			$('.testimonials__loading').hide();
			return false;
		}
	});
}

// implementation
$(document).ready(function() {
	var $totop = $('.scrolltoTop'),
		page,
		current_term;

	$('#testimonials__bottom').bind('inview', function (event, visible) {
		if (visible === true) {
			page++;
			term_ajax_get(current_term, page);
		}
	});

	$('.testimonials__navigation').bind('inview', function (event, visible) {
		if (visible === true) {
			$totop.removeClass('visible');
		} else {
			$totop.addClass('visible');
		}
	});

	$totop.click(function() {
		$('html, body').animate({scrollTop: 0}, 800);
	});

	$('.testimonials__navigation').find('button').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		current_term = $(this).data('term');
		page = 0;
		$('.testimonials__wrapper').empty();
		term_ajax_get(current_term, page);
	});

	$('.view-all').trigger('click');
});
