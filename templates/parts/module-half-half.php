<?php

$background_image = get_sub_field('image');

?>


<section class="module-half-half js-scale half-half half-half--<?php the_sub_field('organization') ?>-left" style="background-image: url(<?php echo $background_image['url']; ?>);">

	<div class="half-half__inner">
		<div class="half-half__text js-ease">
			<div class="half-half__frame">
				<?php if (get_sub_field('title')) : ?>
					<div class="half-half__title">
						<h3><?php the_sub_field('title'); ?></h3>
					</div>
				<?php endif; ?>
				<?php the_sub_field('blurb'); ?>
				<?php if(get_sub_field('button')) : ?>
					<a class="button" href="<?php the_sub_field('button_link'); ?>"><?php the_sub_field('button_text'); ?></a>
				<?php endif; ?>
			</div>
		</div>

	</div>

</section>
