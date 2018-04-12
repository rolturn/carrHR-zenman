var slugify = function (text) {
	return text.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}


var buildMarkerInfoWindowContent = function (broker) {
	var popup = '<article class="info-window"><div class="info-window__heading">';

	if (broker.brokerPhotoURL) {
		popup += '<div class="info-window__image" style="background-image:url(' + broker.brokerPhotoURL['src'] + ');"></div>';
	}

	popup += '<div><h2 class="info-window__title">' + broker.brokerName + '</h2>';

	if (broker.brokerRegion) {
		popup += '<span class="info-window__info info-window__info--region">' + broker.brokerRegion + '</span>';
	}

	if (broker.license) {
		popup += '<span class="info-window__info info-window__info--region">' + broker.license + '</span>';
	}

	popup += '</div></div>';

	if (broker.brokerPhone) {
		popup += '<a class="info-window__info info-window__link" href="tel: ' + broker.brokerPhone + '">' + broker.brokerPhone + '</a>';
	}

	if (broker.brokerEmail) {
		popup += '<a class="info-window__info info-window__link" href="mailto: ' + broker.brokerEmail + '">' + broker.brokerEmail + '</a>';
	}

	if (broker.brokerBio) {
		popup += '<p class="info-window__info">' + broker.brokerBio + '</p>';
	}

	if (broker.brokerVerticals) {
		popup += '<ul class="info-window__list">';

		if (broker.brokerVerticals.length === verticalCount) {
			popup += '<li>All Healthcare Industries</li>';
		} else {
			for (var i = 0, l = broker.brokerVerticals.length; i < l; i++) {
				popup += '<li>' + broker.brokerVerticals[i] + '</li>';
			}
		}

		popup += '</ul>';
	}

	if (broker.brokerState) {
		var stateSlug = slugify(broker.brokerState.label);
		popup += '<a href="'+site.site_url + '/find-an-agent/' + stateSlug + '" class="button info-window__all">See Our '+broker.brokerState.label+' Team</a>';
	}

	popup += '</article>';

	return popup;
};


var captureActiveVerticals = function () {
	$('.broker-verticals').change(function (evt) {
		filterMarkers(evt.target.value);
	});
};


var filterMarkers = function (vertical) {
	if (vertical !== 'all' && activeInfoWindowVerticals && activeInfoWindowVerticals.indexOf(vertical) < 0){
		infoWindow.close();
	}

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

	markerCluster.clearMarkers();
	markerCluster.addMarkers(newmarkers);
};


var handleStateDropdownSelection = function () {
	$('#broker-state-select').change(function () {
		if (window.innerWidth <= 800 || typeof map === 'undefined') {
			window.location.assign(site.site_url + '/find-an-agent/' + stateNameFromAbbr(this.value));
		} else {
			zoomToState(this.value);
		}
	});
};


var zoomToState = function (stateAbbr) {
	infoWindow.close();

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
		$.post(postURL, { 'stateAbbr' : stateAbbr }, function(brokers) {
			var	marker,
				broker,
				brokerData = $.parseJSON(brokers);

			$.each(brokerData, function (i, broker) {
				marker = new google.maps.Marker({
					category: broker.brokerVerticals,
					icon: {
						size: new google.maps.Size(48, 48),
						scaledSize: new google.maps.Size(48, 48),
						url: site.theme_url+'/images/FindaBroker_Icon.png'
					},
					// map: map,
					position: new google.maps.LatLng(broker.brokerLat, broker.brokerLng),
					title: broker.brokerName
				});

				markers.push(marker);

				// close other info windows and open one for current marker
				marker.addListener('click', function() {
					activeInfoWindowVerticals = broker.brokerVerticals;
					infoWindow.close();
					infoWindow.setContent(buildMarkerInfoWindowContent(broker));
					map.panTo(this.getPosition());
					infoWindow.open(map, this);
				});

			});

			markerCluster = new MarkerClusterer(map, markers, {
				styles: [{
					height: 48,
					width: 48,
					url: site.theme_url+"/images/FindaBroker_Cluster.png",
					textColor: "#003773"
				}],
				gridSize: 40
				// minimumClusterSize: 2
			});

			brokersFetched.push(stateAbbr);
		});
	}

	infoWindow.addListener('closeclick', function(){
		if (map.getZoom() - stateZoom > 0){
			map.panTo(this.getPosition());
			// map.fitBounds(stateBounds);
		} else {
			map.panTo(stateBounds.getCenter());
		}
	});

	var stateName = stateNameFromAbbr(stateAbbr);
	if (stateName){
		$('#brokers-state-link').text('See Our ' + stateNames[stateAbbr] + ' Team').prop('href', site.site_url + '/find-an-agent/' + stateName).fadeIn();
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
