<?php
	$background_image = get_sub_field('background_image');
?>

<section class="module-comparison comparison">
	<div class="comparison__background"<?php if ($background_image) : ?> style="background: url(<?php echo $background_image['url']; ?>)no-repeat center center; background-size: cover;"<?php endif; ?>></div>

	<div class="comparison__inner">
		<?php if( have_rows('comparisons') ): ?>

			<div class="comparison__wrapper">
				<?php while ( have_rows('comparisons') ) : the_row(); ?>

						<div class="comparison__single">
							<h3><?php echo get_sub_field('title'); ?></h3>
							<?php if( have_rows('add_list_item') ): ?>
								<ul class="comparison-list-item__wrapper">
									<?php while ( have_rows('add_list_item') ) : the_row(); ?>
										<li class="comparison-list-item__single">
											<p><?php echo get_sub_field('list_item'); ?></p>
										</li>
									<?php endwhile; ?>
								</ul>
							<?php endif; ?>
						</div>

				<?php endwhile; ?>
			</div>
		<?php endif; ?>

	</div>

</section>
