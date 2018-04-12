<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header(); ?>

    <main class="main-torso page-torso">

        <?php if(get_field('modules', $GLOBALS['page_id_to_use'])) : // 404-page page ?>

            <?php while(has_sub_field('modules', $GLOBALS['page_id_to_use'])): // 404-page page ?>
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

<?php get_footer(); ?>