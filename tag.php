<?php
/**
 * The template for displaying tag archive pages.
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
        <h1><?php echo 'Tag Archives: ' . single_tag_title('', false); ?></h1>
        
        <article class="blog-torso__content">
            <?php
                while (have_posts()) : the_post();
                    get_template_part('templates/parts/blog', 'excerpt');
                endwhile;
            ?>
            <div class="pagination-block"><?php get_template_part('templates/parts/blog', 'pagination'); ?></div>
        </article><!-- //blog-torso__content -->
    </div><!-- //blog-torso__inner -->
</section><!-- //blog-torso -->

<?php get_footer(); ?>