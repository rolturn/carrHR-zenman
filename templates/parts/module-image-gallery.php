<?php
	$image_gallery = get_sub_field('image_gallery');
?>
<section class="module-image-gallery image-gallery">

	<div class="image-gallery__inner">

		<div class="image-gallery__title">
			<h3><?php echo get_sub_field('title'); ?></h3>
		</div>

		<?php if( $image_gallery ): ?>

			<div class="image-gallery__wrapper">
				<div class="image__prev"></div>
				<div class="image-gallery__content js-image-content">
					<?php foreach( $image_gallery as $image ): ?>
			            <div class="content__single">
			                <img src="<?php echo fly_get_attachment_image_src( $image['ID'], 'animated-lines' )['src']; ?>" alt="<?php echo $image['alt']; ?>" />
			            </div>
			        <?php endforeach; ?>
				</div>
				<div class="image__next"></div>
				<div class="image-gallery__nav js-image-nav">
					<?php foreach( $image_gallery as $image ): ?>
			            <div class="nav__single">
			                <img src="<?php echo fly_get_attachment_image_src( $image['ID'], 'thumb-large' )['src']; ?>" alt="<?php echo $image['alt']; ?>" />
			            </div>
			        <?php endforeach; ?>
				</div>
			</div>

		<?php endif; ?>
	</div>

</section>
