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
add_action('init', 'create_events');

function create_events() {
    //custom post type
    register_post_type('events',
        array(
            'labels'       => array(
                'name'                       => 'Events', 'Taxonomy General Name', 'text_domain',
                'singular_name'              => 'Event', 'Taxonomy Singular Name', 'text_domain',
                'menu_name'                  => 'Events', 'text_domain',
                'all_items'                  => 'All Events', 'text_domain',
                'parent_item'                => 'Parent Event', 'text_domain',
                'parent_item_colon'          => 'Parent Event:', 'text_domain',
                'new_item_name'              => 'New Event Name', 'text_domain',
                'add_new_item'               => 'Add New Event', 'text_domain',
                'edit_item'                  => 'Edit Event', 'text_domain',
                'update_item'                => 'Update Event', 'text_domain',
                'separate_items_with_commas' => 'Separate Events with commas', 'text_domain',
                'search_items'               => 'Search Events', 'text_domain',
                'add_or_remove_items'        => 'Add or remove Events', 'text_domain',
                'choose_from_most_used'      => 'Choose from the most used Events', 'text_domain',
                'not_found'                  => 'Not Found', 'text_domain',
            ),
            'public' => true,
            'has_archive' => false,
            'with_front' => true,
            'menu_icon'   => 'dashicons-calendar-alt',
            'publicly_queryable' => false,
            'menu_position' => 20,
            'supports' => array(
                'title',
            ),
        )
    );
}
