/*------------------------------------*\
	::Ajax Requests
\*------------------------------------*/

// get testimonials by term
var term_ajax_get = function(options, currentPage, animate) {
	var $selectedTopic = $('.selected-topic');
	var $loader = $('.loading');
	var $pager = $('#pagination');
	var postsPerPage = options.postsPerPage || 6;
	var name = options.name || null;
	var categoryName = options.categoryName || null;
	var termID = options.termID || null;
	var id = options.id || null;
	var tag = {
		slug: options.tag && options.tag.slug ?  options.tag.slug : null,
		name: options.tag && options.tag.name ?  options.tag.name : null,
	};
	var action = options.action || null;
	var $wrapper = options.$wrapper || null;
	var type = options.type || null;

	if (type !== 'infiniteScroll') {
		// reset pager with each load;
		$wrapper.html('');
		$pager.html('');
	}

	$loader.show();

	$.ajax({
		type: 'POST',
		url: ajax_posts.ajaxurl,
		data: {
			'action': action,
			'term': termID,
			'page': currentPage,
			'categoryName': categoryName,
			'postsPerPage': postsPerPage,
			'tag': tag.slug,
			'post_id': id,
			'name' : name,
		},
		success: function(response) {

			var res = JSON.parse(response);
			var totalPages = res['total_pages'] ? Math.round(parseFloat(res['total_pages'])) : 0;

			if (currentPage > 0 && type === 'infiniteScroll'){
				$wrapper.append(res['output']);
			} else {
				$wrapper.html(res['output']);
			}

			if ($selectedTopic.length > 0) {
				tag = tag.slug === null ? 'Select a Topic' : 'Filtered By ' + tag.name;
				$selectedTopic.text(tag);
				$selectedTopic.show();
			}

			$loader.hide();

			if (totalPages > 1) {
				$pager.html(buildPager(currentPage, totalPages));
				var $pagerOptions = $pager.find('button');
				$pagerOptions.each(function() {
					$(this).not('.current').on('click', function(e) {
						e.preventDefault();
						term_ajax_get(options, $(this).val(), true);
					})
				})
			}

			if (animate) {
				$('html, body').animate({
					scrollTop: $('.section-header').offset().top
				}, 500);
			}

			return false;
		},
		error: function(err) {
			console.error(err)
		}
	});
}

var urlParams = helpers.urlParams;

// implementation
$(document).ready(function() {
	var $totop = $('.scrolltoTop');
	var page = 0;
	var buttonClicked;
	var options = {};

	$('.filters.dropdown').on('click', function() {
		$(this).toggleClass('is-active');
	})
	// $('.filters.dropdown').hover(function() {
	// 	$(this).toggleClass('is-active');
	// })

	if ($('.post-category').length > 0) {
		var $catFilters = $('#category-filters');
		var $buttons = $catFilters.find('button');
		options.$wrapper = $('.post-category .content');
		options.action = 'load-filter3';
		options.categoryName = $('.post-category').data('category-slug');

		term_ajax_get(options, 0);

		if ($buttons.length > 0) {
			$buttons.each(function() {
				$(this).not('.current').on('click', function(e) {
					e.preventDefault();
					options.tag = {
						name: $(this).text(),
						slug: helpers.slugify($(this).val()),
					};
					term_ajax_get(options, page, true);
					$buttons.each(function() {
						$(this).removeClass('current');
					})
					$(this).addClass('current');

				})
			})
		}
	}

	if ($('.testimonials__navigation').length > 0) {
		options.action = 'load-filter2';
		options.$wrapper = $('.testimonials__wrapper');
		options.type = 'infiniteScroll';
		getTestimonials();
	}

	function getTestimonials () {
		$('.testimonials__navigation').find('button').click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			options.termID = $(this).data('term');
			page = 0;
			$('.testimonials__wrapper').empty();
			term_ajax_get(options, page);

			$('#testimonials__bottom').bind('inview', function (event, visible) {
				if (visible === true) {
					page++;
					term_ajax_get(options, page);
				}
			});
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

		// checks to see if the URL is passing queries to filter testimonials
		if (urlParams.term_id || urlParams.category) {
			if (urlParams.term_id) {
				// if term_id is passed just uses the term id for filtering
				options.termID = isNaN(parseInt(urlParams.term_id)) ? 'view-all' : parseInt(urlParams.term_id);
			} else if (urlParams.category) {
				// if category name is passed searches through categories options added from module-taxonomy.php
				options.termID = (categories.find( category => category.slug === urlParams.category)).termId;
			}
			term_ajax_get(options, page);
			$('.testimonials__navigation').find("[data-term='" + options.termID + "']").addClass('active');
		}
		else if (urlParams.postid) {
			// if category name is passed searches through categories options added from module-taxonomy.php
			var id = isNaN(parseInt(urlParams.postid)) ? 0 : parseInt(urlParams.postid);
			term_ajax_get({ 'id': id }, page);
		}
		else if (urlParams.individual) {
			term_ajax_get({ 'name': urlParams.individual }, page);
		}
		else {
			// fall back if query was not set or categories didn't load
			$('.view-all').trigger('click').addClass('active');
		}

		var getIndividual = urlParams.individual || urlParams.postid ? true : false;

		if (!getIndividual) {
			$('#testimonials__bottom').bind('inview', function (event, visible) {
				if (visible === true) {
					page++;
					term_ajax_get(options, page);
				}
			});
		}
	}
});

function buildPager (currentPage, totalPages) {
	var currentPage = parseInt(currentPage) + 1;
	var idealRange = 1;
	var start = currentPage - idealRange;
	var end = idealRange + currentPage;
	var pagerRange = {
		start: start < 1 ? 1 : start,
		end: end > totalPages ? totalPages : end,
	}
	var range = _.range(pagerRange.start, pagerRange.end + 1);
	if (!_.includes(range, 1)) {
		range.unshift(1);
	}
	if (!_.includes(range, totalPages)) {
		range.push(totalPages);
	}

	// built links
	var result = '';
	var i = 0;
	do {
		var pageTitle = range[i];
		// replacing 0 index
		var page = range[i] - 1;
		// convert to words on first or last
		if (range[i] === 1 && idealRange < (currentPage - idealRange)) {
			pageTitle = 'Newer';
		} else if (range[i] === totalPages && totalPages > (currentPage + idealRange + 1)) {
			pageTitle = 'Older(' + range[i] + ')';
		}
		// make buttons and add current to current page
		if (page === currentPage - 1) {
			result +=`<button class="current" value="${page}">${pageTitle}</button>`;
		} else {
			result += `<button value="${page}">${pageTitle}</button>`;
		}
		i++;
	} while (range[i]);

	return result;
}
