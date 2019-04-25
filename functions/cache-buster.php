<?php
/*--------------------------------------------------*|
	:: BEFORE EDITING THIS FILE PLEASE READ!!!!
\*--------------------------------------------------*/
/*
 * Do not edit the .php version of this file only edit the .tmp. Gulp will overwrite this file with each save
 * of JS or css with a new timestamp
 */

/*
 * Defines enqueue paths and version cache buster for theme asset files.
 *
 * Due to WP Engine caching we were constantly having issues with asset files cached on local machines.
 */

function ew_bust_that_cache () {
  define('CACHE_VERSION', 3.1556151247);
}
add_action('init', 'ew_bust_that_cache');
