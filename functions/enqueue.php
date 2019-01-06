<?php

/*------------------------------------*\
    //Enques
		//CSS
		//Javascript
\*------------------------------------*/

/*------------------------------------*\
    //CSS
\*------------------------------------*/
	function theme_styles(){
		wp_register_style( 'style', get_template_directory_uri() . '/style.css', array(), '1.0','screen, projection' );

		// enqueing:
		wp_enqueue_style( 'style' );
	}
	add_action('wp_enqueue_scripts', 'theme_styles');
	if($is_IE) {
		function ie_styles(){
			wp_register_style( 'ie', get_template_directory_uri() . '/css/ie.css', array(), '1.0','screen, projection' );

			// enqueing:
			wp_enqueue_style( 'ie' );
		}
		add_action('wp_enqueue_scripts', 'ie_styles');
	}
/*------------------------------------*\
    //Javascript
\*------------------------------------*/
// Register some javascript files, because we love javascript files. Enqueue a couple as well
// Reference: wp_register_script( $handle, $src, $deps, $ver, $in_footer );
function load_js_files() {
	if(!is_admin()){
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', false, '1.10.1', true);
		wp_register_script('lod', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js', false, '4.17.10', true);
		wp_register_script('scripts', get_template_directory_uri().'/js/scripts.min.js', array('jquery', 'lod'), '1.0', true);

		//Get in line!
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'lod' );
		wp_enqueue_script( 'scripts' );
		//If necessary, page specific enqueues
		// if ( is_page() ) {

		// }

	    $site_scripts = array(
	    	'site_url' => get_site_url(),
	    	'theme_url' => get_template_directory_uri(),
    	);
	    wp_localize_script('scripts', 'site', $site_scripts);


		wp_localize_script( 'scripts', 'ajax_posts', array(
		    'ajaxurl' => admin_url( 'admin-ajax.php' )
		) );

		// Enable ajax support for comments
		if(is_singular() && comments_open() && get_option('thread_comments')){
		    wp_enqueue_script('comment-reply');
		}
	}
}
add_action( 'wp_enqueue_scripts', 'load_js_files' );
