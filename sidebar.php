<?php
/**
 * The template for displaying the sidebar.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 2.0
 */
?>

<ul>
    <?php wp_list_categories('title_li='); ?>
	<li><a href="<?php bloginfo('url'); ?>/faq/">FAQ</a></li>
    <div id="archive-drawer">
        <ul class="archive-years">
            <?php wp_get_archives('type=yearly'); ?>
        </ul>
    </div>
</ul>
