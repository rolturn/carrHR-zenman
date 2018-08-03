<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header();
$related = get_posts(
  array(
    'category__in' => wp_get_post_categories($post->ID),
    'numberposts' => 3,
    'post__not_in' => array($post->ID)
    )
  );
// $related = '';

?>

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
        <div class="main-content post<?php !empty($related) ? print ' has-aside has-aside__right' : ''; ?>">

          <div class="post__article">
            <div class="post-single__title">
              <h1><?php echo the_title(); ?></h1>
            </div>

            <div class="post-single__social">
              <?php get_template_part('templates/parts/social','share'); ?>
            </div>

            <div class="post-single__text">
              <?php the_content(); ?>
            </div>
          </div>
          <?php if ( $related ){ ?>
          <aside class="post__related">

              <div class="post-single__related-title">
                <h3>Related Posts</h3>
              </div>

              <div class="post-single__related-container">
                <?php foreach( $related as $post ) {
                setup_postdata($post); ?>
                <?php get_template_part( 'templates/parts/blog', 'excerpt-alt' ); ?>
                <?php } ?>
              </div>
          </aside>
          <?php }
          wp_reset_postdata();
          ?>

        </div>
      </div>


    </div>


  </section><!-- // single-torso -->
<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
