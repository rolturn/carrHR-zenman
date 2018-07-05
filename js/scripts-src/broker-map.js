var slugify = function (text) {
	return text.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}

// var buildMarkerInfoWindowContent = function (broker) {
// 	var popup = '<article class="info-window"><div class="info-window__heading">';
//
// 	if (broker.brokerPhotoURL) {
// 		popup += '<div class="info-window__image" style="background-image:url(' + broker.brokerPhotoURL['src'] + ');"></div>';
// 	}
//
// 	popup += '<div><h2 class="info-window__title">' + broker.brokerName + '</h2>';
//
// 	if (broker.brokerRegion) {
// 		popup += '<span class="info-window__info info-window__info--region">' + broker.brokerRegion + '</span>';
// 	}
//
// 	if (broker.license) {
// 		popup += '<span class="info-window__info info-window__info--region">' + broker.license + '</span>';
// 	}
//
// 	popup += '</div></div>';
//
// 	if (broker.brokerPhone) {
// 		popup += '<a class="info-window__info info-window__link" href="tel: ' + broker.brokerPhone + '">' + broker.brokerPhone + '</a>';
// 	}
//
// 	if (broker.brokerEmail) {
// 		popup += '<a class="info-window__info info-window__link" href="mailto: ' + broker.brokerEmail + '">' + broker.brokerEmail + '</a>';
// 	}
//
// 	if (broker.brokerBio) {
// 		popup += '<p class="info-window__info">' + broker.brokerBio + '</p>';
// 	}
//
// 	if (broker.brokerVerticals) {
// 		popup += '<ul class="info-window__list">';
//
// 		if (broker.brokerVerticals.length === verticalCount) {
// 			popup += '<li>All Healthcare Industries</li>';
// 		} else {
// 			for (var i = 0, l = broker.brokerVerticals.length; i < l; i++) {
// 				popup += '<li>' + broker.brokerVerticals[i] + '</li>';
// 			}
// 		}
//
// 		popup += '</ul>';
// 	}
//
// 	if (broker.brokerState) {
	// 		var stateSlug = slugify(broker.brokerState.label);
// 		popup += '<a href="'+site.site_url + '/commercial-real-estate-agent/' + stateSlug + '" class="button info-window__all">See Our '+broker.brokerState.label+' Team</a>';
// 	}
//
// 	popup += '</article>';
//
// 	return popup;
// };


var captureActiveVerticals = function () {
	$('.broker-verticals').change(function (evt) {
		filterMarkers(evt.target.value);
	});
};


var filterMarkers = function (vertical) {
	// if (vertical !== 'all' && activeInfoWindowVerticals && activeInfoWindowVerticals.indexOf(vertical) < 0){
	// 	infoWindow.close();
	// }

	var totalMarkers = markers.length;
	for (var i = 0, newmarkers = []; i < totalMarkers; i++) {
		if (vertical === 'all'){
			markers[i].setMap(map);
			newmarkers.push(markers[i]);
		} else {
			if (markers[i].category.indexOf(vertical) > -1){
				markers[i].setMap(map);
				newmarkers.push(markers[i]);
			} else {
				markers[i].setMap(null);
			}
		}
	}
};


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

	$('.broker-verticals').show();

	if (brokersFetched.indexOf(stateAbbr) < 0) {
		console.log('brokersFetched',brokersFetched);
		$.post(postURL, { 'stateAbbr' : stateAbbr }, function(brokers) {
			console.log('brokers',brokers);
			var	marker,
				broker,
				regions = [],
				brokerData = $.parseJSON(brokers);

			var brokerRegions = _.groupBy(brokerData, 'brokerRegion');

			$.each(brokerRegions, function(i, region) {
				var category = [];
				var stateSlug = slugify(region[0].brokerState.label);
				var regionSlug = slugify(i);
				var brokerLng = _.meanBy(region, function(lng) {
					return parseFloat(lng.brokerLng);
				});
				var brokerLat = _.meanBy(region, function(lat) {
					return parseFloat(lat.brokerLat);
				});
				$.each(region, function(key, r) {
					category.push(r.brokerVerticals)
				})
				var brokerCount = region.length > 1 ? ', '+ (region.length).toString() + ' Brokers' : '';
				regions.push({
					lat: brokerLat,
					lng: brokerLng,
					title: i + brokerCount,
					category: _.uniq(_.flatten(category)),
					count: brokerCount,
					url: site.site_url + '/commercial-real-estate-agent/' + stateSlug + '?region=' + regionSlug,
				})
			});

			$.each(regions, function (i, region) {
				marker = new google.maps.Marker({
					category: region.category,
					icon: {
						size: new google.maps.Size(48, 48),
						scaledSize: new google.maps.Size(48, 48),
						url: site.theme_url+'/images/FindaBroker_Icon.png'
					},
					// map: map,
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
		$('#brokers-state-link').text('See Our ' + stateNames[stateAbbr] + ' Team').prop('href', site.site_url + '/commercial-real-estate-agent/' + stateName).fadeIn();
	}
};


var stateNameFromAbbr = function(abbr){
	var _name = '';
	if (stateNames.hasOwnProperty(abbr)){
		_name = stateNames[abbr];
	}
	return slugify(_name);
}


jQuery(function($) {
	captureActiveVerticals();
	handleStateDropdownSelection();
});
