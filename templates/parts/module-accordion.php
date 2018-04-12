<?php

$title = get_sub_field('title');

?>


<section class="module-accordion accordion">

	<div class="accordion__inner">

		<div class="accordion__title">
			<h3 class="js-ease"><?php echo $title; ?></h3>
		</div>
		<?php if( have_rows('add_qanda') ):
		    while ( have_rows('add_qanda') ) : the_row();
				?>
		    	<div class="accordion__wrapper accordion-from-left">
		    		<div class="question js-accordion-title">
		    			<h4><?php echo get_sub_field('question'); ?></h4>
		    		</div>
		    		<div class="answer" style="display:none;"><!-- display set via js -->
		    			<?php echo get_sub_field('answer'); ?>
		    		</div>
		    	</div>

		    <?php endwhile;
		endif; ?>
	</div>

</section>
