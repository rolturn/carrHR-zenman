<?php
$torso_text_alignment = get_field('listing_alignment') ? get_field('listing_alignment') : false ;
$torso_alignment_class = $torso_text_alignment ? " ".$torso_text_alignment['value'] : '';
?>

<a class="single-torso__post<?php echo $torso_alignment_class; ?>" href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
  <article>

      <div class="single-torso__image">
          <?php if ( has_post_thumbnail() ) : ?>
              <?php $bg_img = get_the_post_thumbnail_url($post_obj->ID); ?>
              <div style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
          <?php endif; ?>
      </div>

      <div class="single-torso__text">
          <h1><?php the_title(); ?></h1>

          <div class="single-torso__posted">
              <?php echo get_the_date('m.d.y');?><br>
          </div> <!-- // posted -->

          <div class="single-torso_content">
              <?php echo excerpt(15); ?>
          </div> <!-- // post -->

          <div>
              <?php if(has_tag()):?> <?php the_tags(' ');?> <?php endif;?>
          </div>
      </div>

  </article>
</a> <!-- //single__post -->
