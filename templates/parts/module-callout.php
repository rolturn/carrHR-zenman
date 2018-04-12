<?php

$is_testimonial = get_sub_field('is_testimonial');
$title = get_sub_field('heading');

?>



<section class="module-callout callout <?php if ($is_testimonial) : ?>is-testimonial<?php endif; ?>">

	<div class="callout__inner">

		<?php if($title) : ?>
			<div class="callout__heading">
				<h3><?php echo $title; ?></h3>
			</div>
		<?php endif; ?>

		<?php if( have_rows('add_a_callout') ): ?>

			<div class="callout__wrapper">
			    <?php while ( have_rows('add_a_callout') ) : the_row();
			    	$title = get_sub_field('title');
			    	$text = get_sub_field('text');
			    	$image = get_sub_field('image');
			    	$icon = get_sub_field('icon');
			    	if($icon){
			    		$post_id = $icon[0];
			    		$svg_post = get_post($post_id);
			    		$slug = $svg_post->post_name;
			    		$icon = aqua_svg($slug, '', '', false);
			    	}
			    	?>

			    		<div class="callout__single js-ease">
			    			<h4><?php echo $icon; echo $title; ?></h4>
			    			<div class="callout__content">
			    				<img src="<?php echo fly_get_attachment_image_src( $image['ID'], array(190, 215), true)['src']; ?>" alt="<?php echo $image['alt']; ?>" />
				    			<div class="callout__text">
				    				<?php echo $text; ?>
				    			</div>
				    		</div>
			    		</div>

			    <?php endwhile; ?>
		    </div>
		<?php endif; ?>
	</div>

</section>
