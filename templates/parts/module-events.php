<?php
	$title = get_sub_field('title');
	$background_image = get_sub_field('background_image');
?>


<section class="module-events events" style="<?php if ($background_image) : ?>background-image: url(<?php echo $background_image['url']; ?>);<?php endif; ?>">

	<div class="events__title">
		<div class="events__inner">
			<h3><?php echo $title; ?></h3>
		</div>
	</div>
	<div class="events__inner">
		<div class="events__wrapper">
			<div class="event__prev"></div>
			<?php
		        $events_args = array('post_type' => array( 'events' ), 'posts_per_page' => -1, 'meta_key' => 'date', 'orderby' => 'meta_value', 'order' => 'ASC');
		        $events_query = new WP_Query( $events_args );
		    ?>

		    <?php if ( $events_query->have_posts() ) : ?>

		    	<?php $initial = 0; ?>

		    	<div class="events__slider js-events-slider" data-inital="<?php echo $initial; ?>">

		    		<?php
		    			$year = 0;
						$month = 0;
						$day = 0;
						$counter = 0;

						$todays_year = date('Y');
						$todays_month = date('m');
		    		?>

					<?php while( $events_query->have_posts() ) : ?>

						<?php $events_query->the_post(); ?>

							<?php $date = get_field('date');
								$short_description = get_field('short_description');
								$type_arr = get_field('event_type');
								$type = $type_arr['label'];
								$type_icon = $type_arr['value'];

								$dateArr = explode('/', $date);

								$new_month = $dateArr[0];
								$new_day = $dateArr[1];
								$new_year = $dateArr[2];


								if($new_year > $year || $new_month > $month) : ?>
									<?php if($counter !== 0) : ?></div><?php endif; ?><div class="events__slide <?php echo $new_year; ?>/<?php echo $new_month; ?> <?php if($new_year >= $todays_year && $new_month >= $todays_month) : ?>first<?php elseif ($new_year === ($todays_year + 1) && ($todays_month === 12)) : ?>first<?php endif; ?>" data-counter="<?php echo $counter; ?>">

										<?php
											$monthNum  = $new_month;
											$dateObj   = DateTime::createFromFormat('!m', $monthNum);
											$monthName = $dateObj->format('F');

											$yearNum  = $new_year;
											$yearObj   = DateTime::createFromFormat('Y', $yearNum);
											$yearName = $yearObj->format('y');
										?>

										<h2><?php echo $monthName; ?> '<?php echo $yearName; ?></h2>

										<?php if(get_field('add_link')) : ?>
											<?php if(get_field('link_destination') == 'int') : ?>
												<a href="<?php echo get_field('link_int'); ?>">
													<div class="events__single">
														<p><?php aqua_svg($type_icon); echo $type; ?></p>
														<p><?php echo $short_description; ?></p>
													</div>
												</a>
											<?php elseif(get_field('link_destination') == 'ext') : ?>
												<a href="<?php echo get_field('link_ext'); ?>" target="_blank" rel="nofollow">
													<div class="events__single">
														<p><?php aqua_svg($type_icon); echo $type; ?></p>
														<p><?php echo $short_description; ?></p>
													</div>
												</a>
											<?php endif; ?>
										<?php else : ?>
											<div class="events__single">
												<p><?php aqua_svg($type_icon); echo $type; ?></p>
												<p><?php echo $short_description; ?></p>
											</div>
										<?php endif; ?>
									<?php
										$year = $new_year;
										$month = $new_month;
										++$counter;
									?>
								<?php else : ?>
									<?php if(get_field('add_link')) : ?>
										<?php if(get_field('link_destination') == 'int') : ?>
											<a href="<?php echo get_field('link_int'); ?>">
												<div class="events__single">
													<p><?php aqua_svg($type_icon); echo $type; ?></p>
													<p><?php echo $short_description; ?></p>
												</div>
											</a>
										<?php elseif(get_field('link_destination') == 'ext') : ?>
											<a href="<?php echo get_field('link_ext'); ?>" target="_blank" rel="nofollow">
												<div class="events__single">
													<p><?php aqua_svg($type_icon); echo $type; ?></p>
													<p><?php echo $short_description; ?></p>
												</div>
											</a>
										<?php endif; ?>
									<?php else : ?>
										<div class="events__single">
											<p><?php aqua_svg($type_icon); echo $type; ?></p>
											<p><?php echo $short_description; ?></p>
										</div>
									<?php endif; ?>
								<?php endif;  ?>

			    		<?php wp_reset_postdata(); ?>

	    			<?php endwhile; ?>
	    			</div>
    			</div>
    		<?php endif; ?>
    		<div class="event__next"></div>
		</div>
	</div>
</section>
