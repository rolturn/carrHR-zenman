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
						?>

						<a class="resources__single" href="<?php echo $link; ?>" style="background: url(<?php echo $background_image['url']; ?>)no-repeat center center; background-size: cover;">

							<div class="resources__overlay">
								<h4>
									<?php
										$thecontent = get_sub_field('text');
										$getlength = strlen($thecontent);
										$thelength = 56;
										echo substr($thecontent, 0, $thelength);
										if ($getlength > $thelength){echo "...";}
									?>
								</h4>
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
