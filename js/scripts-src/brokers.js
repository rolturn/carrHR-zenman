
var $brokerRegions = $('section.brokers');
if ($brokerRegions.length > 0 && helpers.findParam('region')) {
	var primary = $brokerRegions.find('.' + helpers.findParam('region'))
	primary.remove();
	primary.clone().prependTo('section.brokers')
}

/*------------------------------------*\
    ::Broker Filter
\*------------------------------------*/
var filterBrokers = function(){
	var $filters = $('#js-broker-filter').find('input'),
		$brokers = $('.js-broker');

	$filters.on('change', function(evt){
		var chosen = evt.target.value;
		console.log(chosen);

		$brokers.addClass('hidden');

		if (chosen === 'all'){
			$brokers.removeClass('hidden');
		} else {
			$brokers.each(function(){
				var $broker = $(this);

				if ($.inArray(chosen, $broker.data('verticals')) > -1){
					$broker.removeClass('hidden');
				}
			});
		}
	});
};

jQuery(function($){
	filterBrokers();
});
