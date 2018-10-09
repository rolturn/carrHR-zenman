<?php

function console($data) {
  echo '</script>console.log('. json_encode($data) .');</script>';
}
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


/*
 *
 *
 */

add_filter("shortcode_atts_wpcf7", function ($out, $pairs, $atts, $shortcode) {
  foreach (["send-to"] as $a) {
    $out[$a] = (isset($atts[$a])) ? $atts[$a] : '';
  }
  return $out;
}, 10, 4);

add_action('wpcf7_before_send_mail', 'ew_wpcf7_extend', 10, 2);
function ew_wpcf7_extend($contact_form) {
  $submission = WPCF7_Submission::get_instance();
  $posted_data = $submission->get_posted_data();
  $email = (!empty($posted_data["send-to"])) ? $posted_data["send-to"] : '';
  $mail = $contact_form->prop('mail') ;
  $mail['recipient'] .= !empty($mail['recipient']) ? ', '.$email : $email;
  $contact_form->set_properties(array(
   "mail" => $mail,
  ));
  return $contact_form;
}
