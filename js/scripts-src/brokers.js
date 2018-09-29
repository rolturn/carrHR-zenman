
var $brokerRegions = $('section.brokers');
if ($brokerRegions.length > 0 && helpers.findParam('region')) {
	var primary = $brokerRegions.find('.' + helpers.findParam('region'))
	primary.remove();
	primary.clone().prependTo('section.brokers')
}

var $brokerContactContainer = $('.contact-info-container');
if ($brokerContactContainer.length > 0) {
	$.each($brokerContactContainer, function() {
		var $contactContainer = $(this);
		var $contactsInfo = $contactContainer.find('.contact-info');
		var $contactReveal = $contactContainer.find('.contact-info-reveal');

		$.each($contactsInfo, function() {
			var contactString = $(this).attr('data-contact-info');
			$(this).hover(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				$contactReveal.addClass('active');
				$contactReveal.html(contactString);
			})
		});
	});
}

/*------------------------------------*\
    ::Broker Filter
\*------------------------------------*/
var filterBrokers = function(){
	var $filters = $('#js-broker-filter').find('input'),
		$brokers = $('.js-broker');

	$filters.on('change', function(evt){
		var chosen = evt.target.value;

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
