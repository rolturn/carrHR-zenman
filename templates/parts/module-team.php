<?php

$_brokers = '';

if(get_sub_field('title')){
	$_brokers .= '<h2 class="section-header">'. get_sub_field('title') .'</h2>';
}

$_brokers .= '<div class="brokers__broker-group brokers__inner">';

if(have_rows('team')){
	while(have_rows('team')) : the_row();

		$_brokers .= '<div class="brokers__broker">';
			$_brokers .= '<div class="broker__image">'.fly_get_attachment_image(get_sub_field('headshot'), array(360, 388), array('center', 'top')).'</div>';
			$_brokers .= '<h4 class="broker__name">'.get_sub_field('name').'</h4>';
			$_brokers .= '<h5 class="broker__title">'.get_sub_field('title').'</h5>';
			if(get_sub_field('phone_number')){
				$_brokers .= '<a href="tel:'.get_sub_field('phone_number').'" class="broker__phone">'.get_sub_field('phone_number').'</a>';
			}
			if(get_sub_field('email_address')){
				$_brokers .= '<a href="mailto:'.get_sub_field('email_address').'" class="broker__email">'.get_sub_field('email_address').'</a>';
			}
		$_brokers .= '</div>';
	endwhile;
}
$_brokers .= '</div>';

?>

<section class="module-brokers brokers brokers-team">
	<?php echo $_brokers; ?>
</section>
