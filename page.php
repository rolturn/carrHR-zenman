<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the wordpress construct of pages
 * and that other 'pages' on your wordpress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header(); ?>

<?php if ( !post_password_required() ) : ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>



	    <main class="main-torso page-torso">

	        <?php if(get_field('modules')) : ?>

	            <?php while(has_sub_field('modules')): ?>
	                <?php echo get_template_part('templates/parts/module', get_row_layout()); ?>
	            <?php endwhile; ?>
	        <?php else: ?>
		        <div class="page-torso__inner">
		            <article class="page-torso__content">
		                <h1><?php the_title(); ?></h1>
		                <?php the_content(); ?>
		            </article><!-- //page-torso__content -->
		        </div><!-- //page-torso__inner -->
	        <?php endif; ?>
	    </main><!-- //page-torso -->

	<?php endwhile; ?>

<?php else : ?>
    <?php echo my_password_form(); ?>
<?php endif; ?>

<?php get_footer(); ?>