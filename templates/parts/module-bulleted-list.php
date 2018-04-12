<?php

$column_count = get_sub_field('column_count');
$add_background_color = get_sub_field('add_background_color');
$bullet_color = get_sub_field('bullet_color');
$class = '';
if(get_sub_field('font_size')){
	$class = 'bulleted-list__single--larger';
}
?>

<section class="module-bulleted-list bulleted-list <?php echo $bullet_color; ?> column-count-<?php echo $column_count; echo ($add_background_color ? ' bulleted-list--bg-light' : ''); ?>">

	<div class="bulleted-list__inner">

		<?php if( have_rows('add_a_list_item') ): ?>

			<ul class="bulleted-list__wrapper">
			    <?php while ( have_rows('add_a_list_item') ) : the_row();
			    	$text = get_sub_field('text');
			    	$icon = get_sub_field('icon');
			    	if($icon){
				    	$icon_arr = get_sub_field('icon');
				    	$icon_obj = $icon_arr[0];
				    	$icon_name = $icon_obj->post_name;
						$icon = aqua_svg($icon_name, '', '', false);
			    	}
			    ?>
		    		<li class="bulleted-list__single bulleted-list--<?php echo ($icon ? 'icon' : 'no-icon'); ?> <?= $class; ?> js-ease">
		    			<?php
							if($icon){
								echo $icon;
							}
							if( $column_count === 'two' ){
								echo '<h4 class="bulleted-list__title">'. get_sub_field('title') .'</h4>';
							}
			    			if($text) {
								echo $text;
							}
		    			?>
		    		</li>

			    <?php endwhile; ?>
		    </ul>
		<?php endif; ?>
	</div>

</section>
