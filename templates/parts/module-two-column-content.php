<?php

// see custom_functions.php starting at line 453 (it was just too much...)

$meta = get_post_meta( get_the_ID() );

$heading = get_sub_field('heading');

$lines = get_sub_field( 'animated_lines' );

$section_classes = 'module-two-column-content two-column-content';
if ($lines){
	if (!$heading){
		$section_classes .= ' two-column-content--has-lines';
	}
} else {
	$section_classes .= ' two-column-content--no-lines';
}

switch (get_sub_field( 'background' )) {
	case 'blue':
		$section_classes .= ' bgcolor-blue';
		break;
	case 'gray':
		$section_classes .= ' bgcolor-gray';
		break;
}

?>


<section class="<?php echo $section_classes; ?>">
	<?php if($heading) : ?>
		<h3 class="two-column-content__heading js-ease"><?php echo $heading; ?></h3>
	<?php endif; ?>

	<?php twocolumn_content_layout('left', $lines); ?>

	<?php twocolumn_content_layout('right', $lines); ?>
</section>
