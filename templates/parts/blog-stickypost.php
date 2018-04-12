<article class="blog-sticky">
    <?php $page_id = '18'; ?>
    <?php $post_obj = get_field('first_sticky_post', $page_id); if($post_obj) : ?>
        <div class="blog-sticky__post">
            <div class="blog-sticky__image">
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php $bg_img = get_the_post_thumbnail_url($post_obj->ID); ?>
                    <div style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
                <?php endif; ?>
            </div>
            <div class="blog-sticky__text">
                <h1><a href="<?php the_permalink($post_obj); ?>" title="<?php echo esc_attr( sprintf( __( '%s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php echo get_the_title($post_obj->ID); ?></a></h1>

                <div class="blog-sticky__posted">
                    <?php echo get_the_date('m.d.y', $post_obj->ID);?><br>
                </div> <!-- // posted -->

                <div class="blog-sticky_content">
                    <?php echo get_excerpt_by_id($post_obj->ID); ?>
                </div> <!-- // post -->

                <div class="blog-sticky__tags">
                    <?php  foreach(get_the_tags($post_obj->ID) as $tag) { echo '<a href="'.get_term_link($tag).'">'.$tag->name.'</a><span>,</span> '; } ?>
                </div>
            </div>
        </div> <!-- //blog-sticky__post -->
    <?php endif; ?>
    <?php $post_obj_two = get_field('second_sticky_post', $page_id); if($post_obj_two) : ?>
        <div class="blog-sticky__post">
            <div class="blog-sticky__image">
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php $bg_img = get_the_post_thumbnail_url($post_obj_two->ID); ?>
                    <div style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
                <?php endif; ?>
            </div>
            <div class="blog-sticky__text">
                <h1><a href="<?php the_permalink($post_obj_two); ?>" title="<?php echo esc_attr( sprintf( __( '%s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php echo get_the_title($post_obj_two->ID); ?></a></h1>

                <div class="blog-sticky__posted">
                    <?php echo get_the_date('m.d.y', $post_obj_two->ID);?><br>
                </div> <!-- // posted -->

                <div class="blog-sticky_content">
                    <?php echo get_excerpt_by_id($post_obj_two->ID); ?>
                </div> <!-- // post -->

                <div class="blog-sticky__tags">
                    <?php  foreach(get_the_tags($post_obj_two->ID) as $tag) { echo '<a href="'.get_term_link($tag).'">'.$tag->name.'</a><span>,</span> '; } ?>
                </div>
            </div>
        </div> <!-- //blog-sticky__post -->
    <?php endif; ?>
    <?php $post_obj_three = get_field('third_sticky_post', $page_id); if($post_obj_three) : ?>
        <div class="blog-sticky__post">
            <div class="blog-sticky__image">
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php $bg_img = get_the_post_thumbnail_url($post_obj_three->ID); ?>
                    <div style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
                <?php endif; ?>
            </div>
            <div class="blog-sticky__text">
                <h1><a href="<?php the_permalink($post_obj_three); ?>" title="<?php echo esc_attr( sprintf( __( '%s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php echo get_the_title($post_obj_three->ID); ?></a></h1>

                <div class="blog-sticky__posted">
                    <?php echo get_the_date('m.d.y', $post_obj_three->ID);?><br>
                </div> <!-- // posted -->

                <div class="blog-sticky_content">
                    <?php echo get_excerpt_by_id($post_obj_three->ID); ?>
                </div> <!-- // post -->

                <div class="blog-sticky__tags">
                    <?php  foreach(get_the_tags($post_obj_three->ID) as $tag) { echo '<a href="'.get_term_link($tag).'">'.$tag->name.'</a><span>,</span> '; } ?>
                </div>
            </div>
        </div> <!-- //blog-sticky__post -->
    <?php endif; ?>
</article>