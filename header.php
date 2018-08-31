    <?php
/**
 * The header for our theme.
 *
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 2.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
	<title><?php is_front_page() ? wp_title('') : wp_title(''); ?></title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-TXfwrfuHVznxCssTxWoPZjhcss/hp38gEOH8UPZG/JcXonvBQ6SlsIF49wUzsGno" crossorigin="anonymous">
    <!--[if lt IE 9]>
        <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <?php wp_head(); //mandatory ?>
    <?php // get_template_part('templates/parts/header', 'analytics'); ?>
    <?php the_field('before_closing_head', 'option'); ?>
</head>

<body <?php body_class('page-'.$post->post_name); ?>>
<?php the_field('after_opening_body', 'option'); ?>
<div class="wrap-all-the-things">
    <header class="main-head main-head--<?php echo (get_field('add_a_hero', $GLOBALS['page_id_to_use']) || ('post' === get_post_type() && is_single()) ? 'has-hero' : 'no-hero'); ?>">
        <div class="main-head__nav">
            <div class="head-nav head-nav__desktop">
                <div class="head-nav__inner">
                    <div class="head-nav__logo">
                        <a href="<?php bloginfo('url'); ?>" title="Carr Home page">
                            <img src="<?php echo get_bloginfo('template_url'); ?>/images/logo-color.png" alt="">
                        </a>
                    </div>
                    <div class="head-nav__navigation">
                        <div class="head-nav__utility">
                            <a href="<?php bloginfo('url'); ?>/lease-or-purchase-evaluation/" class="lease" title="Lease or Purchase Evaluation">Lease or Purchase Evaluation</a>
                            <a href="<?php echo get_the_permalink(143); ?>" title="Find an Agent" class="broker">Find an Agent</a>
                        </div>
                        <?php
                            $attr = array(
                                'theme_location'  => 'head-menu',
                                'container'       => 'nav',
                                'container_class' => 'head-nav__menu',
                                'menu_class'      => 'menu',
                            );
                            wp_nav_menu($attr);
                        ?>
                    </div>
                </div>
            </div>
            <div class="head-nav head-nav__mobile">
                <div class="head-nav__inner">
                    <div class="head-nav__main">
                        <a class="head-nav__logo" href="<?php bloginfo('url'); ?>" title="Carr Home page">
                            <img src="<?php echo get_bloginfo('template_url'); ?>/images/logo-color.png" alt="">
                        </a>
                        <div class="head-nav__buttons">
                          <a id="mobile-telephone" href="tel:<?php the_field('global_phone_number', 'option') ?>" class="head-nav__phone"><span>Phone</span></a>
                          <div class="hamburger-helper">
                              <div class="hamburger" id="hamburger-6">
                                <span class="line"></span>
                                <span class="line"></span>
                                <span class="line"></span>
                              </div>
                          </div>
                        </div><!-- /.head-nav-buttons -->
                    </div>
                    <div class="head-nav__navigation mobile-dropdown" id="head-nav__mobile">
                        <ul class="head-nav__utility">
                          <li>
                            <a href="<?php echo get_the_permalink(143); ?>" title="Find an Agent" class="broker">Find an Agent</a>
                          </li>
                          <li>
                            <a href="<?php echo get_the_permalink(408); ?>" title="Lease or Purchase Evaluation" class="eval">Lease or Purchase Evaluation</a>
                          </li>
                        </ul>
                        <?php
                            $attr = array(
                                'theme_location'  => 'head-menu',
                                'container'       => 'nav',
                                'container_class' => 'head-nav__menu',
                                'menu_class'      => 'menu',
                            );
                            wp_nav_menu($attr);
                        ?>
                    </div>
                    <div class="head-nav__navigation mobile-dropdown" id="head-nav__phone">
                        <p><a href="<?php echo get_the_permalink(143); ?>" title="Find an Agent" class="button--light">Local Agent</a></p>
                        <p><a href="tel:<?php the_field('global_phone_number', 'option') ?>" class="button--light">Corporate Office</a></p>
                    </div>
                </div>
            </div>
        </div>
        <?php if(get_field('add_a_hero', $GLOBALS['page_id_to_use'])) : ?>
            <?php echo get_template_part('templates/parts/hero', get_row_layout()); ?>
        <?php endif; ?>
    </header> <!-- //main-head -->
