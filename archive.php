<?php
/**
 * The template for displaying archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header(); ?>

<section class="main-torso blog-torso--sidebar">
    <div class="blog-torso__inner">
        <aside class="blog-torso__sidebar">
            <?php get_sidebar(); ?>
        </aside><!-- //cat-torso__sidebar -->
        <?php if (have_posts()): ?>
            <h1>
                <?php if ( is_day() ) : ?>
                    <?php printf( __( 'Daily Archives: <span>%s</span>', 'twentyten' ), get_the_date() ); ?>
                <?php elseif ( is_month() ) : ?>
                    <?php printf( __( 'Monthly Archives: <span>%s</span>', 'twentyten' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'twentyten' ) ) ); ?>
                <?php elseif ( is_year() ) : ?>
                    <?php printf( __( 'Yearly Archives: <span>%s</span>', 'twentyten' ), get_the_date( _x( 'Y', 'yearly archives date format', 'twentyten' ) ) ); ?>
                <?php else : ?>
                    <?php _e( 'Blog Archives', 'twentyten' ); ?>
                <?php endif; ?>
            </h1>
        <?php endif; ?>

        <article class="blog-torso__content">
            <?php if (have_posts()): ?>
                <?php
                    while (have_posts()) : the_post();
                        get_template_part('templates/parts/blog', 'excerpt');
                    endwhile;
                ?>
            <?php endif; ?>
            <div class="pagination-block"><?php get_template_part('templates/parts/blog', 'pagination'); ?></div>
        </article> <!-- //blog-torso__content -->
    </div><!-- //blog-torso__inner -->
</section><!-- //blog-torso -->

<?php get_footer(); ?>
