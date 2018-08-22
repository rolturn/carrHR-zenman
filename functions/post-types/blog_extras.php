<?php

add_action( 'init', 'create_blog_tax' );

function create_blog_tax() {
	$labels = array(
		'name'              => __( 'Blog Series', 'blog_series', 'textdomain' ),
		'search_items'      => __( 'Search Blog Series', 'textdomain' ),
		'all_items'         => __( 'All Series', 'textdomain' ),
		'parent_item'       => __( 'Parent Blog', 'textdomain' ),
		'parent_item_colon' => __( 'Parent Blog:', 'textdomain' ),
		'edit_item'         => __( 'Edit Series', 'textdomain' ),
		'update_item'       => __( 'Update Series', 'textdomain' ),
		'add_new_item'      => __( 'Add New Series', 'textdomain' ),
		'new_item_name'     => __( 'New Blog Series Name', 'textdomain' ),
		'menu_name'         => __( 'Blog Series', 'textdomain' ),
	);

	$args = array(
		'labels' => $labels,
		// 'show_ui' => true,
		// 'rewrite' => array( 'slug' => 'series' ),
		'hierarchical' => true,
		'show_admin_column'     => true,
		'query_var'             => true,
	);

	register_taxonomy('blog_series', 'post', $args );
}
