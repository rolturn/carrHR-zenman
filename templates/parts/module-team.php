<?php

$_brokers = '';

if(get_sub_field('title')){
	$_brokers .= '<h2 class="section-header">'. get_sub_field('title') .'</h2>';
}

$_brokers .= '<div class="brokers__broker-group">';

if(have_rows('team')){
	while(have_rows('team')) : the_row();

		$_brokers .= '<div class="brokers__broker">';
			$_brokers .= '<div class="broker__image">'.fly_get_attachment_image(get_sub_field('headshot'), array(360, 388), array('center', 'top')).'</div>';
			$_brokers .= '<h4 class="broker__name">'.get_sub_field('name').'</h4>';
			$_brokers .= '<h5 class="broker__title">'.get_sub_field('title').'</h5>';
			$_brokers .= '<div class="contact-info-container">';
			if(get_sub_field('phone_number')){
				$_brokers .= '<a href="tel:'.get_sub_field('phone_number').'" class="contact-info broker__phone" data-contact-info="'.get_sub_field('phone_number').'"><i class="fas fa-phone-office"></i><span class="hidden">'.get_sub_field('phone_number').'</span></a>';
			}
			if(get_sub_field('email_address')){
				$broker_email = antispambot( 'mailto:'.get_sub_field('email_address') );
				$broker_email_display = antispambot( get_sub_field('email_address') );
				$_brokers .= '<a href="'.$broker_email.'" class="contact-info broker__email" data-contact-info="'.$broker_email_display.'"><i class="fas fa-envelope"></i><span class="hidden">'.$broker_email_display.'</span></a>';
			}
			$_brokers .= '<div class="contact-info-reveal">'.get_sub_field('phone_number').'</div>';
			$_brokers .= '</div> <!-- /.contact-info-container -->';
		$_brokers .= '</div>';
	endwhile;
}
$_brokers .= '</div>';

?>

<section class="module-brokers brokers brokers-team brokers-team__inner">
	<?php echo $_brokers; ?>
</section>
