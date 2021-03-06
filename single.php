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

      ?>
      <div class="post-single__inner">
        <div class="main-content post<?php (isset($other_series_posts) && !empty($other_series_posts)) ? print ' has-aside has-aside__right' : ''; ?>">

          <div class="post__article">
            <div class="post-single__title">
              <hgroup>
                <h1><?php echo the_title(); ?></h1>
                <h2><?php echo $post_term->name; ?></h2>
              </hgroup>
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
                <h3>Other Blogs From Series</h3>
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

<script>
  // Find all YouTube videos
  var $allVideos = $("iframe[src^='//www.youtube.com']");

  // The element that is fluid width
  var $fluidEl = $(".post__article");

  // Figure out and save aspect ratio for each video
  $allVideos.each(function() {

    $(this)
      .attr('data-ratio', this.height / this.width)
      // and remove the hard coded width/height
      .removeAttr('height').removeAttr('width')
      // wrap in div for absolute positioning
      .wrap("<div class='video-wrapper'></div>");
  });

  // When the window is resized
  $(window).resize(function() {

    var newWidth = $fluidEl.width();

    // Resize all videos according to their own aspect ratio
    $allVideos.each(function() {
      $(this).width(newWidth).height(newWidth * $(this).data('ratio'));
    });

  // Kick off one resize to fix all videos on page load
  }).resize();

</script>
