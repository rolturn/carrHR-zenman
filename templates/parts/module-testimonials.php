<?php
	$image = get_sub_field('background_image');
?>

<section class="module-testimonials testimonials">

		<?php $terms = get_terms( array(
			'taxonomy' => 'type',
			'hide_empty' => false,
		) ); ?>
		<?php $terms = get_terms( array(
			'taxonomy' => 'type',
			'hide_empty' => false,
		) ); ?>

		<div class="testimonials__navigation">
			<button class="view-all" data-term="view-all">View All</button>
			<?php foreach ($terms as $term) : ?>
				<button data-term="<?php echo $term->term_id; ?>"><?php echo $term->name; ?></button>
			<?php endforeach; ?>
		</div>

		<div class="testimonials__background" <?php if ($image) : ?>style="background-image: url(<?php echo $image['url']; ?>);" <?php endif; ?>>
			<div class="testimonials__inner">
				<div class="testimonials__wrapper js-popout-has-buttons"></div>

				<div class="loading">
					<div class="loader">Loading...</div>
				</div>
			</div>
		</div>

		<div class="scrolltoTop"><svg viewbox="0 0 24 24"><polyline fill="none" stroke="currentColor" points="6,16 12,8 18,16"/></svg></div>
		<div id="testimonials__bottom"></div>

		<script>
		var categories = [
			{
				termId: 'view-all',
				id: 'view-all',
			},
			<?php foreach ($terms as $term) : ?>
			{
				id: <?php echo $term->term_id; ?>,
				slug: '<?php echo $term->slug; ?>',
				name: '<?php echo $term->name; ?>',
			},
			<?php endforeach; ?>
		];

		</script>
</section>
