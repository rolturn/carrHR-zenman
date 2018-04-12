<?php

$background_image = get_sub_field('background_image');

$classes = 'module-one-column-content one-column-content';
$classes .= ' one-column-content--' . get_sub_field('align');
$classes .= ' one-column-content--' . get_sub_field('text_color');
if(get_sub_field('extra_padding')){
	$classes .= ' one-column-content--extra-pad';
}
if(get_sub_field('text_size')){
	$classes .= ' one-column-content--larger';
}
switch (get_sub_field('background')) {
	case 'blue':
		$classes .= ' bgcolor-blue';
		break;
	case 'gray':
		$classes .= ' bgcolor-gray';
		break;
	case 'image':
		$classes .= ' one-column-content--has-background';
		break;
}
if ($background_image){
	// for all the CMS situations where there was an image before the "background" switch existed
	$classes .= ' one-column-content--has-background';
}

$heading = $text = $button = '';

if (get_sub_field('heading')){
	$heading = '<div class="one-column-content__heading js-ease"><h3>'.get_sub_field('heading').'</h3></div>';
}

if (get_sub_field('text')){
	$text = '<div class="one-column-content__text js-ease">'. get_sub_field('text') .'</div>';
}

if (get_sub_field('add_a_button')){
	$button = '<div class="one-column-content__button js-ease"><a class="button" href="'.get_sub_field('button_link').'">'.get_sub_field('button_text').'</a></div>';
}

?>
<section class="<?php echo $classes; ?>">
	<?php if($background_image) : ?>
		<div class="one-column-content__background js-scale" style="background: url(<?php echo $background_image['url']; ?>) no-repeat center center; background-size: cover;"></div>
	<?php endif;

	// if post parent is the find a broker page
	if ( get_post_field( 'post_parent' ) === 143 ){
		if($heading){
			echo '<div class="one-column-content state-broker-page">'.$heading.'</div>';
		}

		echo '<div class="one-column-content__inner">';
	} else {
		echo '<div class="one-column-content__inner">';

		if($heading) {echo $heading;}
	}

	if($text) {echo $text;}

	if($button) {echo $button;}

	?>
	</div>
</section>
