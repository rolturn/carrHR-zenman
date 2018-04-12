<a href="<?php echo the_permalink(); ?>" class="blog__single <?php if(get_the_post_thumbnail()) : ?>has-image<?php endif; ?>" id="post-<?php the_ID(); ?>"><?php echo get_post_meta($post->ID, 'image', $single = true); ?>

    <?php if( has_post_thumbnail() ) : ?>
        <div class="blog__image" style="background: url(<?php the_post_thumbnail_url(); ?>) no-repeat center center; background-size: cover;">
        </div> 
    <?php endif; ?>   

    <div class="blog__text"> 
        <h4><?php echo the_title(); ?></h4>
        <h5><?php echo the_date('m.d.y'); ?></h5>
        <p>
            <?php
                $content = get_the_content();
                $thecontent = wp_filter_nohtml_kses( $content ); 
                $getlength = strlen($thecontent);
                $thelength = 100;
                $substr = substr($thecontent, 0, $thelength);
                echo ( $substr ); 
                if ($getlength > $thelength){echo "...";}
            ?>
        </p>
        <?php
        $posttags = get_the_tags();
        if ($posttags) {
          foreach($posttags as $tag) {
            echo '<h6>' . $tag->name . '</h6>'; 
          }
        }
        ?>
    </div>    
    
</a>