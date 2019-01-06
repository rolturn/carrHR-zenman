var handleStateDropdownSelection = function () {
	$('#broker-state-select').change(function () {
		if (window.innerWidth <= 800 || typeof map === 'undefined') {
			window.location.assign(site.site_url + '/commercial-real-estate-agent/' + stateNameFromAbbr(this.value));
		} else {
			zoomToState(this.value);
		}
	});
};


var zoomToState = function (stateAbbr) {
	if (!stateShapes.hasOwnProperty(stateAbbr)){return false;}

	map.data.revertStyle();
	map.data.overrideStyle(stateShapes[stateAbbr], { fillColor: hoverColor });

	if (stateBounds.hasOwnProperty(stateAbbr)){
		map.fitBounds(stateBounds[stateAbbr]);
	} else {
		var _bounds = new google.maps.LatLngBounds();

		stateShapes[stateAbbr].getGeometry().forEachLatLng(function(path) {
			_bounds.extend(path);
		});

		if (_bounds){
			stateBounds[stateAbbr] = _bounds;
			map.fitBounds(_bounds);
		}
	}
	stateZoom = map.getZoom();

	// $('.broker-verticals').show();

	if (brokersFetched.indexOf(stateAbbr) < 0) {
		$.post(postURL, { 'stateAbbr' : stateAbbr }, function(brokers) {
			var	marker,
				broker,
				regions = [],
				brokerData = $.parseJSON(brokers);

			var brokerRegions = _.groupBy(brokerData, 'brokerRegion');

			$.each(brokerRegions, function(i, region) {
				var stateSlug = helpers.slugify(region[0].brokerState.label);
				var regionSlug = helpers.slugify(i);
				var brokerLng = _.meanBy(region, function(lng) {
					return parseFloat(lng.brokerLng);
				});
				var brokerLat = _.meanBy(region, function(lat) {
					return parseFloat(lat.brokerLat);
				});
				var brokerCount = region.length > 1 ? ', '+ (region.length).toString() + ' Brokers' : '';
				regions.push({
					lat: brokerLat,
					lng: brokerLng,
					title: i + brokerCount,
					count: brokerCount,
					url: site.site_url + '/commercial-real-estate-agent/' + stateSlug + '?region=' + regionSlug,
				})
			});

			$.each(regions, function (i, region) {
				marker = new google.maps.Marker({
					icon: {
						size: new google.maps.Size(33, 42),
						scaledSize: new google.maps.Size(33, 42),
						url: site.theme_url+'/images/FindaBroker_Icon_2.png'
					},
					position: new google.maps.LatLng(region.lat, region.lng),
					title: region.title,
					url: region.url,
					map: map,
				});

				markers.push(marker);
				marker.addListener('click', function() {
					window.location.href = this.url
				});

			});

			brokersFetched.push(stateAbbr);
		});
	}

	var stateName = stateNameFromAbbr(stateAbbr);
	if (stateName){
		$('#brokers-state-link').text('See Our ' + statesWithBrokerCoverage[stateAbbr] + ' Team ').prop('href', site.site_url + '/commercial-real-estate-agent/' + stateName).fadeIn();
	} else {
		// failsafe if clickable element loaded but there is no coverage. This should never happen.
		$('#brokers-state-link').text('No Brokers Available').prop('href', '#').fadeIn();
	}
};


var stateNameFromAbbr = function(abbr){
	var _name = '';
	if (statesWithBrokerCoverage.hasOwnProperty(abbr)){
		_name = statesWithBrokerCoverage[abbr];
	}
	return helpers.slugify(_name);
}


jQuery(function($) {
	// captureActiveVerticals();
	handleStateDropdownSelection();
});
