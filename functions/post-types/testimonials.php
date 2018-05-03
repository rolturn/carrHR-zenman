<?php
/*
 * @package WordPress
 * @subpackage Zemplate
 *
 * Modifiers Post Type
 *
 */
/*------------------------------------*\
    :: Modifiers
\*------------------------------------*/
add_action('init', 'create_testimonials');

function create_testimonials() {
    //custom post type
    register_post_type('testimonials',
        array(
            'labels'       => array(
                'name'                       => 'Testimonials', 'Taxonomy General Name', 'text_domain',
                'singular_name'              => 'Testimonial', 'Taxonomy Singular Name', 'text_domain',
                'menu_name'                  => 'Testimonials', 'text_domain',
                'all_items'                  => 'All Testimonials', 'text_domain',
                'parent_item'                => 'Parent Testimonial', 'text_domain',
                'parent_item_colon'          => 'Parent Testimonial:', 'text_domain',
                'new_item_name'              => 'New Testimonial Name', 'text_domain',
                'add_new_item'               => 'Add New Testimonial', 'text_domain',
                'edit_item'                  => 'Edit Testimonial', 'text_domain',
                'update_item'                => 'Update Testimonial', 'text_domain',
                'separate_items_with_commas' => 'Separate Testimonials with commas', 'text_domain',
                'search_items'               => 'Search Testimonials', 'text_domain',
                'add_or_remove_items'        => 'Add or remove Testimonials', 'text_domain',
                'choose_from_most_used'      => 'Choose from the most used Testimonials', 'text_domain',
                'not_found'                  => 'Not Found', 'text_domain',
            ),
            'public' => true,
            'has_archive' => false,
            'with_front' => false,
            'menu_icon'   => 'dashicons-format-quote',
            'publicly_queryable' => true,
            'menu_position' => 20,
            'rewrite' => array( 'slug' => 'healthcare-real-estate-testimonials' ),
            'supports' => array(
                'title',
                'thumbnail',
                'editor'
            ),
        )
    );
}


add_action( 'init', 'create_testimonial_tax' );

function create_testimonial_tax() {
    register_taxonomy(
        'type',
        'testimonials',
        array(
            'label' => __( 'Testimonial Categories' ),
            'with_front' => false,
            'rewrite' => array( 'slug' => 'healthcare-real-estate-testimonials/category' ),
            'hierarchical' => true,
        )
    );
}

add_action( 'init', 'rewrite_testimonal_endpoint' );

function rewrite_testimonal_endpoint() {
  add_rewrite_endpoint( 'testimonials', EP_PERMALINK | EP_PAGES | EP_CATEGORIES );
}
