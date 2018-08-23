<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

get_header();

$tax_group = 'blog_series';
$post_term = get_the_terms($post, $tax_group)[0];

$args = array (
  // 'post__not_in' => array($post->ID),
  'order' => 'ASC',
  'tax_query' =>   array (
    array (
      'taxonomy' => $post_term->taxonomy,
      'field' => 'term_id',
      'terms' => $post_term->term_id,
    )
  )
);

$currentID = $post->ID;

$series_posts = get_posts( $args );
$series_count = count($series_posts);
if ($series_count > 1) {
  $other_series_posts = $series_posts;
  $other_posts_count = 3;
  $blog_id = 26;
  $blog_page_url = get_category_link( $blog_id );

  // if ($series_count > $other_posts_count) {
  //   $other_series_posts = array_slice($series_posts, 0, $other_posts_count);
  //   $additional_posts_link = $blog_page_url . '?id=' . $post_term->term_id . '&page=0';
  // }
}

?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
  <section class="post-single">


    <div class="post-single__container">
      <?php if( has_post_thumbnail() ) : ?>
        <div class="post-single__image" style="background: url(<?php the_post_thumbnail_url('full'); ?>) no-repeat center center; background-size: cover;">
        </div>
      <?php else: ?>
        <section class="hero-none"></section>
      <?php endif;
      d($post);

      ?>
      <div class="post-single__inner">
        <div class="main-content post<?php (isset($other_series_posts) && !empty($other_series_posts)) ? print ' has-aside has-aside__right' : ''; ?>">

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
          <?php if ( $other_series_posts ): ?>
          <aside class="post__related">

              <div class="post-single__related-title">
                <h3>The <?php echo $post_term->name; ?> Series</h3>
              </div>

              <div class="post-single__related-container">
                <?php foreach( $other_series_posts as $post ) {
                setup_postdata($post);
                $post->isCurrent = false;
                if ($post->ID === $currentID) {
                  $post->isCurrent = true;
                }
                ?>
                <?php get_template_part( 'templates/parts/blog', 'excerpt-alt' ); ?>
                <?php }
                  wp_reset_postdata();
                 ?>
              </div>
              <?php if (isset($additional_posts_link) && !empty($additional_posts_link)): ?>
                <a href="<?php echo $additional_posts_link; ?>" class="more">See All Blogs from this Series.</a>
              <?php
                endif;
              ?>
          </aside>

        <?php endif; ?>

        </div>
      </div>


    </div>


  </section><!-- // single-torso -->
<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
