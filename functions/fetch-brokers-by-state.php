<?php
/**
 *  Receives a two-letter state code from the broker map template,
 *  queries database for all brokers that are operating in that state,
 *  and returns JSON data for each broker.
 */

// TODO: this is the quick and dirty solution; better to enable AJAX
require_once '../../../../wp-load.php';

if (!isset($_POST['stateAbbr'])){exit;}

$broker_data = array();
$brokers_in_selected_state = new WP_Query(
	array(
		'post_type' => 'brokers',
		'nopaging' => true,
		'meta_query' => array(
			array(
				'key'     => 'broker_state',
				'value'   => $_POST['stateAbbr'],
				'compare' => 'LIKE'
			),
		),
	)
);

if ($brokers_in_selected_state->have_posts()){
	while ( $brokers_in_selected_state->have_posts() ){
		$brokers_in_selected_state->the_post();
		$latitude = $longitude = null;
		$broker_verticals = array();

		if ($broker_coords = get_field('broker_coords', $post->ID)){
			foreach ($broker_coords as $coord){
				$latitude = $coord['latitude'];
				$longitude = $coord['longitude'];
			}
		}

		if ($verticals = get_the_terms($post->ID, 'vertical')){
			foreach ($verticals as $vertical){
				array_push($broker_verticals, $vertical->name);
			}
		}

		$_this_broker = array(
			'brokerName' => get_the_title(),
			'brokerRegion' => get_field('broker_region', $post->ID),
			'brokerState' => get_field('broker_state', $post->ID),
			'brokerLat' => $latitude,
			'brokerLng' => $longitude,
			'brokerPhone' => get_field('broker_phone', $post->ID),
			'brokerEmail' => get_field('broker_email', $post->ID),
			'brokerBio' => get_field('broker_bio', $post->ID),
			'brokerPhotoURL' => fly_get_attachment_image_src(get_field('broker_photo', $post->ID), array(120, 120), true),
			'brokerVerticals' => $broker_verticals,
		);

		if ($license = get_field('license_number', $post->ID)){
			$_this_broker['license'] = $license;
		}

		array_push($broker_data, $_this_broker);
	}
}

echo json_encode($broker_data);

exit;
