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
		<script type="text/javascript">var stateNames = <?php echo json_encode($states_with_broker_coverage); ?>;</script>
	</div>

	<?php
	// add the map on the parent page, not on the subpages
		if ( is_page( 'commercial-real-estate-agent' )):
	?>

	<div class="broker-map">
		<div class="google-embedded-map broker-map__map" id="carr-broker-map"></div>
		<div class="broker-verticals">
			<h4>Industries</h4>
			<input id="v-all" name="vertical" value="all" type="radio" checked>
			<label for="v-all">All</label>
			<?php foreach (get_terms('vertical') as $vertical) : ?>
				<input name="vertical" value="<?php echo $vertical->name; ?>" id="v-<?php echo $vertical->slug; ?>" type="radio">
				<label for="v-<?php echo $vertical->slug; ?>"><?php echo $vertical->name; ?></label>
			<?php endforeach; ?>
		</div>
		<a id="brokers-state-link" class="button"></a>
		<script>
			var brokersFetched = [],
				infoWindow,
				activeInfoWindowVerticals,
				verticalCount = <?php echo count(get_terms('vertical')); ?>,
				map,
				marker,
				markers = [],
				markerCluster,
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
				if (window.innerWidth < 801){return false;}

				map = new google.maps.Map(document.getElementById('carr-broker-map'), {
					mapTypeId: 'roadmap',
					gestureHandling: 'auto',
					styles: styles,
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: false,
					center: new google.maps.LatLng(37.5, -96),
					zoom: 4,
					maxZoom: 14,
					zoomControl: true,
					zoomControlOptions: {
						position: google.maps.ControlPosition.TOP_LEFT
					}
				});


				// infoWindow = new google.maps.InfoWindow({disableAutoPan: true});
				infoWindow = new google.maps.InfoWindow();


				/**
				 *  Centers the United States within the map container, and zooms to the greatest
				 *  whole zoom number that will fit the outermost lat/lng coordinates (mapBounds).
				 *
				 *  Docs: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
				 *  Coords: http://geocodezip.com/v3_zoom2countrySelectList.html
				mapBounds = new google.maps.LatLngBounds(
					new google.maps.LatLng(25.82,-124.39),
					new google.maps.LatLng(49.38,-66.94)
				);
				map.fitBounds(mapBounds);
				*/


				/**
				 *  For each state that has at least one broker, load a JSON file of state
				 *  boundary data.
				 *
				 *  JSON Source: https://github.com/johan/world.geo.json/tree/master/countries/USA
				 *  Docs: https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
				 */
				<?php foreach ($states_with_broker_coverage as $_value => $_label) : ?>
					map.data.loadGeoJson('<?php echo get_bloginfo('template_url'); ?>/json/<?php echo $_value; ?>.geo.json');
				<?php endforeach; ?>

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
			//    map.data.addListener('mouseout', function (e) {
			// 	   map.data.revertStyle();
			// 	   map.data.overrideStyle(e.feature, { fillColor: '<?php echo $map_overlay_default; ?>' });
			//    });
			}

			function MarkerClusterer(t,e,r){this.extend(MarkerClusterer,google.maps.OverlayView),this.map_=t,this.markers_=[],this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var s=r||{};this.gridSize_=s.gridSize||60,this.minClusterSize_=s.minimumClusterSize||2,this.maxZoom_=s.maxZoom||null,this.styles_=s.styles||[],this.imagePath_=s.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=s.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=s.zoomOnClick&&(this.zoomOnClick_=s.zoomOnClick),this.averageCenter_=!1,void 0!=s.averageCenter&&(this.averageCenter_=s.averageCenter),this.setupStyles_(),this.setMap(t),this.prevZoom_=this.map_.getZoom();var o=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var t=o.map_.getZoom(),e=o.map_.minZoom||0,r=Math.min(o.map_.maxZoom||100,o.map_.mapTypes[o.map_.getMapTypeId()].maxZoom);t=Math.min(Math.max(t,e),r),o.prevZoom_!=t&&(o.prevZoom_=t,o.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){o.redraw()}),e&&(e.length||Object.keys(e).length)&&this.addMarkers(e,!1)}function Cluster(t){this.markerClusterer_=t,this.map_=t.getMap(),this.gridSize_=t.getGridSize(),this.minClusterSize_=t.getMinClusterSize(),this.averageCenter_=t.isAverageCenter(),this.center_=null,this.markers_=[],this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,t.getStyles(),t.getGridSize())}function ClusterIcon(t,e,r){t.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.styles_=e,this.padding_=r||0,this.cluster_=t,this.center_=null,this.map_=t.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(this.map_)}MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_="../images/m",MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",MarkerClusterer.prototype.extend=function(t,e){return function(t){for(var e in t.prototype)this.prototype[e]=t.prototype[e];return this}.apply(t,[e])},MarkerClusterer.prototype.onAdd=function(){this.setReady_(!0)},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){if(!this.styles_.length)for(var t,e=0;t=this.sizes[e];e++)this.styles_.push({url:this.imagePath_+(e+1)+"."+this.imageExtension_,height:t,width:t})},MarkerClusterer.prototype.fitMapToMarkers=function(){for(var t,e=this.getMarkers(),r=new google.maps.LatLngBounds,s=0;t=e[s];s++)r.extend(t.getPosition());this.map_.fitBounds(r)},MarkerClusterer.prototype.setStyles=function(t){this.styles_=t},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.isZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.isAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.setMaxZoom=function(t){this.maxZoom_=t},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_},MarkerClusterer.prototype.calculator_=function(t,e){for(var r=0,s=t.length,o=s;0!==o;)o=parseInt(o/10,10),r++;return r=Math.min(r,e),{text:s,index:r}},MarkerClusterer.prototype.setCalculator=function(t){this.calculator_=t},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.addMarkers=function(t,e){if(t.length)for(var r,s=0;r=t[s];s++)this.pushMarkerTo_(r);else if(Object.keys(t).length)for(var r in t)this.pushMarkerTo_(t[r]);e||this.redraw()},MarkerClusterer.prototype.pushMarkerTo_=function(t){if(t.isAdded=!1,t.draggable){var e=this;google.maps.event.addListener(t,"dragend",function(){t.isAdded=!1,e.repaint()})}this.markers_.push(t)},MarkerClusterer.prototype.addMarker=function(t,e){this.pushMarkerTo_(t),e||this.redraw()},MarkerClusterer.prototype.removeMarker_=function(t){var e=-1;if(this.markers_.indexOf)e=this.markers_.indexOf(t);else for(var r,s=0;r=this.markers_[s];s++)if(r==t){e=s;break}return-1!=e&&(t.setMap(null),this.markers_.splice(e,1),!0)},MarkerClusterer.prototype.removeMarker=function(t,e){var r=this.removeMarker_(t);return!(e||!r)&&(this.resetViewport(),this.redraw(),!0)},MarkerClusterer.prototype.removeMarkers=function(t,e){for(var r,s=t===this.getMarkers()?t.slice():t,o=!1,i=0;r=s[i];i++){var a=this.removeMarker_(r);o=o||a}if(!e&&o)return this.resetViewport(),this.redraw(),!0},MarkerClusterer.prototype.setReady_=function(t){this.ready_||(this.ready_=t,this.createClusters_())},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.getMap=function(){return this.map_},MarkerClusterer.prototype.setMap=function(t){this.map_=t},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(t){this.gridSize_=t},MarkerClusterer.prototype.getMinClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinClusterSize=function(t){this.minClusterSize_=t},MarkerClusterer.prototype.getExtendedBounds=function(t){var e=this.getProjection(),r=new google.maps.LatLng(t.getNorthEast().lat(),t.getNorthEast().lng()),s=new google.maps.LatLng(t.getSouthWest().lat(),t.getSouthWest().lng()),o=e.fromLatLngToDivPixel(r);o.x+=this.gridSize_,o.y-=this.gridSize_;var i=e.fromLatLngToDivPixel(s);i.x-=this.gridSize_,i.y+=this.gridSize_;var a=e.fromDivPixelToLatLng(o),n=e.fromDivPixelToLatLng(i);return t.extend(a),t.extend(n),t},MarkerClusterer.prototype.isMarkerInBounds_=function(t,e){return e.contains(t.getPosition())},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[]},MarkerClusterer.prototype.resetViewport=function(t){for(var e,r=0;e=this.clusters_[r];r++)e.remove();for(var s,r=0;s=this.markers_[r];r++)s.isAdded=!1,t&&s.setMap(null);this.clusters_=[]},MarkerClusterer.prototype.repaint=function(){var t=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var e,r=0;e=t[r];r++)e.remove()},0)},MarkerClusterer.prototype.redraw=function(){this.createClusters_()},MarkerClusterer.prototype.distanceBetweenPoints_=function(t,e){if(!t||!e)return 0;var r=(e.lat()-t.lat())*Math.PI/180,s=(e.lng()-t.lng())*Math.PI/180,o=Math.sin(r/2)*Math.sin(r/2)+Math.cos(t.lat()*Math.PI/180)*Math.cos(e.lat()*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))*6371},MarkerClusterer.prototype.addToClosestCluster_=function(t){for(var e,r=4e4,s=null,o=(t.getPosition(),0);e=this.clusters_[o];o++){var i=e.getCenter();if(i){var a=this.distanceBetweenPoints_(i,t.getPosition());a<r&&(r=a,s=e)}}if(s&&s.isMarkerInClusterBounds(t))s.addMarker(t);else{var e=new Cluster(this);e.addMarker(t),this.clusters_.push(e)}},MarkerClusterer.prototype.createClusters_=function(){if(this.ready_)for(var t,e=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),r=this.getExtendedBounds(e),s=0;t=this.markers_[s];s++)!t.isAdded&&this.isMarkerInBounds_(t,r)&&this.addToClosestCluster_(t)},Cluster.prototype.isMarkerAlreadyAdded=function(t){if(this.markers_.indexOf)return-1!=this.markers_.indexOf(t);for(var e,r=0;e=this.markers_[r];r++)if(e==t)return!0;return!1},Cluster.prototype.addMarker=function(t){if(this.isMarkerAlreadyAdded(t))return!1;if(this.center_){if(this.averageCenter_){var e=this.markers_.length+1,r=(this.center_.lat()*(e-1)+t.getPosition().lat())/e,s=(this.center_.lng()*(e-1)+t.getPosition().lng())/e;this.center_=new google.maps.LatLng(r,s),this.calculateBounds_()}}else this.center_=t.getPosition(),this.calculateBounds_();t.isAdded=!0,this.markers_.push(t);var o=this.markers_.length;if(o<this.minClusterSize_&&t.getMap()!=this.map_&&t.setMap(this.map_),o==this.minClusterSize_)for(var i=0;i<o;i++)this.markers_[i].setMap(null);return o>=this.minClusterSize_&&t.setMap(null),this.updateIcon(),!0},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){for(var t,e=new google.maps.LatLngBounds(this.center_,this.center_),r=this.getMarkers(),s=0;t=r[s];s++)e.extend(t.getPosition());return e},Cluster.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.calculateBounds_=function(){var t=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(t)},Cluster.prototype.isMarkerInClusterBounds=function(t){return this.bounds_.contains(t.getPosition())},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.updateIcon=function(){var t=this.map_.getZoom(),e=this.markerClusterer_.getMaxZoom();if(e&&t>e)for(var r,s=0;r=this.markers_[s];s++)r.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var o=this.markerClusterer_.getStyles().length,i=this.markerClusterer_.getCalculator()(this.markers_,o);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(i),this.clusterIcon_.show()}},ClusterIcon.prototype.triggerClusterClick=function(){var t=this.cluster_.getMarkerClusterer();google.maps.event.trigger(t.map_,"clusterclick",this.cluster_),t.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())},ClusterIcon.prototype.onAdd=function(){if(this.div_=document.createElement("DIV"),this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(t),this.div_.innerHTML=this.sums_.text}this.getPanes().overlayMouseTarget.appendChild(this.div_);var e=this;google.maps.event.addDomListener(this.div_,"click",function(){e.triggerClusterClick()})},ClusterIcon.prototype.getPosFromLatLng_=function(t){var e=this.getProjection().fromLatLngToDivPixel(t);return e.x-=parseInt(this.width_/2,10),e.y-=parseInt(this.height_/2,10),e},ClusterIcon.prototype.draw=function(){if(this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.top=t.y+"px",this.div_.style.left=t.x+"px"}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(t),this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.remove=function(){this.setMap(null)},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.setSums=function(t){this.sums_=t,this.text_=t.text,this.index_=t.index,this.div_&&(this.div_.innerHTML=t.text),this.useStyle()},ClusterIcon.prototype.useStyle=function(){var t=Math.max(0,this.sums_.index-1);t=Math.min(this.styles_.length-1,t);var e=this.styles_[t];this.url_=e.url,this.height_=e.height,this.width_=e.width,this.textColor_=e.textColor,this.anchor_=e.anchor,this.textSize_=e.textSize,this.backgroundPosition_=e.backgroundPosition},ClusterIcon.prototype.setCenter=function(t){this.center_=t},ClusterIcon.prototype.createCss=function(t){var e=[];e.push("background-image:url("+this.url_+");");var r=this.backgroundPosition_?this.backgroundPosition_:"0 0";e.push("background-position:"+r+";"),"object"==typeof this.anchor_?("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?e.push("height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;"):e.push("height:"+this.height_+"px; line-height:"+this.height_+"px;"),"number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?e.push("width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;"):e.push("width:"+this.width_+"px; text-align:center;")):e.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;");var s=this.textColor_?this.textColor_:"black",o=this.textSize_?this.textSize_:11;return e.push("cursor:pointer; top:"+t.y+"px; left:"+t.x+"px; color:"+s+"; position:absolute; font-size:"+o+"px; font-family:Arial,sans-serif; font-weight:bold"),e.join("")};
		</script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIF21_qo_tZPCSboN1N9j0VPeUW-NFQ2k&callback=initMap" async defer></script>
	</div>
	<?php endif; ?>
<?php else: ?>
	<h4>There are no brokers in the database!</h4>
<?php endif; ?>
