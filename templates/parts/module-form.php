<?php
	$title = get_sub_field('title');
	$text = get_sub_field('text');
	$add_background_image = get_sub_field('add_background_image');
	$background_image = get_sub_field('background_image');
	$column_count = get_sub_field('column_count');
	$width = get_sub_field('width');
	$form_shortcode = get_sub_field('form_shortcode');
?>
<section class="module-form form column-count-<?php echo $column_count; ?> <?php if ($column_count === 'one') : ?>width-<?php echo $width; ?><?php endif; ?>" style="<?php if ($add_background_image) : ?>background: url(<?php echo $background_image['url']; ?>) no-repeat center center; background-size: cover;<?php endif; ?>">
	<div class="form__inner">
		<?php if ($title) : ?>
			<div class="form__title">
				<h3><?php echo $title; ?></h3>
			</div>
		<?php endif; ?>
		<?php if ($text) : ?>
			<div class="form__text">
				<?php echo $text; ?>
			</div>
		<?php endif; ?>
		<?php if ($column_count === "one") : ?>
			<div class="form__one-column">
				<?php echo do_shortcode($form_shortcode); ?>
			</div>
		<?php elseif ($column_count === 'two') : ?>
			<?php $left_column_content = get_sub_field('left_column_content'); ?>
			<div class="form__two-column">
				<div class="form__left-column">
					<?php echo $left_column_content; ?>
				</div>
				<div class="form__right-column">
					<?php echo do_shortcode($form_shortcode); ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>
