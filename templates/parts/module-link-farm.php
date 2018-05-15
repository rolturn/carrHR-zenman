<?php
	$background_image = get_sub_field('background_image');
	$header_size = get_sub_field('header_size') == 'none' || get_sub_field('header_size') == array() ? false : get_sub_field('header_size');

	$title = get_sub_field('title');
	$text = get_sub_field('text');
	$cta_text = get_sub_field('cta_text');
	$cta_link = get_sub_field('cta_link');
	$headerClasses = ' class="section-header';
	$headerClasses .= $header_size ? ' '.$header_size : false;
	$headerClasses .= '"';
?>

<section class="module-link-farm link-farm link-farm--<?php echo get_sub_field('overlay'); ?>" style="<?php if ($background_image) : ?>background: url(<?php echo $background_image['url']; ?>)no-repeat center center; background-size: cover;<?php endif; ?>">
	<div class="link-farm__inner">
		<div class="link-farm__wrapper<?php echo (get_sub_field('background_color') ? ' has-background-color' : ''); ?>">
			<div class="link-farm__border js-ease">
				<?php if ($title) : ?>
					<div class="link-farm__heading">
						<h2<?php echo $headerClasses; ?>><?php echo $title; ?></h2>
					</div>
				<?php endif; ?>
				<?php if ($text) : ?>
					<div class="link-farm__text">
						<?php echo $text; ?>
					</div>
				<?php endif; ?>

				<?php if( have_rows('add_links') ): ?>
					<div class="links">
						<?php while ( have_rows('add_links') ) : the_row();
							$link_icon = get_sub_field('link_icon')['id'];
							$link_text = get_sub_field('link_text');
						?>

							<a href="<?php echo get_sub_field('link'); ?>" class="links__single">
								<img src="<?php echo fly_get_attachment_image_src( $link_icon, array(100, 100), true )['src']; ?>" alt="<?php echo $link_text; ?> icon">
								<span><?php echo $link_text; ?></span>
							</a>

						<?php endwhile; ?>
					</div>
				<?php endif; ?>
				<?php if($cta_text && $cta_link) : ?>
					<a class="button" href="<?php echo $cta_link; ?>"><?php echo $cta_text; ?></a>
				<?php endif; ?>
			</div>
		</div>
	</div>

</section>
