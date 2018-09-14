<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 3.0
 */
  get_header();

  function create_query_option($array, $value, $property) {
    if (!empty($value)) {
      $array[$property] = create_slug($value);
    }
    return $array;
  }

  $search_query = array();

  // create propertyies of query
  $search_query = create_query_option($search_query, get_field('broker_region'), 'region');
  $search_query = create_query_option($search_query, $post->post_name, 'broker');

  $state = !empty(get_field('broker_state')) && !empty(get_field('broker_state')['label']) ? create_slug(get_field('broker_state')['label']) . '/' : '';

  $query_string = count($search_query) > 0 ? '?'.http_build_query($search_query) : false;

  header('HTTP/1.1 301 Moved Permanently');
  header('Location: ' . get_the_permalink(143) . $state . $query_string);
  exit();
?>
