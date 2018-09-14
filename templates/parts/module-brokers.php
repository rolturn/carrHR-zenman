<?php

$terms = array();
$_filters = $_brokers = '';

$_verticals_count = count(get_terms('vertical'));

if(have_rows('brokers_list')){
	while(have_rows('brokers_list')) : the_row();
		$brokers = get_sub_field('brokers');

		if($brokers){
			if(get_sub_field('title')){
						$_brokers .= '<div class="brokers__region '. create_slug(get_sub_field('title')) .'">';
						$_brokers .= '<div class="full-width bg-color"></div>';
						$_brokers .= '<h2 class="brokers__title">'. get_sub_field('title') .'</h2>';
			}

			$_brokers .= '<div class="brokers__broker-group">';

			foreach($brokers as $post){ // variable must be called $post
				setup_postdata($post);

				$term_list = wp_get_post_terms($post->ID, 'vertical', array('fields' => 'all'));

				$to_filter = array();
				foreach($term_list as $term){
					$terms[$term->slug] = $term->name;
					$to_filter[$term->slug] = $term->name;
				}

				$_brokers .= '<div class="brokers__broker js-broker" data-verticals=\''.json_encode(array_keys($to_filter)).'\'>';
					$_brokers .= '<div class="broker__image">'.fly_get_attachment_image(get_field('broker_photo'), array(360, 388), array('center', 'top')).'</div>';
					$_brokers .= '<h4 class="broker__name">'.get_the_title().'</h4>';
					if(get_field('license_number')){
						$_brokers .= '<div class="broker__license">'.get_field('license_number').'</div>';
					}
					if(get_field('broker_phone')){
						$_brokers .= '<a href="tel:'.get_field('broker_phone').'" class="broker__phone">'.get_field('broker_phone').'</a>';
					}
					if(get_field('broker_email')){
						$_brokers .= '<a href="mailto:'.get_field('broker_email').'" class="broker__email">'.get_field('broker_email').'</a>';
					}
					if (count($to_filter) === $_verticals_count){
						$_verticals = 'All Healthcare Industries';
					} else {
						$_verticals = implode(array_values($to_filter), ', ');
					}
					$_brokers .= '<p class="broker__verticals">'.$_verticals.'</p>';
				$_brokers .= '</div>';

				wp_reset_postdata(); // reset the $post object so the rest of the page works correctly
			}

			$_brokers .= '</div></div>';
		}
	endwhile;
}

if ($terms){
	$_filters .= '<section class="broker-filter broker-filter__inner">';
		$_filters .= '<ul id="js-broker-filter">';
			$_filters .= '<li><input id="v-all" name="vertical" value="all" type="radio" checked><label for="v-all">All</label></li>';
			asort($terms);
			foreach($terms as $t_slug => $t_name){
				$_filters .= '<li><input name="vertical" value="'.$t_slug.'" id="v-'.$t_slug.'" type="radio"><label for="v-'.$t_slug.'">'.$t_name.'</label></li>';
			}
		$_filters .= '</ul>';
	$_filters .= '</section>';
}

echo $_filters;

?>

<section class="module-brokers brokers brokers__inner">
	<?php echo $_brokers; ?>
</section>
