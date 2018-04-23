<?php

$title = get_sub_field('title');

$is_page_header = get_sub_field('is_page_header');
$header_size = get_sub_field('header_size') == 'none' || get_sub_field('header_size') == array() ? false : get_sub_field('header_size');

$headerClasses = $header_size ? ' class="'.$header_size.'"' : false;
?>


<section class="module-accordion accordion">

	<div class="accordion__inner">

		<?php if($is_page_header): ?>
			<div class="accordion__title__page-header"><h1<?php echo $headerClasses; ?>><?php echo $title; ?></h1></div>
		<?php else: ?>
			<div class="accordion__title"><h2<?php echo $headerClasses; ?>><?php echo $title; ?></h2></div>
		<?php endif; ?>

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
