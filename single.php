<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
    <section class="post-single">


        <div class="post-single__container">
            <?php if( has_post_thumbnail() ) : ?>
                <div class="post-single__image" style="background: url(<?php the_post_thumbnail_url('full'); ?>) no-repeat center center; background-size: cover;">
                </div>
            <?php else: ?>
                <section class="hero-none"></section>
            <?php endif; ?>
            <div class="post-single__inner">
                <div class="post-single__body">

                    <div class="post-single__content">
                        <div class="post-single__title">
                            <h1><?php echo the_title(); ?></h1>
                        </div>
                        <div class="post-single__date">
                            <h5><?php echo the_date(); ?></h5>
                        </div>

                        <div class="post-single__social">
                            <?php get_template_part('templates/parts/social','share'); ?>
                        </div>

                        <div class="post-single__text">
                            <?php the_content(); ?>
                        </div>
                    </div>
                    <div class="post-single__related">
                        <?php
                        $related = get_posts(
                            array(
                                'category__in' => wp_get_post_categories($post->ID),
                                'numberposts' => 3,
                                'post__not_in' => array($post->ID)
                                )
                            );
                            if( $related ){ ?>


                            <div class="post-single__related-title">
                                <h3>Related Posts</h3>
                            </div>

                            <div class="post-single__related-container">
                                <?php foreach( $related as $post ) {
                                setup_postdata($post); ?>
                                <div class="blog-sticky__post">
                                    <div class="blog-sticky__image">
                                        <?php if ( has_post_thumbnail() ) : ?>
                                            <a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( '%s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
                                                <div style="background: url(<?php echo fly_get_attachment_image_src( get_post_thumbnail_id(), 'animated-lines' )['src']; ?>) no-repeat center center; background-size: cover;"></div>
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                    <div class="blog-sticky__text">
                                        <h1><a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( '%s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php echo get_the_title(); ?></a></h1>
                                    </div>
                                </div> <!-- //blog-sticky__post -->
                                <?php } ?>
                            </div>
                            <?php }
                        wp_reset_postdata();
                        ?>
                    </div>

                </div>
            </div>


        </div>


    </section><!-- // single-torso -->
<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
