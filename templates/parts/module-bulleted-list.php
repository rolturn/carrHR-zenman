<?php
$column_count = get_sub_field('column_count');
$add_background_color = get_sub_field('add_background_color');
$bullet_color = get_sub_field('bullet_color');
$class = '';
if(get_sub_field('font_size')){
	$class = ' bulleted-list__single--larger';
}

$content_width = !empty(get_sub_field('width')) ? ' width-' . get_sub_field('width') : ' width-small';

// adjustment for BulletList on Start-ups page
// if first bullet item is changed then this will no longer work.
$special = (get_sub_field('add_a_list_item') && get_sub_field('add_a_list_item')[0]['title'] === 'Demographic research and due diligence') ? true : false;
?>

<section class="module-bulleted-list bulleted-list column-count-<?php echo $column_count; echo ($add_background_color ? ' bulleted-list--bg-light' : ''); ?>">

	<div class="bulleted-list__inner<?php print $content_width; ?>">

		<?php if( have_rows('add_a_list_item') ): ?>

			<ul class="bulleted-list__wrapper<?php echo ($special ? ' bulleted-list__narrow' : ''); ?>">
			    <?php while ( have_rows('add_a_list_item') ) : the_row();
			    	$text = get_sub_field('text');
			    	$icon = get_sub_field('icon');
			    	if ($icon) {
							// if aqua svg is removed this will not work it is half broken already
				    	$icon_arr = get_sub_field('icon');
				    	$icon_obj = $icon_arr[0];
				    	$icon_name = $icon_obj->post_name;
						// $icon = the_aqua_svg($icon_name);
						} else {
							$icon_name = 'no-icon';
						}


			    ?>
		    		<li class="bulleted-list__single<?php echo ' bulleted-list__icon icon-'.$icon_name; ?><?php echo ($bullet_color ? ' '.$bullet_color : ''); ?><?= $class; ?> js-ease">
		    			<?php
							// if($icon){
							// 	echo $icon;
							// }
							if( $column_count === 'two' ){
								echo '<h4 class="bulleted-list__title">'. get_sub_field('title') .'</h4>';
							}
		    			if($text) {
								echo '<span class="bulleted-list__text">'. $text .'</span>';
								// echo $text;
							}
		    			?>
		    		</li>

			    <?php endwhile; ?>
		    </ul>
		<?php endif; ?>
	</div>

</section>
