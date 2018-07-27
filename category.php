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

$blog_id = 3719;

$tags = get_tags();
$tag_html = '<nav class="post_tags">';
$tag_html .= "<button>All</button>";
foreach ( $tags as $tag ) {
	$tag_link = get_tag_link( $tag->term_id );
	$tag_html .= "<button value='{$tag->name}'>{$tag->name}</button>";
}
$tag_html .= '</nav>';
debug(!empty($tags));

$category = get_category(get_query_var('cat'),false);

// $category = get_category(get_query_var('cat'),false);
// // https://stackoverflow.com/questions/38985334/year-and-month-in-wordpress-archive-list
// wp_custom_archive($args, $category->slug);

?>

<div class="content content__inner">
	<h1 class="section-header section-header__left"><?php echo $category->name; ?></h1>

	<?php if (!empty($category->category_description)): ?>
	<div class="category-description">
	  <?php echo $category->category_description; ?>
	</div>
	<?php endif; ?>

	<div class="main-content<?php !empty($tags) ? print' has-aside has-aside__right' : false; ?>">
		<?php if (!empty($tags)): ?>
		<aside>
			<div id="category-filters" class="filters dropdown tags">
			  <div class="trigger selected-topic caret-circle-down-after" style="display: none;">Select a Topic</div><!-- /.trigger -->
			  <?php echo $tag_html;  ?>
			</div><!-- /#category-filters -->
		</aside>
		<?php endif; ?>
		<div class="post-category" data-category-slug="<?php echo $category->slug; ?>">
			<div class="content">
				<!-- Ajax will add list of links here -->
			</div><!-- /.content -->
			<div class="loading" style="display: none;">
				<div class="loader">Loading...</div>
			</div>
			<div id="pagination" class="filters button-list pager"></div><!-- /#pagination -->
		</div><!-- /.post-category -->
	</div><!-- /.post-category -->

</div><!-- /.main-content main-content__inner -->

<?php get_footer(); ?>
