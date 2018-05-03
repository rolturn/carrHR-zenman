<?php
/**
 * The template for displaying category archive pages.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */

// main blog category id = 3719
// switched from using get_category('blog', get_the_id()) to define template after it broke which client changed template slug

get_header();

$tags = get_tags();
$tag_header = '<h3>Tag List</h3>';
$tag_html = '<nav class="post_tags">';
foreach ( $tags as $tag ) {
	$tag_link = get_tag_link( $tag->term_id );

	$tag_html .= "<a href='{$tag_link}' title='{$tag->name} Tag' class='{$tag->slug}'>";
	$tag_html .= "{$tag->name}</a>";
}
$tag_html .= '</nav>';
echo $tag_header, $tag_html;


$archives = wp_get_archives();
        
?>

<a href="<?php echo get_month_link('', ''); ?>">All posts this month</a>

<section class="main-torso blog-torso--sidebar">
    <div class="blog-torso__inner">
        <aside class="blog-torso__sidebar">
            <?php get_sidebar(); ?>
        </aside><!-- //blog-torso__sidebar -->
        <article class="blog-torso__content">
            <?php
                while (have_posts()) : the_post();
                  if (get_the_category(3719)) {
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
