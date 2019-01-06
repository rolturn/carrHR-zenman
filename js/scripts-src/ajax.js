/*------------------------------------*\
	::Ajax Requests
\*------------------------------------*/

// get testimonials by term
var term_ajax_get = function(options, animate, callback) {
	var $loader = $('.loading');
	var $pager = $('#pagination');
	var $wrapper = $(options.wrapper) || null;
	var postsPerPage = options.postsPerPage || 8;
	var page = options.page || 0;
	var name = options.name || null;
	var categoryName = options.categoryName || null;
	var term = {
		id: options.term && options.term.id ? options.term.id : null,
		name: options.term && options.term.name ? options.term.name : null,
		slug: options.term && options.term.slug ? options.term.slug : null,
	};
	var postID = options.postID || null;
	var tag = {
		slug: options.tag && options.tag.slug ?  options.tag.slug : null,
		name: options.tag && options.tag.name ?  options.tag.name : null,
	};
	var action = options.action || null;
	var type = options.type || null;

	$loader.addClass('active');

	if (type !== 'infiniteScroll') {
		// reset pager with each load;
		$wrapper.html('');
		$pager.html('');
	}

	$.ajax({
		type: 'POST',
		url: ajax_posts.ajaxurl,
		data: {
			'action': action,
			'term': term.id,
			'page': page,
			'categoryName': categoryName,
			'postsPerPage': postsPerPage,
			'tag': tag.slug,
			'postID': postID,
			'name' : name,
		},
		success: function(response) {
			var res = JSON.parse(response);
			var totalPages = res['total_pages'] ? Math.ceil(parseFloat(res['total_pages'])) : 0;

			if (page > 0 && type === 'infiniteScroll'){
				$wrapper.append(res.output);
			} else {
				$wrapper.html(res.output);
			}

			if (totalPages > 1) {
				$pager.html(buildPager(page, totalPages));
				var $pagerOptions = $pager.find('button');
				$pagerOptions.each(function() {
					$(this).not('.current').on('click', function(e) {
						e.preventDefault();
						options.page = $(this).val();
						options.pushed = false;
						term_ajax_get(options, true);
					})
				})
			}

			var urlUpdateObj = { }

			if (tag.slug !== null) urlUpdateObj['tag'] = tag.slug;
			if (term.slug !== null) urlUpdateObj['category'] = term.slug;
			if (term.id !== null) urlUpdateObj['id'] = term.id;
			if (postID !== null) urlUpdateObj['postID'] = postID;
			if (name !== null) urlUpdateObj['name'] = name;
			urlUpdateObj['page'] = page;

			helpers.pushLocation(options, urlUpdateObj, function(stateUpdate) {
				term_ajax_get(stateUpdate, true);
				filterOptions('#category-filters', stateUpdate);
				filterTestOptions('.testimonials__navigation', stateUpdate)
			});

			if (animate) {
				$('html, body').animate({
					scrollTop: $('.section-header').offset().top - 100
				}, 500);
			}

			$loader.removeClass('active');
			if (callback) callback();

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
		tag: {},
		term: {},
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
		if (urlParams.id) options.term['id'] = urlParams.id;

		term_ajax_get(options);
		filterOptions('#category-filters', options, true)
	}

	if ($('.testimonials__navigation').length > 0) {
		options.action = 'load-filter2';
		options.wrapper = '.testimonials__wrapper';
		options.type = 'infiniteScroll';
		getTestimonials(options);
	}

	function getTestimonials (options) {
		var $list = $('.testimonials__inner');
		var $filters  = $('.testimonials__navigation');
		options['bottom'] = 0;
		options['loadMore'] = true;

		// checks to see if the URL is passing queries to filter testimonials
		// categories options added from module-taxonomy.php
		if (urlParams.termID || urlParams.category) {
			options.term = urlParams.category ? (categories.find( category => category.slug === urlParams.category)) : (categories.find( category => category.id === parseInt(urlParams.termID)));
			// add active class with located term
			$('.testimonials__navigation').find("[value='" + options.term.id + "']").addClass('active');
		} else if (urlParams.postID) {
			options['postID'] = isNaN(parseInt(urlParams.postID)) ? 0 : parseInt(urlParams.postID);
			options.loadMore = false;
		} else if (urlParams.individual) {
			options['name'] = helpers.slugify(urlParams.individual);
			options.loadMore = false;
		} else {
			$('.view-all').addClass('active')
		}

		term_ajax_get(options);

		$filters.bind('inview', function (event, visible) {
			if (visible === true) {
				$totop.removeClass('visible');
			} else {
				$totop.addClass('visible');
			}
		});

		$totop.click(function() {
			$('html, body').animate({scrollTop: 0}, 800);
		});

		if (options.loadMore) {
			var last_known_scroll_position = 0;
			var run = true;

			function doSomething() {
			  // do something with the scroll position
				options['page'] = options.page + 1;
				term_ajax_get(options, false, function () {
					options['bottom'] = getBottom()
					run = true;
				});
			}
			window.addEventListener('scroll', function(e) {
				last_known_scroll_position = window.scrollY;
			  if (run && options.bottom < last_known_scroll_position) {
			    window.requestAnimationFrame(function() {
						run = false;
			      doSomething();
			    });
			  }
			});
		}

		filterTestOptions('.testimonials__navigation', options, true)
	}
});

function getBottom () {
	var $list = $('.testimonials__inner');
	return $list.position().top + $list.outerHeight(true) - 600;
}

function filterTestOptions(filterButtonList, options, init) {
	var $filter = $(filterButtonList);
	var $buttons = $filter.find('button');
	var slug = categories.find( category => category.id === parseInt(options.term.id));

	$buttons.each(function() {
		var $this = $(this);
		if (slug && parseInt($this.val()) === slug.id) {
			$this.addClass('active').siblings().removeClass('active');
		}

		if (init) {
			$this.click(function() {
				$this.addClass('active').siblings().removeClass('active');
				resetOptions(options)
				options['term'] = categories.find( category => category.id === parseInt($this.val()));
				options['page'] = 0;
				term_ajax_get(options, false, function() {
					options['bottom'] = getBottom();
				});
			})
		}
	})

	function resetOptions (options) {
		// var options = options || {};
		options['page'] = 0;
		options['name'] = null;
		options['postID'] = null;
		options['loadMore'] = true;
		return options;
	}
}

function filterOptions (filterButtonContainer, options, initClicks) {
	var $catFilters = $(filterButtonContainer);
	if (options.tag) var slug = options.tag.slug
	if (options.term) var slug = options.term.id

	if ($catFilters.length === 0) return;
	var $buttons = $catFilters.find('button');
	var $selectedTopic = $catFilters.find('.trigger');
	var slug = slug || null;

	if ($buttons.length > 0) {
		$buttons.each(function() {
			var $this = $(this);

			if (slug) {
				if (helpers.slugify($this.val()) === slug) {
					$this.addClass('current').siblings().removeClass('current');
					if ($selectedTopic.length > 0) $selectedTopic.text($this.text());
				}
			} else {
				$selectedTopic.text('Select a Series');
			}

			if (initClicks) {
				$this.on('click', function(e) {
					e.preventDefault();
					if ($this.hasClass('current')) return false;
					options.page = 0;
					options.tax = $this.attr('data-taxonoomy');
					options.term = {
						name: $this.text(),
						id: $this.val(),
						// slug: helpers.slugify($this.text()),
					};
					term_ajax_get(options, true);
					$this.addClass('current').siblings().removeClass('current');
					// update topic message
					if ($selectedTopic.length > 0) {
						if ($this.val()) {
							// $selectedTopic.text($this.text());
						} else {
							$selectedTopic.text('Select a Series');
						}
					}
				})
			}
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
		if (range[i] === 1 && idealRange < (currentPage - (idealRange + 1))) {
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
