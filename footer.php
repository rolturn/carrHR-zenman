<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the wrap div and all content
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 1.0
 */
?>

    <footer class="main-foot">
        <div class="main-foot__nav">
            <div class="nav__inner">
                <div class="footer__logo">
                    <a href="<?php bloginfo('url'); ?>" title="Carr Homepage"><img src="<?php echo get_bloginfo('template_url'); ?>/images/logo_carr_corporate_rev.svg" alt=""></a>
                </div>
                <div class="footer__social">
                    <?php
                        $template_url = get_bloginfo('template_url');
                        $footerContacts = array(
                          array(
                            "title" => "Contact",
                            "path" => "Contact_Icon.svg",
                            "fa" => "fas fa-comment-dots",
                            "field" => "contact_link_footer",
                            "target" => false,
                          ),
                          array(
                            "title" => "LinkedIn",
                            "path" => "LinkedIn_Icon.svg",
                            "fa" => "fab fa-linkedin-in",
                            "field" => "linkedin_link_footer",
                            "target" => "_blank",
                          ),
                          array(
                            "title" => "Instagram",
                            "path" => "Instagram_Icon.svg",
                            "fa" => "fab fa-instagram",
                            "field" => "instagram_link_footer",
                            "target" => "_blank",
                          ),
                          array(
                            "title" => "Facebook",
                            "path" => "Facebook_Icon.svg",
                            "fa" => "fab fa-facebook-f",
                            "field" => "facebook_link_footer",
                            "target" => "_blank",
                          ),
                          array(
                            "title" => "Twitter",
                            "path" => "Twitter_Icon.svg",
                            "fa" => "fab fa-twitter",
                            "field" => "twitter_link_footer",
                            "target" => "_blank",
                          ),
                          array(
                            "title" => "Youtube",
                            "path" => "Youtube_Icon.svg",
                            "fa" => "fab fa-youtube",
                            "field" => "youtube_link_footer",
                            "target" => "_blank",
                          ),
                        );
                    ?>
                    <?php foreach ($footerContacts as $footerContact) : ?>
                      <?php if(get_field($footerContact['field'], 'option')) : ?>
                        <a
                          <?php echo $footerContact['target'] ? 'target="'.$footerContact['target'].'"' : false; ?>
                          class="<?php echo strtolower($footerContact['title']); ?>"
                          href="<?php the_field($footerContact['field'], 'option'); ?>">
                            <i class="<?php echo $footerContact['fa']; ?>"></i>
                        </a>
                      <?php endif; ?>
                    <?php endforeach; ?>
                </div>
                <?php
                    $attr = array(
                        'theme_location'  => 'foot-menu',
                        'container'       => 'nav',
                        'menu_class'      => 'menu'
                    );
                    wp_nav_menu($attr);
                ?>
            </div>
        </div>
    </footer><!-- // main-foot -->
<!-- sticky footer will fail if anything goes between the closing footer and .wrap -->
</div><!-- // wrap-all-the-things -->

<div id="js-youtube-popout-root" class="youtube-popout-root">

    <div class="js-youtube-popout popout-content">
        <div class="youtube-container">
            <div id="close" class="close">X</div>
        </div>
    </div>

</div>

<?php wp_footer(); //mandatory ?>

<?php the_field('before_closing_body', 'option'); ?>

</body>
</html>
