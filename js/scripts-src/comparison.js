function comparisonator(wrapper) {
	var _uls, _lis, other,
		li_map = [];

	wrapper.each(function(i){
		_uls = $(this).find('ul');

		if (_uls.length === 2) {
			// equalize_height(_uls);

			// $(window).resize(function(){
			// 	equalize_height(_uls);
			// });

			_uls.each(function(i){
				_lis = $(this).children();
				li_map[i] = _lis;

				_lis.on('click mouseenter', function(e){
					var index = $(this).index();
					other = i ? 0 : 1;

					li_map[other].removeClass('flash');
					li_map[other][index].classList.add('flash');
				});
			});
		}
	});
};

// commenting this codes usage out but could be useful later
function equalize_height(uls){
	var lis1 = uls[0].children,
		lis2 = uls[1].children;

	for (var i = 0; i < lis1.length; i++) {
			var row1Height = $(lis1[i]).outerHeight(true);
		var row2Height = $(lis2[i]).outerHeight(true);

		var h = Math.max(row1Height, row2Height);
		lis1[i].style.height = h + 'px';
		lis2[i].style.height = h + 'px';
	}
}

jQuery(function($){
	var comparisons = $('.comparison__wrapper');

	if (comparisons.length){
		comparisonator(comparisons);
	}
});
