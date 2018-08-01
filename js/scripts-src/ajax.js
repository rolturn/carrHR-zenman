/*------------------------------------*\
	::Ajax Requests
\*------------------------------------*/

// get testimonials by term
var term_ajax_get = function(options, animate) {
	var $loader = $('.loading');
	var $pager = $('#pagination');
	var $wrapper = $(options.wrapper) || null;
	var postsPerPage = options.postsPerPage || 3;
	var page = options.page || 0;
	var name = options.name || null;
	var categoryName = options.categoryName || null;
	var termID = options.termID || null;
	var id = options.id || null;
	var tag = {
		slug: options.tag && options.tag.slug ?  options.tag.slug : null,
		name: options.tag && options.tag.name ?  options.tag.name : null,
	};
	var action = options.action || null;
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
			'page': page,
			'categoryName': categoryName,
			'postsPerPage': postsPerPage,
			'tag': tag.slug,
			'post_id': id,
			'name' : name,
		},
		success: function(response) {

			var res = JSON.parse(response);
			var totalPages = res['total_pages'] ? Math.ceil(parseFloat(res['total_pages'])) : 0;

			if (page > 0 && type === 'infiniteScroll'){
				$wrapper.append(res['output']);
			} else {
				$wrapper.html(res['output']);
			}

			$loader.hide();

			if (totalPages > 1) {
				$pager.html(buildPager(page, totalPages));
				var $pagerOptions = $pager.find('button');
				$pagerOptions.each(function() {
					$(this).not('.current').on('click', function(e) {
						e.preventDefault();
						options.page = $(this).val();
						term_ajax_get(options, true);
					})
				})
			}

			filterOptions('#category-filters', options, tag['slug'])

			// if (type !== 'infiniteScroll') {
				var urlUpdateObj = {
					page: page,
				}

				if (tag.slug !== null) urlUpdateObj['tag'] = tag.slug
				helpers.pushLocation(options, urlUpdateObj, function(stateUpdate) {
					stateUpdate['pushHistory'] = false;
					term_ajax_get(stateUpdate, true);
				});
			// }

			if (animate) {
				$('html, body').animate({
					scrollTop: $('.section-header').offset().top - 100
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
	var buttonClicked;
	var options = {
		page: 0,
		tag: {}
	};
	var urlParams = {};
	if (window.location.search.length > 0) {
		urlParams = helpers.urlParams;
	}

	$('.filters.dropdown').on('click', function() {
		$(this).toggleClass('is-active');
	})

	if ($('.post-category').length > 0) {
		options.wrapper = '.post-category .content';
		options.action = 'load-filter3';
		options.categoryName = $('.post-category').data('category-slug');

		options.page = urlParams.page !== 'undefined' ? urlParams.page : 0;
		if (urlParams.tag) options.tag['slug'] = urlParams.tag;

		term_ajax_get(options);
	}

	if ($('.testimonials__navigation').length > 0) {
		options.action = 'load-filter2';
		options.wrapper = '.testimonials__wrapper';
		options.type = 'infiniteScroll';
		getTestimonials();
	}

	function getTestimonials () {
		$('.testimonials__navigation').find('button').click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			options.termID = $(this).data('term');
			options.page = 0;
			$('.testimonials__wrapper').empty();
			term_ajax_get(options);

			console.log('hello', options.page)

			$('#testimonials__bottom').bind('inview', function (event, visible) {
				if (visible === true) {
					console.log(options.page)
					options.page = options.page + 1;
					term_ajax_get(options);
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
			term_ajax_get(options);
			$('.testimonials__navigation').find("[data-term='" + options.termID + "']").addClass('active');
		}
		else if (urlParams.postid) {
			// if category name is passed searches through categories options added from module-taxonomy.php
			var id = isNaN(parseInt(urlParams.postid)) ? 0 : parseInt(urlParams.postid);
			options['id'] = id;
			term_ajax_get(options);
		}
		else if (urlParams.individual) {
			options['name'] = urlParams.individual;
			term_ajax_get(options);
		}
		else {
			// fall back if query was not set or categories didn't load
			$('.view-all').trigger('click').addClass('active');
		}

		var getIndividual = urlParams.individual || urlParams.postid ? true : false;

		if (!getIndividual) {
			$('#testimonials__bottom').bind('inview', function (event, visible) {
				if (visible === true) {
					options.page++;
					term_ajax_get(options);
				}
			});
		}
	}
});

function filterOptions (filterButtonContainer, options, slug) {
	var $catFilters = $(filterButtonContainer);

	if ($catFilters.length === 0) return;
	var $buttons = $catFilters.find('button');
	var $selectedTopic = $catFilters.find('.trigger');
	var slug = slug || null;

	if ($buttons.length > 0) {
		$buttons.each(function() {
			var $this = $(this);

			if ($this.hasClass('current')) $this.removeClass('current');

			if (slug) {
				if (helpers.slugify($this.val()) === slug) {
					$this.addClass('current');
					if ($selectedTopic.length > 0) $selectedTopic.text('Filtered By ' + $this.text());
					$this.addClass('current')
				}
			} else {
				$selectedTopic.text('Select a Topic');
			}

			$this.not('.current').on('click', function(e) {
				e.preventDefault();
				options.page = 0;
				options.tag = {
					name: $this.text(),
					slug: helpers.slugify($this.val()),
				};
				term_ajax_get(options, true);
			})
		})
	}
	if ($selectedTopic.is(':hidden')) $selectedTopic.show();
}


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
