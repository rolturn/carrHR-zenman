<?php
/**
 *  Get a list of all brokers in the database. If none returned, don't show the map at all.
 *  Build a list of states served by brokers and modify the dropdown options and map accordingly.
 */
$states_with_broker_coverage = array();

$brokers = new WP_Query(
	array(
		'post_type' => 'brokers',
		'nopaging' => true,
	)
);

if ( $brokers->have_posts() ) :
	while ( $brokers->have_posts() ) :
		$brokers->the_post();
		$_state = get_field('broker_state');
		$states_with_broker_coverage[$_state['value']] = $_state['label'];
	endwhile;

	asort($states_with_broker_coverage);

	wp_reset_postdata();
endif;
?>

<script>
	// loading this here because it is needed for "Choose your state" dropdown.
	var	statesWithBrokerCoverage = <?php echo json_encode($states_with_broker_coverage); ?>;
</script>

<?php if ($states_with_broker_coverage) : ?>
	<?php
	$map_overlay_default = $map_overlay_hover = $map_overlay_opacity = $map_stroke_color = $map_stroke_width = null;

	foreach (get_sub_field('map_overlay') as $setting) :
		$map_overlay_default = $setting['default'];
		$map_overlay_hover = $setting['hover'];
		$map_overlay_opacity = $setting['opacity'] / 100;
	endforeach;

	foreach (get_sub_field('map_stroke') as $setting) :
		$map_stroke_color = $setting['color'];
		$map_stroke_width = $setting['width'];
	endforeach;

	$this_state = get_post_field('post_name', get_post());
	?>

	<div class="broker-dropdown broker-dropdown__inner">
		<label for="broker-state-select">Choose Your State
			<select id="broker-state-select">
				<option value="">...</option>
				<?php
				foreach ($states_with_broker_coverage as $_value => $_label){
					$selected = '';
					if ($this_state && $this_state === sanitize_title_with_dashes($_label)){
						$selected = ' selected';
					}
					echo '<option value="'. $_value .'"'. $selected .'>'. $_label .'</option>';
				}
				?>
			</select>
		</label>
	</div>

	<?php
	// add the map on the parent page, not on the subpages
		if ( is_page( 'commercial-real-estate-agent' )):
	?>
	<div class="broker-map__inner">
		<div class="broker-map">
			<div class="google-embedded-map broker-map__map" id="carr-broker-map"></div>
			<a id="brokers-state-link" class="button"></a>
			<script>
				var brokersFetched = [],
					infoWindow,
					activeInfoWindowVerticals,
					verticalCount = <?php echo count(get_terms('vertical')); ?>,
					map,
					marker,
					markers = [],
					stateZoom,
					stateBounds = [],
					stateShapes = [],
					hoverColor = '<?php echo $map_overlay_hover; ?>',
					postURL = '<?php echo get_bloginfo('template_url'); ?>/functions/fetch-brokers-by-state.php',
					styles = [
							{
								featureType: 'administrative',
								elementType: 'labels.text.fill',
								stylers: [{color: '#444444'}]
							},
							{
								featureType: "landscape",
								elementType: "all",
								stylers: [{color: "#f2f2f2"}]
							},
							{
								featureType: "landscape.natural",
								elementType: "all",
								stylers: [{visibility: "simplified"}]
							},
							{
								featureType: "poi",
								elementType: "all",
								stylers: [{visibility: "off"}]
							},
							{
								featureType: "road",
								elementType: "all",
								stylers: [{visibility: "off"}]
							},
							{
								featureType: "transit",
								elementType: "all",
								stylers: [{visibility: "off"}]
							},
							{
								featureType: "water",
								elementType: "geometry.fill",
								stylers: [{color: "#ccd7e3"}]
							}
						];

				function initMap() {
					if (window.innerWidth < 801) { return false; }

					map = new google.maps.Map(document.getElementById('carr-broker-map'), {
						mapTypeId: 'roadmap',
						gestureHandling: 'auto',
						styles: styles,
						mapTypeControl: false,
						streetViewControl: false,
						fullscreenControl: false,
						center: new google.maps.LatLng(37.5, -96),
						zoom: 4.5,
						maxZoom: 14,
						zoomControl: true,
						zoomControlOptions: {
							position: google.maps.ControlPosition.TOP_LEFT
						}
					});

					/**
					 *  Loads all states with in US in single loadGeoJson file then removes states without broker coverage
					 *  modified to this because server couldn't handle loading all files before loading
					 *
					 *  JSON Source: https://github.com/johan/world.geo.json/tree/master/countries/USA
					 *  Docs: https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
					 */
					map.data.loadGeoJson('<?php echo get_bloginfo('template_url'); ?>/json/US.geo.json', {}, function (feature) {
						var i = 0;
						do {
							if (!statesWithBrokerCoverage[feature[i].j.slice(-2)]) {
								map.data.remove(feature[i]);
							}
							i++;
						} while (feature[i]);
					});

					map.data.setStyle({
						fillColor: '<?php echo $map_overlay_default; ?>',
						fillOpacity: <?php echo $map_overlay_opacity; ?>,
						strokeColor: '<?php echo $map_stroke_color; ?>',
						strokeWeight: <?php echo $map_stroke_width; ?>
					});

					/**
					 *  For each state polygon on the map, determine the outer lat/lng coordinates and create
					 *  a new "bounds" property for each. This allows tracking of clicks within a rectangular
					 *  bounding box that is drawn around each state.
					 */
					google.maps.event.addListener(map.data, 'addfeature', function (e) {
						stateShapes[e.feature.j.slice(-2)] = e.feature;
					});

					/**
					 *  Listen for click events on each state polygon
					 */
					google.maps.event.addListener(map.data, 'click', function (e) {
						zoomToState(e.feature.j.slice(-2));
					});

					/**
					 *  Apply mouse hover effects to individual state polygons
					 */
					map.data.addListener('mouseover', function (e) {
						map.data.revertStyle();
						map.data.overrideStyle(e.feature, { fillColor: hoverColor });
					});
					map.data.addListener('mouseout', function (e) {
						map.data.revertStyle();
						map.data.overrideStyle(e.feature, { fillColor: '<?php echo $map_overlay_default; ?>' });
					});
				}
			</script>
			<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDVilPsOL1nTf9yfV0EMDKS_Het5H0rHU&callback=initMap" type="text/javascript"></script>
		</div>

	</div><!-- /.broker-map__inner -->
	<?php endif; ?>
<?php else: ?>
	<h4>There are no brokers in the database!</h4>
<?php endif; ?>
