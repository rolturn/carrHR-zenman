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

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

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

	// checks to see if the URL is passing queries to filter testimonials
	if (urlParams && categories) {
		// establishes defaults
		page = 0;
		current_term = 'view-all';
		// redefining current_term if something has been passed
		if (urlParams.term_id) {
			// if term_id is passed just uses the term id for filtering
			current_term = isNaN(parseInt(urlParams.term_id)) ? 'view-all' : parseInt(urlParams.term_id);
		} else if (urlParams.category) {
			// if category name is passed searches through categories options added from module-taxonomy.php
			current_term = (categories.find( category => category.slug === urlParams.category)).termId;
		}
		// uses defaults to trigger work
		if (current_term === 'view-all') {
			$('.view-all').trigger('click').addClass('active');
		} else {
			term_ajax_get(current_term, page);
			$('.testimonials__navigation').find("[data-term='" + current_term + "']").addClass('active');
		}
	} else {
		// fall back if query was not set or categories didn't load
		$('.view-all').trigger('click').addClass('active');
	}

});
