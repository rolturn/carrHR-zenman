<?php

$add_text_to_hero = get_field('add_text_to_hero', $GLOBALS['page_id_to_use']);
$hero_image = '';
if(is_category() && !empty(get_field('post_category_header',get_queried_object()))) {
  $hero_image = get_field('post_category_header', get_queried_object());
} elseif(get_field('use_random_image_loader', $GLOBALS['page_id_to_use'])){
	$all_hero_images = get_field('random_images', $GLOBALS['page_id_to_use']);
	shuffle($all_hero_images);
	$hero_image = $all_hero_images[0]['hero_image']['url'];
} else {
	$hero_image_arr = get_field('hero_image', $GLOBALS['page_id_to_use']);
	$hero_image = $hero_image_arr['url'];
}

$color = get_field('background_color_hero_text', $GLOBALS['page_id_to_use']);
$rgba = hex2rgba($color, 0.8);

?>

<section class="hero">
	<?php if ($add_text_to_hero) : ?>
		<div class="hero-text">
			<div class="hero__background hero-text__background<?php echo (get_field('use_parallax_effect', $GLOBALS['page_id_to_use']) ? ' _hero-image__background--fixed' : ''); ?> js-scale" style="background-image: url(<?php echo $hero_image; ?>)"></div>
			<?php if( have_rows('add_line_of_hero_text') ):?>
				<div class="hero-text__inner">
				    <?php while ( have_rows('add_line_of_hero_text') ) : the_row();
				    	$line_of_hero_text = get_sub_field('line_of_hero_text');

				    ?>

				    	<h1 class="js-from-left" style="background-color: <?php echo $rgba; ?>;"><?php echo $line_of_hero_text; ?></h1><br>

				    <?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
	<?php else : ?>
		<div class="hero-image">
			<div class="hero__background hero-image__background<?php echo (get_field('use_parallax_effect', $GLOBALS['page_id_to_use']) ? ' hero-image__background--fixed' : ''); ?> js-scale" style="background-image: url(<?php echo $hero_image; ?>)"></div>
		</div>
	<?php endif; ?>
</section>
