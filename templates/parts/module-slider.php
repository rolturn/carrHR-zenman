<?php

$heading = get_sub_field('slide_headline');
$see_all_text = 'View All';
$see_all_link = false;

if ($heading === 'Thousands of Healthcare Professionals Trust Us') {
	$see_all_link = get_the_permalink(16);
	$see_all_text = 'View All Testimonials';
}

$see_all_link = !empty(get_sub_field('see_all_link')) ? get_sub_field('see_all_link') : $see_all_link;
$see_all_text = !empty(get_sub_field('see_all_text')) ? get_sub_field('see_all_text') : $see_all_text;

?>
<section class="module-slider slider">
	<?php if( have_rows('add_a_slide') ): ?>
		<div class="slider__wrapper slider__wrapper-content js-slide-content">
			<?php while ( have_rows('add_a_slide') ) : the_row(); ?>
				<div class="slider__slide-content" style="background: url('<?php if ($image = get_sub_field('image')){echo $image['url'];} ?>') no-repeat center center; background-size: cover;">
			     	<div class="slider__inner">
						<div class="slider__text orientation-<?php echo get_sub_field('orientation_of_text'); ?>">

							<!-- <div class="slider__prev">
								<a href="javascript:void(0);" class="previous">❮</a>
							</div> -->
							<div class="slider__text-box">
								<div class="slider__text-content">
									<?php if ($heading){echo '<h3>'.$heading.'</h3>';} ?>
									<?php the_sub_field('text'); ?>
								</div>
							</div>

							<!-- <div class="slider__next">
								<a href="javascript:void(0);" class="next">❯</a>
							</div> -->
						</div>
					</div>
				</div>
		   	<?php endwhile; ?>
		</div>
		<div class="slider__wrapper slider__wrapper-nav js-slide-nav">
			<?php while ( have_rows('add_a_slide') ) : the_row(); ?>
				<a href="javascript:void(0);" class="slider__slide-nav">
					<?php if ($image = get_sub_field('image')) : ?>
						<div class="image-thumbnail" style="background: url(<?php echo $image['url']; ?>) no-repeat center center; background-size: cover;"></div>
					<?php endif; ?>
				</a>
			<?php endwhile; ?>
		</div>
		<?php if (!empty($see_all_link)): ?>
			<a href="<?php print $see_all_link; ?>" class="slider__slide-nav see-all-container">
				<div class="see-all">
					<?php print $see_all_text; ?>
				</div><!-- /.image-thumbnail -->
			</a>
		<?php endif; ?>
	<?php endif; ?>
</section>
