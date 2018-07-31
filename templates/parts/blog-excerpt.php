<?php
$torso_text_alignment = get_field('listing_alignment') ? get_field('listing_alignment') : false ;
$torso_alignment_class = $torso_text_alignment ? " ".$torso_text_alignment['value'] : '';
?>

<a class="card card__post" href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
  <article>
    <div class="card__image__container">
      <?php if ( has_post_thumbnail() ) : ?>
        <?php $bg_img = get_the_post_thumbnail_url($post_obj->ID); ?>
        <div class="card__image img-bg cover" style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
        <div class="card__label">Part 1</div><!-- /.card__label -->
      <?php endif; ?>
    </div>

    <div class="card__text">
      <h1><?php the_title(); ?></h1>

      <div class="card__content">
        <?php echo excerpt(20); ?>
      </div> <!-- /.card__content -->
    </div>
  </article>
  <div class="more">Read More</div><!-- /.read-more -->
</a> <!-- //card__post -->
