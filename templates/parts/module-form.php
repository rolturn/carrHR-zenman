<?php
	$is_page_header = get_sub_field('is_page_header');
	$title = get_sub_field('title');
	$header_size = get_sub_field('header_size') == 'none' || get_sub_field('header_size') == array() ? false : get_sub_field('header_size');
	$text = get_sub_field('text');
	$add_background_image = get_sub_field('add_background_image');
	$background_image = get_sub_field('background_image');
	$column_count = get_sub_field('column_count');
	$content_width = !empty(get_sub_field('width')) ? ' width-' . get_sub_field('width') : ' width-small';
	$form_shortcode = get_sub_field('form_shortcode');
	$headerClasses = ' class="section-header';
	$headerClasses .= $header_size ? ' '.$header_size : false;
	$headerClasses .= '"';
?>

<section class="module-form form column-count-<?php echo $column_count; ?>" style="<?php if ($add_background_image) : ?>background: url(<?php echo $background_image['url']; ?>) no-repeat center center; background-size: cover;<?php endif; ?>">
	<div class="form__inner width-small>
		<?php if ($title) : ?>
			<div class="form__title">
				<?php if ($is_page_header) : ?>
					<h1<?php echo $headerClasses; ?>><?php echo $title; ?></h1>
				<?php else: ?>
					<h2<?php echo $headerClasses; ?>><?php echo $title; ?></h2>
				<?php endif; ?>
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
