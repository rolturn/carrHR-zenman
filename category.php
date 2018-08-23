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

$tax = "blog_series";

$tags = get_terms(
	array (
		'taxonomy' => $tax,
	)
);

if (!empty($tags)) {
	$tag_html = '<nav class="post_tags">';
	$tag_html .= "<button>All</button>";
	foreach ( $tags as $tag ) {
		$tag_link = get_tag_link( $tag->term_id );
		$tag_html .= "<button value='{$tag->term_id}' data-slug='{$tag->name}' data-taxonomy='{$tag->taxonomy}'>{$tag->name}</button>";
	}
	$tag_html .= '</nav>';
}

$category = get_category(get_query_var('cat'),false);

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
			  <div class="trigger selected-topic caret-circle-down-after" style="display: none;">Select a Series</div><!-- /.trigger -->
			  <?php echo $tag_html;  ?>
			</div><!-- /#category-filters -->
		</aside>
		<?php endif; ?>
		<div class="post-category" data-category-slug="<?php echo $category->slug; ?>">
			<div class="content">
				<!-- Ajax will add list of links here -->
			</div><!-- /.content -->
			<div class="loading">
				<div class="loader">Loading...</div>
			</div>
			<div id="pagination" class="filters button-list pager"></div><!-- /#pagination -->
		</div><!-- /.post-category -->
	</div><!-- /.post-category -->

</div><!-- /.main-content main-content__inner -->

<?php get_footer(); ?>
