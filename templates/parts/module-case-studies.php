<section class="module-case-studies case-studies">
	<div class="case-studies__inner">

		<?php if( have_rows('add_case_study') ): ?>

			<div class="case-studies__wrapper">

		    <?php while ( have_rows('add_case_study') ) : the_row();
		    	$link = '';
		    	$target = '_blank';
		    	if('link' === get_sub_field('link_type')){
		    		$link = get_sub_field('link');
		    		$target = get_sub_field('link_target');
		    	} elseif('file' === get_sub_field('link_type')){
			    	$link = get_sub_field('file');
		    	}
		       	$text = get_sub_field('text'); ?>

		        <a class="case-studies__single" href="<?php echo $link; ?>" target="<?php echo $target; ?>">
					<svg>
						<use xlink:href="<?php echo get_template_directory_uri() ?>/images/case-study.svg#case-study"></use>
					<svg>
					<h5><?php echo $text; ?></h5>
		        </a>

		    <?php endwhile; ?>

		    </div>

		<?php endif; ?>

	</div>
</section>
