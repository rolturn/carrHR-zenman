<?php
/*
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 1.0
 */

/*
 * Require any custom functions you'd like to add to this theme.
 *
 * This is where you should add any custom functions specific
 * to the current theme.
 */
require_once('functions/enqueue.php');


/*
 * Require any custom functions you'd like to add to this theme.
 *
 * This is where you should add any custom functions specific
 * to the current theme.
 */
require_once('functions/custom-functions.php');


/*
 * Require Zemplate's standard collection of miscellaneous functions
 *
 * These are helpful functions included with all Zemplate themes.
 */

require_once('functions/zemplate-functions.php');


/*
 * Require custom post types and taxonomies
 *
 * This will auto load everything in the directory.
 */
foreach (glob(get_template_directory().'/functions/post-types/*.php', GLOB_NOSORT) as $filename){
    require_once $filename;
}


/*
 * Require acf modules
 *
 * This will auto load everything in the directory.
 */
foreach (glob(get_template_directory().'/functions/modules/*.php', GLOB_NOSORT) as $filename){
    require_once $filename;
}