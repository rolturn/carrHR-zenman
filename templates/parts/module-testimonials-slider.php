<?php

$image = get_sub_field('background_image');
$heading = get_sub_field('slide_headline');

?>

<section class="module-testimonial-slider" <?php if ($image) : ?>style="background: url(<?php echo $image['url']; ?>) no-repeat center center; background-size: cover;" <?php endif; ?>>
	<?php if( have_rows('add_a_testimonial_slide') ): ?>

		<!-- <span class="module-testimonial-slider__nav module-testimonial-slider__prev">❮</span> -->

		<div class="module-testimonial-slider__inner">

			<div class="module-testimonial-slider__text-content">
				<?php if ($heading){echo '<h3>'.$heading.'</h3>';} ?>

				<div class="module-testimonial-slider__quotes">
					<?php while ( have_rows('add_a_testimonial_slide') ) : the_row();
						$text = get_sub_field('text');
						$author = get_sub_field('testimonial_author');
					?>
					<div>
						<blockquote>
							<?php echo $text; ?>
						</blockquote>
						<cite><?php echo $author; ?></cite>

					</div>
					<?php endwhile; ?>
				</div>
			</div>

		</div>

		<!-- <span class="module-testimonial-slider__nav module-testimonial-slider__next">❯</span> -->

	<?php endif; ?>
</section>
