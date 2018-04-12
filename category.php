<?php
/**
 * The template for displaying category archive pages.
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
        </aside><!-- //blog-torso__sidebar -->
        <article class="blog-torso__content">
            <?php
                while (have_posts()) : the_post();
                  if (has_category('blog', get_the_id())) {
                    get_template_part('templates/parts/blog', 'excerpt');
                  } else {
                    get_template_part('templates/parts/blog', 'excerpt-alt');

                  }
                endwhile;
            ?>
            <div class="pagination-block"><?php get_template_part('templates/parts/blog', 'pagination'); ?></div>
        </article><!-- //blog-torso__content -->
    </div><!-- //blog-torso__inner -->
</section><!-- //blog-torso -->

<?php get_footer(); ?>
