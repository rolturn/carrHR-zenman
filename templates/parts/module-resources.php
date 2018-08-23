<?php
	$title = get_sub_field('title');
	$cta_text = get_sub_field('cta_text');
	$cta_link = get_sub_field('cta_link');

	$_resources_count = count(get_sub_field('add_a_resource'));
?>


<section class="module-resources resources">
	<div class="resources__inner">

		<div class="resources__title">
			<h2 class="section-header"><?php echo $title; ?></h2>
		</div>

		<div class="resources__wrapper">

			<?php if( have_rows('add_a_resource') ): ?>
				<div class="resources__all">
					<?php while ( have_rows('add_a_resource') ) : the_row();
						$background_image = get_sub_field('background_image');
						$link = get_sub_field('link');
						$text = get_sub_field('text');
						$subtext = get_sub_field('subtext');
						// setting defaults since there are so many pages that already have Educational Resources set. These defaults maybe overwritten by by entering text into the field.
						if (empty($subtext)) {
							switch ($text) {
								case "Blog":
									$subtext = "Industry leading healthcare real estate content";
									break;
								case "FAQ":
									$subtext = "Quick answers to health real estate questions";
									break;
							}
						}
						?>

						<a class="resources__single" href="<?php echo $link; ?>" style="background: url(<?php echo $background_image['url']; ?>)no-repeat center center; background-size: cover;">

							<div class="resources__overlay">
								<hgroup>
									<h4>
										<?php
											$textlength = strlen($text);
											$textlength = 56;
											echo substr($text, 0, $textlength);
											if ($textlength > $textlength){echo "...";}
										?>
									</h4>
									<h5 class="subtext">
										<?php echo $subtext; ?>
									</h5>
								</hgroup>
							</div>

						</a>

					<?php
						endwhile;
					?>
				</div>

			<?php endif; ?>

		</div>

	</div>
</section>
